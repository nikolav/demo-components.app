import { useEffect, useState, useMemo } from "react";
import {
  //   extent,
  axisBottom,
  axisLeft,
  max,
  scaleLinear,
  select,
  //   selectAll,
  scaleBand,
} from "d3";
import { merge, map } from "../../util";
import { useWindowDocument } from "../use-window";
////
/////
const OPTIONS = {
  width: 550,
  height: 400,
  color: "currentcolor",
  paddingX: 48,
  paddingY: 32,
  //
  // accesors
  key: (d) => d.key,
  value: (d) => d.value,
  //
  // minor tweeks
  // _xAxisTextRotationDegrees: -24,
  // _xAxisTextOpacity: 0.85,
  _ticksX: 10,
  _ticksY: 4,
  // _tickSize,
  // _tickSizeInner,
  // _tickSizeOuter,
  // _tickFormat,
  // _tickValues,
  _paddingInner: 0.02,
  _paddingOuter: 0.02,
  //
  _classCanvas: "BarChart--canvas",
  _classGraph: "BarChart--graph",
  _classVerticalBars: "BarChart--bars",
  _classXAxis: "BarChart--xaxis",
  _classYAxis: "BarChart--yaxis",
};

const useBarChart = ({
  //
  isActive = true,
  //
  root,
  //
  data,
  //
  options,
}) => {
  const { isReady } = useWindowDocument();
  const [c$, setc] = useState({
    svg: null,
    graph: null,
    xAxis: null,
    yAxis: null,
  });
  //merge options with defaults
  const {
    width,
    height,
    color,
    paddingX,
    paddingY,
    //
    key,
    value,
    //
    _classCanvas,
    _classGraph,
    _classVerticalBars,
    _classXAxis,
    _classYAxis,
    _paddingInner,
    _paddingOuter,
    _ticksX,
    _ticksY,
    // _tickSize,
    // _tickSizeInner,
    // _tickSizeOuter,
    // _tickFormat,
    // _tickValues,
    // _xAxisTextOpacity,
    // _xAxisTextRotationDegrees,
  } = useMemo(() => merge({}, OPTIONS, options), [options]);
  //
  const innerWidth = width - 2 * paddingX;
  const innerHeight = height - 2 * paddingY;
  //
  const x = scaleBand()
    .range([0, innerWidth])
    .paddingInner(_paddingInner)
    .paddingOuter(_paddingOuter);
  const y = scaleLinear().range([innerHeight, 0]);
  //
  // @init
  useEffect(() => {
    let svg = null;
    let graph = null;
    let xAxis = null;
    let yAxis = null;
    //
    if (isReady && root) {
      if (isActive) {
        svg = select(root)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          //   .style("border", "1px dotted grey")
          .attr("class", _classCanvas);
        graph = svg
          .append("g")
          .attr("class", _classGraph)
          .attr("transform", `translate(${paddingX}, ${paddingY})`);
        xAxis = svg
          .append("g")
          .attr("class", _classXAxis)
          .attr("transform", `translate(${paddingX}, ${height - paddingY})`);
        yAxis = svg
          .append("g")
          .attr("class", _classYAxis)
          .attr("transform", `translate(${paddingX}, ${paddingY})`);
        //
        // can attach static chart labels here
        //  or better do outside hook for reusability
        //  make <svg> reference available outside
        //
      } else {
        // remove svg if turning chart off
        c$.svg && c$.svg.remove();
      }
    }
    //
    setc((c) => ({ ...c, svg, graph, xAxis, yAxis }));
  }, [isReady, root, isActive]);
  //
  // @update; domains, axis
  useEffect(() => {
    if (data && isActive && c$.graph) {
      const { graph, xAxis, yAxis } = c$;
      const bars = graph.selectAll("rect").data(data, key);
      //
      // update scale domains
      x.domain(map(data, key));
      y.domain([0, max(data, value)]);
      //
      // run axis
      // ..can format axis here
      xAxis.call(axisBottom(x).ticks(_ticksX));
      yAxis.call(axisLeft(y).ticks(_ticksY));
      //
      // [current]
      bars
        .attr("x", (d) => x(d.key))
        .attr("y", (d) => y(d.value))
        .attr("width", x.bandwidth)
        .attr("height", (d) => innerHeight - y(d.value));
      // [exit]
      bars.exit().remove();
      // [enter]
      bars
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.key))
        .attr("y", (d) => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", (d) => innerHeight - y(d.value))
        .attr("fill", color)
        .attr("class", _classVerticalBars);
      //
      //   ..tweaks
    }
  }, [data, isActive, c$.graph]);
  //
  //
  return {
    svg: c$.svg,
  };
};

//
export default useBarChart;
