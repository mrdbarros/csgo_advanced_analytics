import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { ColorLegend } from "./ColorLegend";
import { Marks } from "./Marks";
import { extent } from "d3";
import ReactDropdown from "react-dropdown";

export const ScatterPlot = ({
  data,
  width,
  height,
  margin,
  xValue,
  xAxisLabel,
  xScale,
  xAxisTickFormat,
  xAxisLabelOffset = 10,

  yValue,
  yAxisLabel,
  yScale,
  yAxisLabelOffset = 10,

  sizeScale = null,
  colorValue,
  colorScale,
  tooltipFormat,
  colorLegendLabel,
}) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const circleRadius = 7;
  const translatedXScale = xScale
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();
  const translatedYScale = yScale
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();
  return (
    <svg
      className="graph"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0  ${width} ${height} `}
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale
            .domain(extent(data, xValue))
            .range([0, innerWidth])
            .nice()}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          xAxisLabel={xAxisLabel}
          xAxisLabelOffset={xAxisLabelOffset}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />

        <AxisLeft
          yScale={yScale
            .domain(extent(data, yValue))
            .range([0, innerHeight])
            .nice()}
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
          />
        </g>
        <Marks
          data={data}
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
  );
};

export const ScatterPlotControls = ({
  attributes,
  xAttribute,
  setXAttribute,
  yAttribute,
  setYAttribute,
}) => (
  <div className="graph-controls">
    <span className="dropdown-label">Horizontal:</span>
    <ReactDropdown
      options={attributes}
      value={xAttribute}
      onChange={({ value }) => setXAttribute(value)}
    />
    <span className="dropdown-label">Vertical:</span>
    <ReactDropdown
      options={attributes}
      value={yAttribute}
      onChange={({ value }) => setYAttribute(value)}
    />
  </div>
);
