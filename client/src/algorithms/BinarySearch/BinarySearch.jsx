import React, { useState } from "react";
import "./BinarySearch.css";

const BinarySearch = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [mid, setMid] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [stepMessage, setStepMessage] = useState("");
  const [history, setHistory] = useState([]);

  const handleArrayChange = (e) => {
    const value = e.target.value
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n))
      .sort((a, b) => a - b);
    setArray(value);
    setLow(0);
    setHigh(value.length - 1);
    setMid(null);
    setFoundIndex(null);
    setStepMessage("");
    setHistory([]);
  };

  const handleTargetChange = (e) => {
    setTarget(Number(e.target.value));
    setLow(0);
    setHigh(array.length - 1);
    setMid(null);
    setFoundIndex(null);
    setStepMessage("");
    setHistory([]);
  };

  const handleForward = () => {
    if (array.length === 0) {
      setStepMessage("Array is empty.");
      return;
    }

    if (low <= high) {
      const middle = Math.floor((low + high) / 2);
      setMid(middle);

      setHistory([...history, { low, high, mid: middle }]);

      if (array[middle] === target) {
        setFoundIndex(middle);
        setStepMessage(`Element found at index ${middle}`);
      } else if (array[middle] < target) {
        const newLow = middle + 1;
        setLow(newLow);
        setStepMessage(`Element not at index ${middle}. Searching right half.`);
      } else {
        const newHigh = middle - 1;
        setHigh(newHigh);
        setStepMessage(`Element not at index ${middle}. Searching left half.`);
      }
    } else {
      setStepMessage("Element is not present in the array");
    }
  };

  const handleBackward = () => {
    if (history.length === 0) {
      setStepMessage("No previous step available.");
      return;
    }

    const lastState = history.pop();
    setLow(lastState.low);
    setHigh(lastState.high);
    setMid(lastState.mid);

    if (foundIndex !== null) {
      setFoundIndex(null);
      setStepMessage("Reversed from found element. Continuing search.");
    } else {
      setStepMessage(
        `Reversed one step. Current range: low = ${lastState.low}, high = ${lastState.high}`
      );
    }

    setHistory([...history]);
  };

  return (
    <div className="binary-search-container">
      <h1 className="title">Binary Search</h1>
      <div className="grid-container">
        {/* Left Side: Code Section */}
        <div className="code-section">
          <pre>
            <code className="language-javascript">
              {`function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while(low <= high) {
    let mid = Math.floor((low + high) / 2);
    if(arr[mid] === target) return mid;
    else if(arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
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
              placeholder="Enter array elements (e.g., 1,2,3,4,5)"
              onChange={handleArrayChange}
            />
            <input
              type="number"
              className="input-target"
              placeholder="Enter target element"
              onChange={handleTargetChange}
            />
          </div>

          {/* Visualization */}
          <div className="visualization">
            {array.map((num, index) => (
              <div
                key={index}
                className={`array-element ${index === mid ? "current" : ""} ${
                  index === foundIndex ? "found" : ""
                }`}
              >
                {num}
              </div>
            ))}
          </div>

          {/* Buttons */}
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
              disabled={array.length === 0 || foundIndex !== null}
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

export default BinarySearch;
