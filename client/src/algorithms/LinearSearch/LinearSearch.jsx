import React, { useState } from "react";
import "./LinearSearch.css";

const LinearSearch = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [foundIndex, setFoundIndex] = useState(null);
  const [stepMessage, setStepMessage] = useState("");
  const [searchComplete, setSearchComplete] = useState(false);

  const handleArrayChange = (e) => {
    const value = e.target.value
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));
    setArray(value);
    setCurrentIndex(0);
    setFoundIndex(null);
    setStepMessage("");
    setSearchComplete(false);
  };

  const handleTargetChange = (e) => {
    setTarget(Number(e.target.value));
    setCurrentIndex(0);
    setFoundIndex(null);
    setStepMessage("");
    setSearchComplete(false);
  };

  const handleForward = () => {
    if (searchComplete || currentIndex >= array.length) {
      setStepMessage("Search is already complete.");
      return;
    }

    if (array[currentIndex] === target) {
      setFoundIndex(currentIndex);
      setStepMessage(`Element found at index ${currentIndex}`);
      setSearchComplete(true);
    } else {
      setStepMessage(`Checking index ${currentIndex + 1}`);
      if (currentIndex + 1 >= array.length) {
        setStepMessage("Element not found in the array.");
        setSearchComplete(true);
      }
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBackward = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setFoundIndex(null); // Reset foundIndex when moving backward
      setStepMessage(`Checking index ${newIndex}`);
      setSearchComplete(false);
    }
  };

  return (
    <div className="binary-search-container">
      {" "}
      {/* Changed className to match BinarySearch */}
      <h1 className="title">Linear Search</h1>
      <div className="grid-container">
        {/* Left Side: Code Section */}
        <div className="code-section">
          <pre>
            <code className="language-javascript">
              {`function linearSearch(arr, target) {
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === target) return i;
  }
  return -1;
}`}
            </code>
          </pre>
        </div>

        {/* Right Side: Interaction Section */}
        <div className="interaction-section">
          {/* Input Fields */}
          <div className="input-fields">
            <input
              type="text"
              className="input-array"
              placeholder="Enter array elements (comma separated)"
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
                className={`array-element ${
                  index === currentIndex ? "current" : ""
                } ${index === foundIndex ? "found" : ""}`}
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
              disabled={currentIndex === 0}
            >
              Backward
            </button>
            <button
              className="btn forward-btn"
              onClick={handleForward}
              disabled={searchComplete || currentIndex >= array.length}
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

export default LinearSearch;
