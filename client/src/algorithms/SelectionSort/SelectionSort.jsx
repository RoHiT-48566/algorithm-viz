import React, { useState } from "react";
import "./SelectionSort.css";

const SelectionSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [minIndex, setMinIndex] = useState(0);
  const [sortedIndex, setSortedIndex] = useState(0);
  const [stepMessage, setStepMessage] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [history, setHistory] = useState([]);

  const handleArrayChange = (e) => {
    const value = e.target.value.split(",").map(Number);
    setArray(value);
    setCurrentIndex(0);
    setMinIndex(0);
    setSortedIndex(0);
    setStepMessage("");
    setIsSorted(false);
    setHistory([]);
  };

  const handleForward = () => {
    let newArray = [...array];
    let i = currentIndex;
    let minIdx = minIndex;

    if (isSorted) {
      setStepMessage("Array is fully sorted!");
      return;
    }

    setHistory([
      ...history,
      { array: [...array], currentIndex, minIndex, sortedIndex, stepMessage },
    ]);

    if (i >= newArray.length) {
      [newArray[minIdx], newArray[sortedIndex]] = [
        newArray[sortedIndex],
        newArray[minIdx],
      ];
      setArray(newArray);
      setSortedIndex(sortedIndex + 1);

      if (sortedIndex + 1 >= newArray.length - 1) {
        setIsSorted(true);
        setStepMessage("Array is fully sorted!");
        return;
      }

      setCurrentIndex(sortedIndex + 1);
      setMinIndex(sortedIndex + 1);
      setStepMessage(`Swapped elements at index ${minIdx} and ${sortedIndex}.`);
    } else {
      if (newArray[i] < newArray[minIdx]) {
        minIdx = i;
      }

      setCurrentIndex(i + 1);
      setMinIndex(minIdx);
      setStepMessage(
        `Checked element at index ${i}. Minimum is at index ${minIdx}.`
      );
    }
  };

  const handleBackward = () => {
    if (history.length === 0) {
      setStepMessage("No previous step available.");
      return;
    }

    const lastState = history[history.length - 1];
    setArray(lastState.array);
    setCurrentIndex(lastState.currentIndex);
    setMinIndex(lastState.minIndex);
    setSortedIndex(lastState.sortedIndex);
    setStepMessage(lastState.stepMessage);
    setHistory(history.slice(0, -1));
  };

  return (
    <div className="selection-sort-container">
      <h1 className="title">Selection Sort</h1>
      <div className="grid-container">
        {/* Left Side: Code Section */}
        <div className="code-section">
          <pre>
            <code className="language-javascript">
              {`function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      let temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
  return arr;
}`}
            </code>
          </pre>
        </div>

        {/* Right Side: Grid Layout */}
        <div className="interaction-section">
          {/* Input Fields */}
          <div className="input-fields">
            <input
              type="text"
              className="input-array"
              placeholder="Enter array elements separated by commas (e.g., 5,3,8,6,2)"
              onChange={handleArrayChange}
            />
          </div>

          {/* Visualization */}
          <div className="visualization">
            {array.map((num, index) => (
              <div
                key={index}
                className={`array-element ${
                  index === currentIndex ? "current" : ""
                } ${index === minIndex ? "min-element" : ""} ${
                  index < sortedIndex ? "sorted" : ""
                }`}
              >
                {num}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button className="btn backward-btn" onClick={handleBackward}>
              Backward
            </button>
            <button className="btn forward-btn" onClick={handleForward}>
              Forward
            </button>
          </div>

          {/* Output Message */}
          <div className="output-message">
            <p>{stepMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionSortVisualizer;
