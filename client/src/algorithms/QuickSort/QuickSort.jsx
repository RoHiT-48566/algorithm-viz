import React, { useState } from "react";
import "./QuickSort.css";

const QuickSort = () => {
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [leftPointer, setLeftPointer] = useState(null);
  const [rightPointer, setRightPointer] = useState(null);
  const [stepMessage, setStepMessage] = useState("");
  const [steps, setSteps] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  // Handle array input
  const handleArrayChange = (e) => {
    const value = e.target.value
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));
    setArray(value);
    setCurrentIndex(0);
    setPivotIndex(null);
    setLeftPointer(null);
    setRightPointer(null);
    setStepMessage("");
    setIsSorted(false);

    // Generate steps for QuickSort
    const quickSortSteps = generateQuickSortSteps(
      [...value],
      0,
      value.length - 1
    );
    setSteps(quickSortSteps);
  };

  // Function to generate steps for visualization
  const generateQuickSortSteps = (arr, low, high) => {
    const resultSteps = [];
    const quickSort = (arr, low, high) => {
      if (low < high) {
        const pivot = partition(arr, low, high, resultSteps);
        quickSort(arr, low, pivot - 1);
        quickSort(arr, pivot + 1, high);
      }
    };

    const partition = (arr, low, high, steps) => {
      const pivotValue = arr[low];
      let left = low + 1;
      let right = high;

      steps.push({
        array: [...arr],
        pivot: low,
        left,
        right,
        message: `Choosing pivot ${pivotValue} at index ${low}. Starting partitioning.`,
      });

      while (left <= right) {
        while (left <= high && arr[left] <= pivotValue) {
          steps.push({
            array: [...arr],
            pivot: low,
            left,
            right,
            message: `Left pointer at index ${left} (${arr[left]}). It's <= pivot ${pivotValue}, so move right.`,
          });
          left++;
        }

        while (right >= low && arr[right] > pivotValue) {
          steps.push({
            array: [...arr],
            pivot: low,
            left,
            right,
            message: `Right pointer at index ${right} (${arr[right]}). It's > pivot ${pivotValue}, so move left.`,
          });
          right--;
        }

        if (left < right) {
          [arr[left], arr[right]] = [arr[right], arr[left]];
          steps.push({
            array: [...arr],
            pivot: low,
            left,
            right,
            message: `Swapping elements at index ${left} (${arr[right]}) and index ${right} (${arr[left]}).`,
          });
        }
      }

      [arr[low], arr[right]] = [arr[right], arr[low]];
      steps.push({
        array: [...arr],
        pivot: right,
        message: `Placing pivot ${pivotValue} at index ${right}. Partitioning complete.`,
      });

      return right;
    };

    quickSort(arr, low, high);

    resultSteps.push({
      array: [...arr],
      message: "Array is fully sorted.",
      isSorted: true,
    });

    return resultSteps;
  };

  // Handle forward step
  const handleForward = () => {
    if (currentIndex < steps.length - 1) {
      const currentStep = steps[currentIndex];
      setArray(currentStep.array);
      setPivotIndex(currentStep.pivot);
      setLeftPointer(currentStep.left);
      setRightPointer(currentStep.right);
      setStepMessage(currentStep.message);
      setCurrentIndex(currentIndex + 1);

      if (currentStep.isSorted) {
        setIsSorted(true);
        setStepMessage("Array is fully sorted.");
      }
    }
  };

  // Handle backward step
  const handleBackward = () => {
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      setArray(prevStep.array);
      setPivotIndex(prevStep.pivot);
      setLeftPointer(prevStep.left);
      setRightPointer(prevStep.right);
      setStepMessage(prevStep.message);
      setCurrentIndex(currentIndex - 1);
      setIsSorted(false);
    } else {
      setStepMessage("No previous steps available.");
    }
  };

  return (
    <div className="linear-search-container">
      <h1 className="title">Quick Sort Visualization</h1>
      <div className="grid-container">
        <div className="code-section">
          <pre>
            <code className="language-javascript">
              {`function quickSort(arr, low, high) {
  if (low < high) {
    let pivot = partition(arr, low, high);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
  }
}`}
            </code>
          </pre>
        </div>

        <div className="interaction-section">
          <div className="input-fields">
            <input
              type="text"
              className="input-array"
              placeholder="Enter array elements (comma separated)"
              onChange={handleArrayChange}
            />
          </div>

          <div className="visualization">
            {array.map((num, index) => (
              <div
                key={index}
                className={`array-element ${
                  index === pivotIndex ? "pivot" : ""
                } ${index === leftPointer ? "left-pointer" : ""} ${
                  index === rightPointer ? "right-pointer" : ""
                } ${isSorted ? "sorted" : ""}`}
              >
                {num}
              </div>
            ))}
          </div>

          <div className="button-group">
            <button
              className="btn backward-btn"
              onClick={handleBackward}
              disabled={currentIndex === 0}
            >
              Backward
            </button>
            <button
              className="btn forward-btn"
              onClick={handleForward}
              disabled={isSorted}
            >
              Forward
            </button>
          </div>

          <div className="output-message">
            <p>{stepMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSort;
