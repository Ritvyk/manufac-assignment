import {
  StatisticsReturnType,
  Wine,
  WineWithGamaProperty,
} from "./interfaces/interface";

// to use is universally everywhere for any property to calculateMode
const modeReducer = (
  wines: Wine[],
  alcoholClass: number,
  key: keyof Wine
): { [key: string]: number } => {
  return wines.reduce((final: any, wine: Wine) => {
    if (wine.Alcohol === alcoholClass) {
      if (wine[key]) {
        if (final[`${wine[key]}`]) {
          final = { ...final, [wine[key]]: final[wine[key]] + 1 };
        } else {
          final = { ...final, [wine[key]]: 1 };
        }
      }
    }
    return final;
  }, {});
};

// to use is universally everywhere for any property to calculate Mean
const meanReducer = (
  wines: Wine[],
  alcoholClass: number,
  key: keyof Wine
): {
  total: number;
  count: number;
} => {
  return wines.reduce(
    (final, wine: Wine) => {
      if (wine.Alcohol === alcoholClass) {
        final = {
          ...final,
          total: final.total + parseFloat(`${wine[key]}`),
          count: final.count + 1,
        };
      }
      return final;
    },
    { total: 0, count: 0 }
  );
};

const calculateMean = (
  wines: Wine[],
  alcoholClass: number,
  key: keyof Wine
): number | string => {
  // Reducing the data according to the params
  const reducedWineData = meanReducer(wines, alcoholClass, key);

  // both of the values should be greater than 0 else return 0 to avoid any maths errors
  return reducedWineData.total > 0 && reducedWineData.count > 0
    ? (reducedWineData.total / reducedWineData.count).toFixed(3)
    : 0;
};

const calculateMode = (
  wines: Wine[],
  alcoholClass: number,
  key: keyof Wine
): number | string => {
  const reducedWineData = modeReducer(wines, alcoholClass, key);
  const medianValue = Math.max(...Object.values(reducedWineData));

  // If no mode is returned return 0 to avoid maths errors
  return (
    Object.keys(reducedWineData).find(
      (key) => reducedWineData[key] === medianValue
    ) ?? 0
  );
};

// implemented sorted algorithm after reducing to certain values
const calculateMedian = (
  wines: Wine[],
  alcoholClass: number,
  key: keyof Wine
): string | number => {
  const reducedData = modeReducer(wines, alcoholClass, key); // using modeReducer
  let keyValueArray = [];
  for (let key in reducedData) {
    keyValueArray.push([key, reducedData[key]]);
  }
  const sortedData = keyValueArray.sort((x: any, y: any) => {
    return x[0] - y[0];
  });

  let str = [];
  for (let i in sortedData) {
    str.push(sortedData[i][0]);
  }

  if (sortedData.length % 2 === 0) {
    // array is of even length
    const m1Index = sortedData.length / 2 - 1;
    const m2Index = m1Index + 1;
    if (m1Index && m2Index) {
      return (
        (
          (parseFloat(sortedData[m1Index][0] as string) +
            parseFloat(sortedData[m2Index][0] as string)) /
          2
        ).toFixed(3) ?? 0
      );
    }
  } else {
    return sortedData[(sortedData.length - 1) / 2][0] ?? 0;
  }
  return 0;
};

export const wineStatistics = (
  wines: Wine[],
  alcoholClass: number,
  key: keyof Wine
): StatisticsReturnType => {
  return {
    mean: calculateMean(wines, alcoholClass, key),
    mode: calculateMode(wines, alcoholClass, key),
    median: calculateMedian(wines, alcoholClass, key),
  };
};

export const wineGamaStatistics = (
  wines: Wine[],
  alcoholClass: number
): StatisticsReturnType => {
  const gamaAddedWines: WineWithGamaProperty[] = wines.map(
    (wine): WineWithGamaProperty => {
      return {
        ...wine,
        Gama: parseFloat(((wine.Ash * wine.Hue) / wine.Magnesium).toFixed(3)),
      };
    }
  );

  return {
    mean: calculateMean(gamaAddedWines, alcoholClass, "Gama"),
    mode: calculateMode(gamaAddedWines, alcoholClass, "Gama"),
    median: calculateMedian(gamaAddedWines, alcoholClass, "Gama"),
  };
};

export const segByClass = (wines: Wine[]) => {
  const reducedWines = wines.reduce((final, wine: Wine) => {
    if (Object.keys(final).includes(`class_${wine.Alcohol}`)) {
      final[`class_${wine.Alcohol}`].push(wine);
    } else {
      final = { ...final, [`class_${wine.Alcohol}`]: [wine] };
    }
    return final;
  }, {} as { [key: string]: Wine[] });

  return reducedWines;
};
