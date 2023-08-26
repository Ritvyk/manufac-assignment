export interface Wine {
  Alcohol: number;
  "Malic Acid": number;
  Ash: number;
  "Alcalinity of ash": number;
  Magnesium: number;
  "Total phenols": number;
  Flavanoids: number;
  "Nonflavanoid phenols": number;
  Proanthocyanins: string;
  "Color intensity": number;
  Hue: number;
  "OD280/OD315 of diluted wines": number;
  Unknown: number;
  Gama: number;
}

export interface WineWithGamaProperty extends Wine {
  Gama: number;
}

export interface StatisticsReturnType {
  mean: string | number;
  mode: string | number;
  median: string | number;
}
