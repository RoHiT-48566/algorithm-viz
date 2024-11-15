import { lazy } from "react";

const algoMapping = {
  "Linear Search": lazy(() =>
    import("../algorithms/LinearSearch/LinearSearch.jsx")
  ),
  "Binary Search": lazy(() =>
    import("../algorithms/BinarySearch/BinarySearch.jsx")
  ),
  "Bubble Sort": lazy(() => import("../algorithms/BubbleSort/BubbleSort.jsx")),
  "Selection Sort": lazy(() =>
    import("../algorithms/SelectionSort/SelectionSort.jsx")
  ),
  "Insertion Sort": lazy(() =>
    import("../algorithms/InsertionSort/InsertionSort.jsx")
  ),
  "Quick Sort": lazy(() => import("../algorithms/QuickSort/QuickSort.jsx")),
};

export default algoMapping;
