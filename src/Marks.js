export const Marks = ({
  data,
  xScale,
  xValue,
  yScale,
  yValue,
  colorScale,
  colorValue,
  tooltipFormat,
  circleRadius,
}) =>
  data.map((d) => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      fill={colorScale(colorValue(d))}
      r={circleRadius}
    >
      <title>{tooltipFormat(d.PLAYER_NAME, xValue(d), yValue(d))}</title>
    </circle>
  ));
