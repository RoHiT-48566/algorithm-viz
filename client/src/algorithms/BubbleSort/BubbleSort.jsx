import React, { useState } from "react";
import "./BubbleSort.css";

const BubbleSort = () => {
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);
  const [history, setHistory] = useState([]);
  const [stepMessage, setStepMessage] = useState("");

  const handleArrayChange = (e) => {
    const value = e.target.value.split(",").map(Number);
    setArray(value);
    setCurrentIndex(0);
    setCurrentPass(0);
    setStepMessage("");
    setHistory([]);
  };

  const handleForward = () => {
    let newArray = [...array];

    // Perform the swap if necessary
    if (currentIndex < newArray.length - 1 - currentPass) {
      if (newArray[currentIndex] > newArray[currentIndex + 1]) {
        [newArray[currentIndex], newArray[currentIndex + 1]] = [
          newArray[currentIndex + 1],
          newArray[currentIndex],
        ];
        setStepMessage(
          `Swapped elements at index ${currentIndex} and ${currentIndex + 1}.`
        );
      } else {
        setStepMessage(`No swap needed at index ${currentIndex}.`);
      }

      setArray(newArray);
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of the pass
      if (currentPass >= array.length - 1) {
        // If all passes are completed
        setStepMessage("Array is sorted!");
      } else {
        setCurrentPass(currentPass + 1);
        setCurrentIndex(0);
        setStepMessage("Completed one full pass. Moving to the next pass.");
      }
    }

    // Update history
    setHistory([
      ...history,
      { array: [...newArray], currentIndex, currentPass },
    ]);
  };

  const handleBackward = () => {
    if (history.length === 0) {
      setStepMessage("No previous step available.");
      return;
    }

    const lastState = history[history.length - 1];
    setArray(lastState.array);
    setCurrentIndex(lastState.currentIndex);
    setCurrentPass(lastState.currentPass);

    setStepMessage(`Reversed step at index ${lastState.currentIndex}.`);

    setHistory(history.slice(0, -1));
  };

  return (
    <div className="bubble-sort-container">
      <h1 className="title">Bubble Sort</h1>
      <div className="grid-container">
        {/* Left Side: Code Section */}
        <div className="code-section">
          <pre>
            <code className="language-javascript">
              {`function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`}
            </code>
          </pre>
        </div>

        {/* Right Side: Interaction Section */}
        <div className="interaction-section">
          {/* Input Section */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="input-array"
              placeholder="Enter array elements separated by commas (e.g., 5,3,8,6,2)"
              onChange={handleArrayChange}
            />
          </div>

          {/* Visualization Section */}
          <div className="visualization">
            {array.map((num, index) => (
              <div
                key={index}
                className={`array-element ${
                  index === currentIndex || index === currentIndex + 1
                    ? "current"
                    : ""
                } ${index >= array.length - currentPass - 1 ? "sorted" : ""}`}
              >
                {num}
              </div>
            ))}
          </div>

          {/* Button Group */}
          <div className="button-group">
            <button
              className="btn backward-btn"
              onClick={handleBackward}
              disabled={history.length === 0}
            >
              Backward
            </button>
            <button
              className="btn forward-btn"
              onClick={handleForward}
              disabled={currentPass >= array.length - 1}
            >
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

export default BubbleSort;
