import { useEffect, useState, useMemo } from "react";
import { extent, axisBottom, axisLeft, max, scaleLinear, select } from "d3";
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
  value: (d) => d.value,
  //
  // minor tweeks
  _xAxisTextRotationDegrees: -24,
  _xAxisTextOpacity: 0.85,
  _ticksX: 10,
  _ticksY: 3,
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
  const {
    width,
    height,
    color,
    paddingX,
    paddingY,
    //
    value,
    //
    _xAxisTextRotationDegrees,
    _xAxisTextOpacity,
    _ticksX,
    _ticksY,
  } = useMemo(() => merge({}, OPTIONS, options), [options]);
  const innerWidth = width - 2 * paddingX;
  const innerHeight = height - 2 * paddingY;
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
      } else {
        // remove svg
      }
    }
    //
  }, [isReady, root, isActive]);
  //
  // @update; domains, axis
  useEffect(() => {
    if (data && isActive && c$.graph) {
      // update
      // update scale domains
      // run axis
      // [current]
      // [exit]
      // [enter]; update shapes
      //   ..tweak x-axis
    }
  }, [data, isActive, c$.graph]);
};
