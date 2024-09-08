import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import "./LinearSearch.css";

const LinearSearchVisualizer = () => {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [foundIndex, setFoundIndex] = useState(null);
    const [stepMessage, setStepMessage] = useState('');
  
    const handleArrayChange = (e) => {
      const value = e.target.value.split(',').map(Number);
      setArray(value);
      setCurrentIndex(0);
      setFoundIndex(null);
      setStepMessage('');
    };
  
    const handleTargetChange = (e) => {
      setTarget(Number(e.target.value));
      setCurrentIndex(0);
      setFoundIndex(null);
      setStepMessage('');
    };
  
    const handleForward = () => {
      if (currentIndex < array.length) {
        if (array[currentIndex] === target) {
          setFoundIndex(currentIndex);
          setStepMessage(`Element found at index ${currentIndex}`);
        } else {
          setStepMessage(`Checking index ${currentIndex + 1}`);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      } else {
        setStepMessage('Element is not present in the array');
      }
    };
  
    const handleBackward = () => {
      if (currentIndex > 0) {
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex);
        setFoundIndex(null);
        setStepMessage(`Checking index ${newIndex}`);
      }
    };
  
    return (
      <div className="container">
        <h1 className="text-center my-4 font-weight-bold">Linear Search</h1>
  
        {/* Input Section */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter array elements"
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
          {/* Code Section */}
          <div className="col-md-6">
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
  
          {/* Visualization Section */}
          <div className="col-md-6">
            <div id="visualization" className="d-flex justify-content-center">
              {array.map((num, index) => (
                <div
                  key={index}
                  className={`array-element ${
                    index === currentIndex ? 'current' : ''
                  } ${index === foundIndex ? 'found' : ''}`}
                >
                  {num}
                </div>
              ))}
            </div>
  
            {/* Button Group */}
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
  
            {/* Step Message Card */}
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
  
  export default LinearSearchVisualizer;
