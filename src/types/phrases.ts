export type Phrase = {
  category: number;
  id: number;
  level: number;
  title: {
    jp: string;
    en: string;
    audio: string;
  };
  sub: [
    {
      jp: string;
      en: string;
      audio: string;
    },
    {
      jp: string;
      en: string;
      audio: string;
    }
  ];
  description: string;
};
