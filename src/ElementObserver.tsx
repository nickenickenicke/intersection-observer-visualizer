import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Main } from "./components/Main";

export interface InterOptions {
  rootX: number;
  rootY: number;
  threshold: number;
}

export const ElementObserver = () => {
  const [language, setLanguage] = useState("swedish");
  const [optionsState, setOptionsState] = useState<InterOptions>({
    rootX: 10,
    rootY: -10,
    threshold: 1,
  });

  const updateState = (key: string, value: number) => {
    if (key === "threshold") {
      return setOptionsState({
        ...optionsState,
        threshold: value,
      });
    }
    setOptionsState({ ...optionsState, [key as keyof InterOptions]: value });
  };

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "swedish" : "english");
  };

  return (
    <>
      <article className="layout-grid">
        <Sidebar
          language={language}
          optionsState={optionsState}
          updateState={updateState}
          toggleLanguage={toggleLanguage}
        />
        <Main language={language} optionsState={optionsState} />
      </article>
    </>
  );
};
