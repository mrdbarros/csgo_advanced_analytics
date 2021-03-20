import React, { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/mrdbarros/e6e15faa23d3cec794213dd427a322bd/raw/rank_csgo.csv";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.VALUE = +d.VALUE.replace(",", ".");
      d.PLAYER_NAME = d.PLAYER_NAME.split(" ")[
        d.PLAYER_NAME.split(" ").length - 1
      ];

      return d;
    };
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
