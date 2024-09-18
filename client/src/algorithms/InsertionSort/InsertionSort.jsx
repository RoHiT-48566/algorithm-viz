import React, { useState } from "react";
import "./InsertionSort.css";

const InsertionSort = () => {
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [swapIndex, setSwapIndex] = useState(null);
  const [sortedIndex, setSortedIndex] = useState(0);
  const [stepMessage, setStepMessage] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [history, setHistory] = useState([]);

  const handleArrayChange = (e) => {
    const value = e.target.value.split(",").map(Number);
    setArray(value);
    setCurrentIndex(1);
    setSwapIndex(null);
    setSortedIndex(0);
    setStepMessage("");
    setIsSorted(false);
    setHistory([]);
  };

  const handleForward = () => {
    let newArray = [...array];
    let i = currentIndex;

    if (isSorted) {
      setStepMessage("Array is fully sorted!");
      return;
    }

    setHistory([
      ...history,
      { array: [...newArray], currentIndex, sortedIndex, stepMessage },
    ]);

    if (i >= newArray.length) {
      setIsSorted(true);
      setStepMessage("Array is fully sorted!");
      return;
    }

    let j = i;
    let message = `Inserting element at index ${i}.`;
    let initialIndex = i;

    while (j > 0 && newArray[j - 1] > newArray[j]) {
      // Swap elements
      [newArray[j], newArray[j - 1]] = [newArray[j - 1], newArray[j]];
      setArray([...newArray]); // Update array for visualization
      setSwapIndex(j - 1);
      setCurrentIndex(i);

      // Update message for each swap
      message = `Swapped elements at index ${j} and ${j - 1}.`;
      setStepMessage(message);

      // Increment history
      setHistory([
        ...history,
        {
          array: [...newArray],
          currentIndex: i,
          sortedIndex: i - 1,
          stepMessage: message,
        },
      ]);

      j--;
    }

    // Move to next step
    setArray([...newArray]);
    setSwapIndex(null);
    setCurrentIndex(i + 1);
    setSortedIndex(i);
    setStepMessage(`Inserted element ${newArray[i]} at position ${i}.`);

    if (i === newArray.length - 1) {
      setIsSorted(true);
      setStepMessage("Array is fully sorted!");
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
    setSortedIndex(lastState.sortedIndex);
    setStepMessage(lastState.stepMessage);
    setHistory(history.slice(0, -1));
    setIsSorted(false);
  };

  return (
    <div className="insertion-sort-container">
      <h1 className="title">Insertion Sort</h1>
      <div className="grid-container">
        {/* Left Side: Code Section */}
        <div className="code-section">
          <pre>
            <code className="language-javascript">
              {`function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
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
                  index === currentIndex - 1 ? "current" : ""
                } ${index <= sortedIndex ? "sorted" : ""} ${
                  index === swapIndex ? "swapped" : ""
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

export default InsertionSort;
