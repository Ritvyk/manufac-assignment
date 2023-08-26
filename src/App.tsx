import React, { useEffect } from "react";
import { useAppDispatch } from "./redux_app/hooks";
import WineData from "./dataset/Wine-Data.json";
import { Wine } from "./global/interfaces/interface";
import { setInitialWineData } from "./redux_app/reducer";

// importing global Stylesheet
import "./App.css";
import Homepage from "./components/routes/Homepage";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = false;
    if (!isMounted) {
      // interfacing wine data to couple it with our application
      const wineData: Wine[] = WineData as Wine[];
      dispatch(setInitialWineData({ data: wineData }));
    }

    return () => {
      isMounted = true;
    };
  }, []);
  return (
    <div className="w-full h-full bg-stone-800">
      <Homepage />
    </div>
  );
}

export default App;
