import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { schemeCategory10, scaleLinear, scaleOrdinal, format } from "d3";

import { useData } from "./useData";
import { ScatterPlot, ScatterPlotControls } from "./ScatterPlot";
import { GraphTitle } from "./GraphTitle";
import { attributes, getLabel } from "./statisticsValues";

import "./css/main.css";

const width = 960;
const height = 500;
const margin = { top: 20, right: 200, bottom: 65, left: 140 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = margin.left / 2;
const fadeOpacity = 0.2;
const initialXAttribute = "KAST";
const initialYAttribute = "ADR";
const colorLegendLabel = "Jogador";

const App = () => {
  const data = useData();

  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  if (!data) {
    return <pre>Loading...</pre>;
  }

  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  const colorValue = (d) => d.PLAYER_NAME;

  const circleRadius = 7;

  const siFormat = format(".2");
  const xAxisTickFormat = (value) => siFormat(value);

  const tooltipFormat = (player, valueX, valueY) =>
    player + " (" + siFormat(valueX) + " ," + siFormat(valueY) + ")";

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(schemeCategory10);

  const xScale = scaleLinear();

  const yScale = scaleLinear();

  const graphTitle = "Comparador de Jogadores";

  const graphSubtitle = "Selecione 3 estatísticas para serem comparadas.";

  const xData = data.filter((d) => d.STATISTIC_NAME === xAttribute);
  const yData = data.filter((d) => d.STATISTIC_NAME === yAttribute);
  let yMap = new Map();
  for (let i = 0; i < yData.length; i++) {
    yMap.set(yData[i].ID_PLAYER, yData[i].VALUE);
  }
  let dataFiltered = xData.map((d, i) => {
    return {
      ID_PLAYER: d.ID_PLAYER,
      PLAYER_NAME: d.PLAYER_NAME,
      [xAttribute]: d.VALUE,
      [yAttribute]: yMap.get(d.ID_PLAYER),
    };
  });

  return (
    <>
      <div id="graph-container" className="graph-container">
        <GraphTitle graphTitle={graphTitle} graphSubtitle={graphSubtitle} />
        <ScatterPlotControls
          attributes={attributes}
          xAttribute={xAttribute}
          setXAttribute={setXAttribute}
          yAttribute={yAttribute}
          setYAttribute={setYAttribute}
        />
        <ScatterPlot
          data={dataFiltered}
          width={width}
          height={height}
          margin={margin}
          xValue={xValue}
          xAxisLabel={xAxisLabel}
          xScale={xScale}
          xAxisTickFormat={xAxisTickFormat}
          xAxisLabelOffset={xAxisLabelOffset}
          yValue={yValue}
          yAxisLabel={yAxisLabel}
          yScale={yScale}
          yAxisLabelOffset={yAxisLabelOffset}
          sizeScale={0}
          colorValue={colorValue}
          colorScale={colorScale}
          tooltipFormat={tooltipFormat}
          colorLegendLabel={colorLegendLabel}
        />
      </div>
    </>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
