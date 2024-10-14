import { CSSProperties, useEffect, useRef, useState } from "react";

interface InterOptions {
  rootX: number;
  rootY: number;
  threshold: number;
}

export const ElementObserver = () => {
  const boundingContainer = useRef<HTMLDivElement | null>(null);
  const toBeObserved = useRef<HTMLDivElement | null>(null);
  const [observed, setObserved] = useState(false);
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
          <h2>Controls</h2>

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
            <code>{`
options = {
root: null | Element,
rootMargin: "${optionsState.rootX}% ${optionsState.rootY}% ${optionsState.rootX}% ${optionsState.rootY}%",
threshold: ${optionsState.threshold} 
}
            `}</code>
          </pre>
          <p>
            Root är det scrollbara elementet som händelsen sker i. Om man anger{" "}
            <code>null</code> blir det viewporten.
          </p>
          <p>
            Root margin justerar "fönstret" som händelsen sker i. Enhet är
            procent eller cssvärden. Ordningen är top right bottom left. I det
            här exemplet sätts top & bottom respektive left & right till samma
            värde för att illustrera funktionaliteten. De går att sätta
            individuellt.
          </p>
          <p>
            Threshold är hur stor del av det observerade elementet som måste
            vara inuti "fönstret" för att händelsen ska ske. Enhet är mellan 0
            och 1. Vid 0 sker händelsen så fort elementet nuddar fönstret och
            vid 1 sker händelsen när hela elementet är inuti fönstret.
          </p>
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
                {!observed && "inte "}
                observerad
              </span>
            </div>
            <h3 className="scroll-down">↓ Scrolla ner ↓</h3>
            <div
              ref={toBeObserved}
              className={
                observed
                  ? "scrolling-element scrolling-element-observed"
                  : "scrolling-element"
              }
            >
              {!observed && "inte "}
              observerad
            </div>
          </div>
        </section>
      </article>
    </>
  );
};
