import { lazy } from "react";

const algoMapping = {
  "Linear Search": lazy(() =>
    import("../algorithms/LinearSearch/LinearSearch.jsx")
  ),
  "Binary Search": lazy(() =>
    import("../algorithms/BinarySearch/BinarySearch.jsx")
  ),
  "Bubble Sort": lazy(() => import("../algorithms/BubbleSort/BubbleSort.jsx")),
};

export default algoMapping;
