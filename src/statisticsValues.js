export const attributes = [
  {
    type: "group",
    name: "Flashes",
    items: [
      {
        value: "Average Blind Time Per Round",
        label: "Tempo de cegueira por round (descontados aliados)",
      },
      { value: "Flashes Thrown Per Round", label: "Flashes por round" },
      {
        value: "Net Players Blinded Per Flash",
        label: "Média de cegados por flash (descontados aliados)",
      },
      {
        value: "Teammates Blinded Per Flash",
        label: "Aliados cegados por flash",
      },
      {
        value: "Net Flashes Leading To Death Per Round",
        label: "Média de flash assists por round (descontados aliados)",
      },
    ],
  },
  {
    type: "group",
    name: "First Kill",
    items: [
      { value: "Firstkills Per Round", label: "First kills por round" },
      {
        value: "First Kill AttemptsPercentage",
        label: "% de presença no primeiro duelo",
      },
      {
        value: "First Kill success Percentage",
        label: "% sucesso no primeiro duelo (first kill)",
      },
    ],
  },
  {
    type: "group",
    name: "Clutches",
    items: [
      {
        value: "Clutch Attempts Percentage",
        label: "% de tentativa de clutch",
      },
      { value: "Clutches Won Percentage", label: "% de vitória em clutch" },
      { value: "Clutches Per Round", label: "Clutches por round" },
    ],
  },
  {
    type: "group",
    name: "Gerais",
    items: [
      { value: "KAST", label: "KAST" },
      { value: "ADR", label: "ADR" },
      { value: "HS Percentage", label: "% de HS" },
      { value: "Bombs Planted Per Round", label: "Bombas plantadas por round" },
      { value: "Multikills Per Round", label: "Multikills por round" },
      {
        value: "Was Traded Per Death",
        label: "% de vezes que foi trocado por morte",
      },
    ],
  },
];

export const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    for (let j = 0; j < attributes[i].items.length; j++) {
      if (attributes[i].items[j].value === value) {
        return attributes[i].items[j].label;
      }
    }
  }
};
