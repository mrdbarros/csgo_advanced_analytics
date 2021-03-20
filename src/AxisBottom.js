export const AxisBottom = ({
  xScale,
  innerWidth,
  innerHeight,
  tickFormat,
  xAxisLabel,
  xAxisLabelOffset,
  tickOffset = 3,
}) => (
  <>
    <AxisAndTicks
      xScale={xScale}
      innerHeight={innerHeight}
      tickFormat={tickFormat}
      tickOffset={tickOffset}
    />
    <AxisBottomLabel
      innerHeight={innerHeight}
      innerWidth={innerWidth}
      xAxisLabel={xAxisLabel}
      xAxisLabelOffset={xAxisLabelOffset}
    />
  </>
);

const AxisAndTicks = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
  xScale.ticks().map((tickValue) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line y2={innerHeight} />
      <text
        style={{ textAnchor: "middle" }}
        dy=".71em"
        y={innerHeight + tickOffset}
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));

const AxisBottomLabel = ({
  innerWidth,
  innerHeight,
  xAxisLabel,
  xAxisLabelOffset = 30,
}) => {
  return (
    <text
      className="axis-label"
      x={innerWidth / 2}
      y={innerHeight + xAxisLabelOffset}
      textAnchor="middle"
    >
      {xAxisLabel}
    </text>
  );
};
