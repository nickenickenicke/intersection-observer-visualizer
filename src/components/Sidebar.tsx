import Markdown from "react-markdown";
import { copy, Language } from "../Copy";
import { InterOptions } from "../ElementObserver";

interface SidebarProps {
  optionsState: InterOptions;
  language: string;
  updateState: (key: string, value: number) => void;
  toggleLanguage: () => void;
}

export const Sidebar = ({
  optionsState,
  language,
  updateState,
  toggleLanguage,
}: SidebarProps) => {
  return (
    <>
      <aside className="layout-grid-aside">
        <button
          type="button"
          onClick={toggleLanguage}
          className="language-button"
        >
          {language === "english" ? "🇸🇪" : "🇬🇧"}
        </button>
        <h2>{copy.controls[language as keyof Language]}</h2>
        <label>
          Root margin X ↔ {optionsState.rootX + "%"}
          <input
            type="range"
            name=""
            id=""
            max={50}
            min={-50}
            step={5}
            value={optionsState.rootX}
            onChange={(e) => {
              updateState("rootX", parseInt(e.target.value));
            }}
          />
        </label>
        <label>
          Root margin Y ↕ {optionsState.rootY + "%"}
          <input
            type="range"
            name=""
            id=""
            max={50}
            min={-50}
            step={5}
            value={optionsState.rootY}
            onChange={(e) => {
              updateState("rootY", parseInt(e.target.value));
            }}
          />
        </label>
        <label>
          Threshold {optionsState.threshold}
          <input
            type="range"
            name=""
            id=""
            max={1}
            min={0}
            step={0.1}
            value={optionsState.threshold}
            onChange={(e) => {
              updateState("threshold", parseFloat(e.target.value));
            }}
          />
        </label>
        <pre>
          <code>{`options = {
root: null | Element,
rootMargin: "${optionsState.rootY}% ${optionsState.rootX}% ${optionsState.rootY}% ${optionsState.rootX}%",
threshold: ${optionsState.threshold} 
}`}</code>
        </pre>
        {copy.paragraphs.map((paragraph, index) => (
          <p key={index}>
            <Markdown>{paragraph[language as keyof Language]}</Markdown>
          </p>
        ))}
      </aside>
    </>
  );
};
