import { useEffect, useState, useMemo } from "react";
import {
  //   scaleUtc,
  //   curveLinear,
  curveBasis,
  extent,
  axisBottom,
  axisLeft,
  max,
  line,
  scaleLinear,
  select,
  transition,
} from "d3";
import { merge, identity } from "../../util";
import { useWindowDocument } from "../use-window";
// ////
// /////
const OPTIONS = {
  width: 576,
  height: 456,
  //
  color: "currentColor",
  fill: "none",
  strokeWidth: 2.34,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeOpacity: 1,
  //
  paddingTop: 48,
  paddingRight: 32,
  paddingBottom: 48,
  paddingLeft: 48,
  //
  yLabel: "[y]",
  yLabelColor: "currentColor",
  yLabelOffsetX: -34,
  yLabelOffsetY: -28,
  //
  // xType: scaleUtc,
  xType: scaleLinear,
  yType: scaleLinear,
  //
  // accesors
  key: (d) => d.key,
  value: (d) => d.value,
  //
  _xAxisTextRotationDegrees: 0,
  _xAxisTextOpacity: 1,
  _xAxisTextAnchor: "center",
  _xAxisTextFormat: identity,
  _yAxisTextFormat: identity,
  //
  _classCanvas: "ChartLine--canvas",
  _classGraph: "ChartLine--graph",
  _classPath: "ChartLine--path",
  _classXAxis: "ChartLine--xaxis",
  _classYAxis: "ChartLine--yaxis",
  _classGuide: "ChartLine--guide",
  _classYLabel: "ChartLine--yLabel",
  //
  // _curve: curveLinear,
  _curve: curveBasis,
  _guideHorizontalOpacity: 0.056,
  //
  _tickSizeOuter: 0,
  _tickSpanVertical: 92,
  _tickSpanHorizontal: 76,
  //
  _transitionDuration: 567,
};

// https://observablehq.com/@d3/line-chart
const useChartLine = ({ isActive, data, root, options }) => {
  const { isReady } = useWindowDocument();
  const [c$, setc] = useState({
    svg: null,
    graph: null,
    xAxis: null,
    yAxis: null,
  });
  const {
    color,
    fill,
    height,
    key,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    strokeLinecap,
    strokeLinejoin,
    strokeOpacity,
    strokeWidth,
    value,
    width,
    xType,
    yLabel,
    yLabelColor,
    yLabelOffsetX,
    yLabelOffsetY,
    yType,
    _classCanvas,
    _classGraph,
    _classGuide,
    _classPath,
    _classXAxis,
    _classYAxis,
    _classYLabel,
    _curve,
    _guideHorizontalOpacity,
    _tickSizeOuter,
    _tickSpanHorizontal,
    _tickSpanVertical,
    _transitionDuration,
    _xAxisTextAnchor,
    _xAxisTextOpacity,
    _xAxisTextRotationDegrees,
    _xAxisTextFormat,
    _yAxisTextFormat,
  } = useMemo(() => merge({}, OPTIONS, options), [options]);
  //
  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;
  //
  const x = xType().range([0, innerWidth]);
  const y = yType().range([innerHeight, 0]);
  //
  const lineGen = line()
    .curve(_curve)
    .x((d) => x(key(d)))
    .y((d) => y(value(d)));
  //
  // @init
  useEffect(() => {
    let svg = null;
    let graph = null;
    let path = null;
    let xAxis = null;
    let yAxis = null;
    //
    if (isReady && root) {
      if (isActive) {
        // insert
        svg = select(root)
          .append("svg")
          .attr("class", _classCanvas)
          .attr("width", width)
          .attr("height", height);
        // .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        // .style("border", "1px dotted grey")
        graph = svg
          .append("g")
          .attr("class", _classGraph)
          .attr("transform", `translate(${paddingLeft}, ${paddingTop})`);
        path = graph
          .append("path")
          .attr("class", _classPath)
          .attr("fill", fill)
          .attr("stroke", color)
          .attr("stroke-width", strokeWidth)
          .attr("stroke-linecap", strokeLinecap)
          .attr("stroke-linejoin", strokeLinejoin)
          .attr("stroke-opacity", strokeOpacity);

        xAxis = svg
          .append("g")
          .attr("class", _classXAxis)
          .attr(
            "transform",
            `translate(${paddingLeft}, ${height - paddingBottom})`
          );
        yAxis = svg
          .append("g")
          .attr("class", _classYAxis)
          .attr("transform", `translate(${paddingLeft}, ${paddingTop})`)
          .call((g) =>
            g
              .append("text")
              .attr("x", yLabelOffsetX)
              .attr("y", yLabelOffsetY)
              .attr("fill", yLabelColor)
              .attr("text-anchor", "start")
              .attr("class", _classYLabel)
              .text(yLabel)
          );
        //
      } else {
        c$.svg && c$.svg.remove();
      }
    }
    //
    setc((c) => ({ ...c, svg, graph, path, xAxis, yAxis }));
  }, [isReady, root, isActive]);
  //
  // @update
  useEffect(() => {
    if (data && isActive && c$.path) {
      const { xAxis, yAxis, path } = c$;
      const t = transition("@t1--ChartLine").duration(_transitionDuration);
      //
      x.domain(extent(data, key));
      y.domain([0, max(data, value)]);
      //
      // run axis
      xAxis
        .transition(t)
        .call(
          axisBottom(x)
            .ticks(width / _tickSpanHorizontal)
            .tickFormat(_xAxisTextFormat)
            .tickSizeOuter(_tickSizeOuter)
        )
        .call((g) =>
          g
            .selectAll("text")
            .attr("text-anchor", _xAxisTextAnchor)
            .attr("fill-opacity", _xAxisTextOpacity)
            .attr("transform", `rotate(${_xAxisTextRotationDegrees})`)
        );
      yAxis
        // .transition(t)
        .call(
          axisLeft(y)
            .ticks(height / _tickSpanVertical)
            .tickFormat(_yAxisTextFormat)
        )
        .call((g) => g.select(".domain").remove())
        .call((g) => {
          // draw horizontal guides
          g.selectAll(`.tick line.${_classGuide}`).remove();
          g.selectAll(".tick line")
            .clone()
            .attr("class", _classGuide)
            .attr("x2", innerWidth)
            .attr("stroke-opacity", _guideHorizontalOpacity);
        });

      path.transition(t).attr("d", lineGen(data));
      //
    }
  }, [data, isActive, c$.path]);
  //
  return {
    svg: c$.svg,
    path: c$.path,
  };
};

export default useChartLine;
