export type Language = {
  swedish: string;
  english: string;
};

type Copy = {
  controls: Language;
  paragraphs: Language[];
  observed: Language;
  notObserved: Language;
  scrollDown: Language;
};

export const copy: Copy = {
  controls: {
    swedish: "Inställningar",
    english: "Settings",
  },
  paragraphs: [
    {
      swedish:
        "Root är det scrollbara elementet som händelsen sker i. Om man anger `null` blir det viewporten.",
      english:
        "Root is the scrollable element where the event occurs. If you set it to `null` it will be the viewport.",
    },
    {
      swedish:
        'Root margin justerar "fönstret" som händelsen sker i. Enhet är procent eller pixlar. Ordningen är top right bottom left.',
      english:
        'Root margin adjusts the "window" where the event occurs. The unit is percent or pixels. The order is top right bottom left.',
    },
    {
      swedish:
        'Threshold är hur stor del av det observerade elementet som måste vara inuti "fönstret" för att händelsen ska ske. Enhet är mellan 0 och 1. Vid 0 sker händelsen så fort elementet nuddar fönstret och vid 1 sker händelsen när hela elementet är inuti fönstret.',
      english:
        'Threshold is how much of the observed element must be inside the "window" for the event to occur. The unit is between 0 and 1. At 0, the event occurs as soon as the element touches the window, and at 1, the event occurs when the entire element is inside the window.',
    },
  ],
  observed: {
    swedish: "Observerad",
    english: "Observed",
  },
  notObserved: {
    swedish: "Inte observerad",
    english: "Not observed",
  },
  scrollDown: {
    swedish: "Scrolla ner",
    english: "Scroll down",
  },
};
