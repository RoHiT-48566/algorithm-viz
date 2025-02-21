import React, { useState } from "react";
import "./MergeSort.css";

const MergeSort = () => {
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepMessage, setStepMessage] = useState("");
  const [steps, setSteps] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const handleArrayChange = (e) => {
    const value = e.target.value
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));
    setArray(value);
    setCurrentIndex(0);
    setStepMessage("");
    setIsSorted(false);
    const mergeSortSteps = generateMergeSortSteps([...value]);
    setSteps(mergeSortSteps);
  };

  const generateMergeSortSteps = (arr) => {
    const resultSteps = [];
    const mergeSort = (arr, left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right, resultSteps);
      }
    };

    const merge = (arr, left, mid, right, steps) => {
      let leftArr = arr.slice(left, mid + 1);
      let rightArr = arr.slice(mid + 1, right + 1);
      let i = 0,
        j = 0,
        k = left;

      steps.push({
        array: [...arr],
        message: `Dividing array into [${leftArr}] and [${rightArr}]`,
      });

      while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          steps.push({
            array: [...arr],
            message: `Merging: ${leftArr[i]} is smaller, placing it first.`,
          });
          i++;
        } else {
          arr[k] = rightArr[j];
          steps.push({
            array: [...arr],
            message: `Merging: ${rightArr[j]} is smaller, placing it first.`,
          });
          j++;
        }
        k++;
      }

      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        steps.push({
          array: [...arr],
          message: `Adding remaining element: ${leftArr[i]}`,
        });
        i++;
        k++;
      }

      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        steps.push({
          array: [...arr],
          message: `Adding remaining element: ${rightArr[j]}`,
        });
        j++;
        k++;
      }
    };

    mergeSort(arr, 0, arr.length - 1);
    resultSteps.push({
      array: [...arr],
      message: "Sorting completed!",
      isSorted: true,
    });
    return resultSteps;
  };

  const handleForward = () => {
    if (currentIndex < steps.length) {
      const currentStep = steps[currentIndex];
      setArray(currentStep.array);
      setStepMessage(currentStep.message);
      setCurrentIndex(currentIndex + 1);
      if (currentStep.isSorted) {
        setIsSorted(true);
      }
    }
  };

  const handleBackward = () => {
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      setArray(prevStep.array);
      setStepMessage(prevStep.message);
      setCurrentIndex(currentIndex - 1);
      setIsSorted(false);
    }
  };

  return (
    <div className="merge-sort-container">
      <h1 className="title">Merge Sort</h1>
      <div className="grid-container">
        <div className="code-section">
          <pre>
            <code className="language-javascript">
              {`function mergeSort(arr, left, right) {
  if (left < right) {
    let mid = Math.floor((left + right) / 2);
    console.log('Dividing:', arr.slice(left, mid + 1), 'and', arr.slice(mid + 1, right + 1));
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
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
                className={`array-element ${isSorted ? "sorted" : ""}`}
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

export default MergeSort;
