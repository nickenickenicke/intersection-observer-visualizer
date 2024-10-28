import { CSSProperties, useEffect, useRef, useState } from "react";
import { copy, Language } from "./Copy";
import Markdown from "react-markdown";

interface InterOptions {
  rootX: number;
  rootY: number;
  threshold: number;
}

export const ElementObserver = () => {
  const boundingContainer = useRef<HTMLDivElement | null>(null);
  const toBeObserved = useRef<HTMLDivElement | null>(null);
  const [observed, setObserved] = useState(false);
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

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: boundingContainer.current,
      rootMargin: `${optionsState.rootY}% ${optionsState.rootX}% ${optionsState.rootY}% ${optionsState.rootX}%`,
      threshold: optionsState.threshold,
    };
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setObserved(entry.isIntersecting);

      if (entry.isIntersecting) setObserved(true);
      if (!entry.isIntersecting) setObserved(false);
    }, options);
    if (toBeObserved.current) {
      observer.observe(toBeObserved.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [optionsState.rootX, optionsState.rootY, optionsState.threshold]);

  return (
    <>
      <article className="layout-grid">
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
        <section className="layout-grid-main">
          <div
            className="root-margin-overlay"
            style={
              {
                "--root-margin-block": optionsState.rootX,
                "--root-margin-inline": optionsState.rootY,
              } as CSSProperties
            }
          >
            <div className="root-margin-overlay-top"></div>
            <div className="root-margin-overlay-left"></div>
            <div className="root-margin-overlay-inner"></div>
            <div className="root-margin-overlay-right"></div>
            <div className="root-margin-overlay-bottom"></div>
          </div>
          <div ref={boundingContainer} className="wrapper-element">
            <div className="wrapper-titles">
              <span className="root-title">Root</span>
              <span
                className={
                  observed
                    ? "title-element-status title-element-status-observed"
                    : "title-element-status"
                }
              >
                {observed
                  ? copy.observed[language as keyof Language]
                  : copy.notObserved[language as keyof Language]}
              </span>
            </div>
            <h3 className="scroll-down">
              ↓ {copy.scrollDown[language as keyof Language]} ↓
            </h3>
            <div
              ref={toBeObserved}
              className={
                observed
                  ? "scrolling-element scrolling-element-observed"
                  : "scrolling-element"
              }
            >
              {observed
                ? copy.observed[language as keyof Language]
                : copy.notObserved[language as keyof Language]}
            </div>
          </div>
        </section>
      </article>
    </>
  );
};
