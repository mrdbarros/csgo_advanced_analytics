import { useState, useEffect } from "react";
import { VegaLite } from "react-vega";
import { getData } from "./useData";
import React from "react";

const spec = {
  width: 400,
  height: 200,
  mark: "point",
  transform: [
    {
      filter: "datum.STATISTIC_NAME === 'Trades'",
    },
  ],
  encoding: {
    x: { field: "PLAYER_NAME", type: "nominal" },
    y: { field: "VALUE", type: "quantitative" },
  },
  data: {
    name: "table",
  }, // note: vega-lite data attribute is a plain object instead of an array
};

// const createViz = () => {
//   let innerGraph = vl
//     .markBar()
//     .data(
//       vl
//         .csv()
//         .url(
//           "https://gist.githubusercontent.com/mrdbarros/e6e15faa23d3cec794213dd427a322bd/raw/rank_csgo.csv"
//         )
//     )
//     // .transform(vl.filter("datum.STATISTIC_NAME === 'Trades'"))
//     .encode(vl.x().fieldQ("VALUE"), vl.y().fieldN("PLAYER_NAME"))
//     .render();
//   return innerGraph;
// };

const filterData = (data) => {
  let filterAttPerc = data.filter(
    (element) => element.STATISTIC_NAME === "First Kill AttemptsPercentage"
  );

  let filterSuccessPercentage = data.filter(
    (element) => element.STATISTIC_NAME === "First Kill success Percentage"
  );
  let filterData = mergeJson({}, filterAttPerc, filterSuccessPercentage);
  return filterData;
};

function mergeJson(target) {
  var authormap = {};
  authors.forEach(function (author) {
    authormap[author.id] = author;
  });
  for (var argi = 1; argi < arguments.length; argi++) {
    var source = arguments[argi];
    for (var key in source) {
      if (!(key in target)) {
        target[key] = [];
      }
      for (var i = 0; i < source[key].length; i++) {
        target[key].push(source[key][i]);
      }
    }
  }
  return target;
}

export const Viz = () => {
  const [graphData, setGraphData] = useState();

  useEffect(() => {
    getData().then((data) => {
      const innerData = { table: data };
      setGraphData(innerData);
      console.log(data);
    });
  }, []);
  return <VegaLite spec={spec} data={graphData} />;
};
