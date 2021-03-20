export const AxisLeft = ({
  yScale,
  innerHeight,
  innerWidth,
  yAxisLabel,
  tickOffset = 3,
  yAxisLabelOffset = 30,
}) => {
  return (
    <>
      <AxisAndTicks
        yScale={yScale}
        innerWidth={innerWidth}
        tickOffset={tickOffset}
      />
      <AxisLeftLabel
        innerHeight={innerHeight}
        yAxisLabel={yAxisLabel}
        yAxisLabelOffset={yAxisLabelOffset}
      />
    </>
  );
};

const AxisAndTicks = ({ yScale, innerWidth, tickOffset = 3 }) =>
  yScale.ticks().map((tickValue) => (
    <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text
        key={tickValue}
        style={{ textAnchor: "end" }}
        x={-tickOffset}
        dy=".32em"
      >
        {tickValue}
      </text>
    </g>
  ));

const AxisLeftLabel = ({ innerHeight, yAxisLabel, yAxisLabelOffset }) => {
  if (yAxisLabel.length > 20) {
    const splittedLabel = yAxisLabel.split(" ");
    let firstLine = "";
    let secondLine = "";
    splittedLabel.map((fragment, i) => {
      if (i < Math.floor(splittedLabel.length / 2)) {
        firstLine = firstLine + " " + fragment;
      } else {
        secondLine = secondLine + " " + fragment;
      }
    });
    return (
      <g
        transform={`translate(${-yAxisLabelOffset},${
          innerHeight / 2
        }) rotate(-90)`}
      >
        <text className="axis-label" textAnchor="middle">
          <tspan fontSize="0.9em" y={-15}>
            {firstLine}
          </tspan>
          <tspan fontSize="0.9em" x={0} y={15}>
            {secondLine}
          </tspan>
        </text>
      </g>
    );
  } else {
    return (
      <text
        className="axis-label"
        textAnchor="middle"
        transform={`translate(${-yAxisLabelOffset},${
          innerHeight / 2
        }) rotate(-90)`}
      >
        <tspan>{yAxisLabel}</tspan>
      </text>
    );
  }
};
