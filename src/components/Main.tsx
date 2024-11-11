import { CSSProperties, useEffect, useRef, useState } from "react";
import { InterOptions } from "../ElementObserver";
import { copy, Language } from "../Copy";
import {
  calculateOffsetLeft,
  calculateOffsetTop,
  calculateScale,
} from "../utils";

interface MainProps {
  optionsState: InterOptions;
  language: string;
}

export const Main = ({ optionsState, language }: MainProps) => {
  const boundingContainer = useRef<HTMLDivElement | null>(null);
  const toBeObserved = useRef<HTMLDivElement | null>(null);
  const [observed, setObserved] = useState(false);
  const [scrollLength, setScrollLength] = useState(9999);

  const handleScroll = () => {
    const offsetStart =
      toBeObserved.current!.offsetTop + boundingContainer.current!.offsetTop;
    setScrollLength(offsetStart - boundingContainer.current!.scrollTop);
  };

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: boundingContainer.current,
      rootMargin: `${optionsState.rootTop}% ${optionsState.rootRight}% ${optionsState.rootBottom}% ${optionsState.rootLeft}%`,
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
    if (scrollLength === 9999) handleScroll();
    return () => {
      observer.disconnect();
    };
  }, [
    optionsState.rootLeft,
    optionsState.rootRight,
    optionsState.rootTop,
    optionsState.rootBottom,
    optionsState.threshold,
  ]);
  return (
    <>
      <section className="layout-grid-main">
        <div
          className="root-margin"
          style={
            {
              "--root-margin-top": calculateOffsetTop(
                optionsState.rootTop,
                optionsState.rootBottom
              ),
              "--root-margin-left": calculateOffsetLeft(
                optionsState.rootLeft,
                optionsState.rootRight
              ),
              "--root-margin-height-scale": calculateScale(
                optionsState.rootTop,
                optionsState.rootBottom
              ),
              "--root-margin-width-scale": calculateScale(
                optionsState.rootLeft,
                optionsState.rootRight
              ),
            } as CSSProperties
          }
        ></div>
        <div
          className="scrolling-element-shadow"
          style={
            {
              "--scroll-shadow-top": scrollLength + "px",
            } as CSSProperties
          }
        ></div>
        <div
          ref={boundingContainer}
          className="wrapper-element"
          onScroll={handleScroll}
        >
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
    </>
  );
};
