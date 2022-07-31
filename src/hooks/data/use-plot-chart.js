import { useEffect, useState, useMemo } from "react";
import {
  extent,
  axisBottom,
  axisLeft,
  max,
  scaleLinear,
  scaleTime,
  select,
} from "d3";
import { merge } from "../../util";
import { useWindowDocument } from "../use-window";
////
/////
const OPTIONS = {
  width: 550,
  height: 400,
  color: "currentcolor",
  paddingX: 32,
  paddingY: 48,
  //
  // accesor.value
  date: (d) => new Date(d.date),
  value: (d) => d.value,
  //
  // minor tweeks
  _xAxisTextRotationDegrees: -24,
  _xAxisTextOpacity: .85,
  _dotRadius: 4,
  _ticksX: 10,
  _ticksY: 3,
};

const usePlotChart = ({ isActive, data, root, options }) => {
  const { isReady } = useWindowDocument();
  const [c$, setc] = useState({
    svg: null,
    graph: null,
    xAxis: null,
    yAxis: null,
  });
  const {
    width,
    height,
    color,
    paddingX,
    paddingY,
    //
    date,
    value,
    //
    _xAxisTextRotationDegrees,
    _xAxisTextOpacity,
    _dotRadius,
    _ticksX,
    _ticksY,
  } = useMemo(() => merge({}, OPTIONS, options), [options]);
  const innerWidth = width - 2 * paddingX;
  const innerHeight = height - 2 * paddingY;
  //
  // .. skip domain, set @init
  const scT = scaleTime().range([0, innerWidth]);
  const scV = scaleLinear().range([innerHeight, 0]);
  //
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
        // domains @init
        scT.domain(extent(data, date));
        scV.domain([0, max(data, value)]);
        //
        svg = select(root)
          .append("svg")
          .attr("class", "PlotChart--svg")
          .attr("width", width)
          .attr("height", height)
          // .style("border", "1px dotted grey")
          ;

        graph = svg
          .append("g")
          .attr("class", "PlotChart--graph")
          .attr("transform", `translate(${paddingX}, ${paddingY})`);
        xAxis = svg
          .append("g")
          .attr("class", "PlotChart--xAxis")
          // x-axis @bottm
          .attr("transform", `translate(${paddingX}, ${height - paddingY})`);
        yAxis = svg
          .append("g")
          .attr("class", "PlotChart--yAxis")
          // y-axis @left
          .attr("transform", `translate(${paddingX}, ${paddingY})`)
          ;
      } else {
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
      const { graph: g, xAxis, yAxis } = c$;
      const dots = g.selectAll("circle").data(data);
      //
      // update scale domains
      scT.domain(extent(data, date));
      scV.domain([0, max(data, value)]);
      // run axis
      xAxis.call(axisBottom(scT).ticks(_ticksX));
      yAxis.call(axisLeft(scV).ticks(_ticksY));
      //
      //
      // [current]
      //  update position only
      dots
        .attr("cx", (d) => scT(new Date(d.date)))
        .attr("cy", (d) => scV(d.value));
      //
      // [exit]
      dots.exit().remove();
      //
      // [enter]; update shapes
      dots
        .enter()
        .append("circle")
        .attr("class", "PlotChart--dots")
        .attr("r", _dotRadius)
        .attr("cx", (d) => scT(new Date(d.date)))
        .attr("cy", (d) => scV(d.value))
        .attr("fill", color);
      //
      // tweak x-axis text
      xAxis
        .selectAll("text")
        .attr("text-anchor", "end")
        .attr("transform", `rotate(${_xAxisTextRotationDegrees})`)
        .attr("fill-opacity", _xAxisTextOpacity);
    }
  }, [data, isActive, c$.graph]);
  //
};

export default usePlotChart;
