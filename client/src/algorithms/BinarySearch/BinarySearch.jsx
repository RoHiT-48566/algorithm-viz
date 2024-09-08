import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import './BinarySearch.css';

const BinarySearch = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState('');
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(array.length - 1);
  const [mid, setMid] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [stepMessage, setStepMessage] = useState('');

  const handleArrayChange = (e) => {
    const value = e.target.value.split(',').map(Number).sort((a, b) => a - b);
    setArray(value);
    setLow(0);
    setHigh(value.length - 1);
    setMid(null);
    setFoundIndex(null);
    setStepMessage('');
  };

  const handleTargetChange = (e) => {
    setTarget(Number(e.target.value));
    setLow(0);
    setHigh(array.length - 1);
    setMid(null);
    setFoundIndex(null);
    setStepMessage('');
  };

  const handleForward = () => {
    if (low <= high) {
      const middle = Math.floor((low + high) / 2);
      setMid(middle);

      if (array[middle] === target) {
        setFoundIndex(middle);
        setStepMessage(`Element found at index ${middle}`);
      } else if (array[middle] < target) {
        setLow(middle + 1);
        setStepMessage(`Element not at index ${middle}. Searching right half.`);
      } else {
        setHigh(middle - 1);
        setStepMessage(`Element not at index ${middle}. Searching left half.`);
      }
    } else {
      setStepMessage('Element is not present in the array');
    }
  };

  const handleBackward = () => {
    if (mid !== null) {
      if (array[mid] === target) {
        setStepMessage('Cannot go backward, element found.');
      } else if (array[mid] < target) {
        setLow(mid - 1);
      } else {
        setHigh(mid + 1);
      }
      setMid(null);
      setStepMessage('Reversed one step.');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4 font-weight-bold">Binary Search</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter array elements separated by commas (e.g., 1,2,3,4,5)"
          onChange={handleArrayChange}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Enter target element"
          onChange={handleTargetChange}
        />
      </div>

      <div className="row">
        <div className="col-md-6">
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

        <div className="col-md-6">
          <div id="visualization" className="d-flex justify-content-center">
            {array.map((num, index) => (
              <div
                key={index}
                className={`array-element ${
                  index === mid ? 'current' : ''
                } ${index === foundIndex ? 'found' : ''}`}
              >
                {num}
              </div>
            ))}
          </div>

          <div className="btn-group mt-3 d-flex justify-content-center">
            <button
              id="backward"
              className="btn btn-primary"
              onClick={handleBackward}
            >
              Backward
            </button>
            <button
              id="forward"
              className="btn btn-success"
              onClick={handleForward}
            >
              Forward
            </button>
          </div>

          <div className="card mt-3 text-center">
            <div className="card-body">
              <p className="card-text">{stepMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinarySearch;
