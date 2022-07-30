import { useEffect, useState, useMemo } from "react";
import {
  transition,
  interpolate,
  arc,
  pie,
  scaleOrdinal,
  schemeCategory10,
  select,
} from "d3";
import { legendColor } from "d3-svg-legend"
import { merge, map } from "../../util";
import { useWindowDocument } from "../use-window";
//
const OPTIONS = {
  width: 320,
  height: 320,
  padding: 12,
  colors: schemeCategory10,
  innerRadius: 0.55,
  legendWidth: 156,
  //
  key: (d) => d.key,
  value: (d) => d.value,
};

//
const usePieChart = ({ data, root, isActive = true, options = {} }) => {
  const [canvas$, setCanvas] = useState({
    svg: null,
    graph: null,
    legend: null,
  });
  const {
    width,
    legendWidth,
    height,
    value,
    innerRadius,
    colors,
    key,
    padding,
  } = useMemo(() => merge({}, OPTIONS, options), [options]);
  const { isReady } = useWindowDocument();
  // @center.graph
  const c = { x: width / 2, y: height / 2 };
  const outerRadius = Math.min(width, height) / 2 - padding;
  //
  const color = scaleOrdinal(colors);
  const piegen = pie().value(value).sort(null);
  const arcgen = arc()
    .outerRadius(outerRadius)
    // inner radius is percent of outer
    .innerRadius(outerRadius * innerRadius);
  //
  const legendgen = legendColor().shape("circle").scale(color);

  //
  const arctween_exit = (d) => {
    const i = interpolate(d.startAngle, d.endAngle);
    return (t) => {
      d.startAngle = i(t);
      return arcgen(d);
    };
  };
  const arctween_enter = (d) => {
    const i = interpolate(d.endAngle, d.startAngle);
    return (t) => {
      d.startAngle = i(t);
      return arcgen(d);
    };
  };
  const arctween_update = (d, index, n) => {
    const i = interpolate(n[index]._d, d);
    n[index]._d = d;
    return (t) => {
      return arcgen(i(t));
    };
  };

  //
  useEffect(() => {
    let svg = null;
    let graph = null;
    let legend = null;
    //
    // @init; draw initial graph, axis, labels
    if (isReady && root) {
      if (isActive) {
        //  1. create angles
        //  2. create paths
        svg = select(root)
          .append("svg")
          .style("border", "1px dotted gray")
          .attr("width", width + legendWidth)
          .attr("height", height);
        //graph container
        graph = svg.append("g").attr("transform", `translate(${c.x}, ${c.y})`);
        // legend container
        legend = svg
          .append("g")
          .attr("transform", `translate(${width + padding}, ${padding})`);
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
      color.domain(map(data, key));
      //
      legend.call(legendgen);
      //
      const paths = g.selectAll("path").data(piegen(data));
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
    setCanvas({ svg: null, graph: null, legend: null });
  }
};
//
export default usePieChart;
