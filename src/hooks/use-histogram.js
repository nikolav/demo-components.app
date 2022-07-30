import { useEffect, useState, useMemo } from "react";
import {
  scaleLinear,
  extent,
  transition,
  interpolate,
  scaleOrdinal,
  select,
} from "d3";
import { has, reduce, identity, merge, map, groupByCount } from "../util";
import { useWindowDocument } from "./use-window";
//
const OPTIONS = {
  width: 640,
  height: 480,
  padding: 12,
  color: "steelblue",
};

//
const usePieChart = ({ data, root, isActive = true, options = {} }) => {
  const [canvas$, setCanvas] = useState({
    svg: null,
    graph: null,
  });
  const { width, height, padding, color } = useMemo(
    () => merge({}, OPTIONS, options),
    [options]
  );
  const { isReady } = useWindowDocument();
  //
  const innerWidth = width - 2 * padding;
  const innerHeight = width - 2 * padding;
  //
  const x = scaleLinear().range([0, innerWidth]).domain([0, 100]);
  const y = scaleLinear()
    .range([0, innerHeight])
    .domain(extent(data, identity));
  //
  useEffect(() => {
    let svg = null;
    let graph = null;
    //
    // @init; draw initial graph, axis, labels
    if (isReady && root) {
      if (isActive) {
        //  1. create angles
        //  2. create paths
        svg = select(root)
          .append("svg")
          .style("border", "1px dotted gray")
          .attr("width", innerWidth)
          .attr("height", innerHeight);
        //graph container
        graph = svg
          .append("g")
          .attr("transform", `translate(${padding}, ${padding})`);
        //
      } else {
        if (canvas$.svg) {
          canvas$.svg.remove();
          resetCanvas_();
          return;
        }
      }
      //
    }
    //
    setCanvas((c) => ({ ...c, svg, graph, legend }));
  }, [isReady, root, isActive]);
  //
  // @update
  useEffect(() => {
    if (isActive && data && canvas$.graph) {
      const { graph: g, legend } = canvas$;
      // refresh domain
      y.domain(extent(data, identity))
      // get elements
      const paths = g.selectAll("rect").data(piegen(data));
      const t = transition().duration(567);
      // current
      paths.transition(t).attrTween("d", arctween_update);
      // exit
      paths.exit().transition(t).attrTween("d", arctween_exit).remove();
      // enter
      paths
        .enter()
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", (d) => color(d.data.key))
        .each((d, i, n) => (n[i]._d = d))
        .transition(t)
        .attrTween("d", arctween_enter);
    }
  }, [isActive, data, canvas$.graph]);
  //
  //
  function resetCanvas_() {
    setCanvas({ svg: null, graph: null });
  }
  //
};
//
export default usePieChart;
