import { CSSProperties, useEffect, useRef, useState } from "react";
import { InterOptions } from "../ElementObserver";
import { copy, Language } from "../Copy";
import { calculateOffsetTop } from "../utils";

interface MainProps {
  optionsState: InterOptions;
  language: string;
}

export const Main = ({ optionsState, language }: MainProps) => {
  const boundingContainer = useRef<HTMLDivElement | null>(null);
  const toBeObserved = useRef<HTMLDivElement | null>(null);
  const [observed, setObserved] = useState(false);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: boundingContainer.current,
      rootMargin: `${optionsState.rootTop}% ${optionsState.rootX}% ${optionsState.rootBottom}% ${optionsState.rootX}%`,
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
  }, [
    optionsState.rootX,
    optionsState.rootTop,
    optionsState.rootBottom,
    optionsState.threshold,
  ]);
  return (
    <>
      <section className="layout-grid-main">
        <div
          className="new-rm"
          style={
            {
              "--root-margin-top": calculateOffsetTop(
                optionsState.rootTop,
                optionsState.rootBottom
              ),
            } as CSSProperties
          }></div>
        <div
          className="root-margin-overlay"
          style={
            {
              "--root-margin-block": optionsState.rootX,
              "--root-margin-inline": optionsState.rootTop,
            } as CSSProperties
          }>
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
              }>
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
            }>
            {observed
              ? copy.observed[language as keyof Language]
              : copy.notObserved[language as keyof Language]}
          </div>
        </div>
      </section>
    </>
  );
};
