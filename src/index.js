import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { csv, scaleLinear, scaleOrdinal, max, format, extent } from "d3";
import ReactDropdown from "react-dropdown";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { ColorLegend } from "./ColorLegend";

const width = 960;
const height = 500;
const margin = { top: 20, right: 200, bottom: 65, left: 140 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = margin.left / 2;
const fadeOpacity = 0.2;

const attributes = [
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

const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    for (let j = 0; j < attributes[i].items.length; j++) {
      if (attributes[i].items[j].value === value) {
        return attributes[i].items[j].label;
      }
    }
  }
};

const App = () => {
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null);

  const initialXAttribute = "KAST";
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = "Flashes Thrown Per Round";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const colorValue = (d) => d.PLAYER_NAME;
  const colorLegendLabel = "Jogador";

  const filteredData = data.filter((d) => hoveredValue === colorValue(d));

  const circleRadius = 7;

  const siFormat = format(".2");
  const xAxisTickFormat = (value) => siFormat(value);

  const tooltipFormat = (player, valueX, valueY) =>
    player + " (" + siFormat(valueX) + " ," + siFormat(valueY) + ")";

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range([
      "#E6842A",
      "#FDE74C",
      "#9D75CB",
      "#2e4057",
      "#66a182",
      "#D81159",
      "#63D2FF",
      "#EDC7CF",
      "#B9E28C",
      "#FB62F6",
    ]);

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

  const xScale = scaleLinear()
    .domain(extent(dataFiltered, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(dataFiltered, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <>
      <div className="menus-container">
        <span className="dropdown-label">X</span>
        <ReactDropdown
          options={attributes}
          value={xAttribute}
          onChange={({ value }) => setXAttribute(value)}
        />
        <span className="dropdown-label">Y</span>
        <ReactDropdown
          options={attributes}
          value={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
        />
      </div>
      <svg className="graph" width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            xAxisLabel={xAxisLabel}
            xAxisLabelOffset={xAxisLabelOffset}
            tickFormat={xAxisTickFormat}
            tickOffset={5}
          />

          <AxisLeft
            yScale={yScale}
            innerHeight={innerHeight}
            innerWidth={innerWidth}
            yAxisLabel={yAxisLabel}
            tickOffset={5}
            yAxisLabelOffset={yAxisLabelOffset}
          />

          <g transform={`translate(${innerWidth + 60}, 60)`}>
            <text x={35} y={-25} className="axis-label" textAnchor="middle">
              {colorLegendLabel}
            </text>
            <ColorLegend
              tickSpacing={22}
              tickTextOffset={12}
              tickSize={circleRadius}
              colorScale={colorScale}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>
          <Marks
            data={dataFiltered}
            xScale={xScale}
            xValue={xValue}
            yScale={yScale}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            tooltipFormat={tooltipFormat}
            circleRadius={circleRadius}
          />
        </g>
      </svg>
    </>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
