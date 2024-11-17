import React, { useState } from "react";
import "./MergeSort.css";

const MergeSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepMessage, setStepMessage] = useState('');

  const handleArrayChange = (e) => {
    const value = e.target.value.split(",").map(Number);
    setArray(value);
    setSteps([]);
    setCurrentStep(0);
    setStepMessage('');
    generateMergeSortSteps(value);
  };

  const generateMergeSortSteps = (arr) => {
    const mergeSteps = [];
    const helper = (array) => {
      if (array.length <= 1) return array;
      const mid = Math.floor(array.length / 2);
      const left = helper(array.slice(0, mid));
      const right = helper(array.slice(mid));
      mergeSteps.push({ type: "divide", left, right });
      const merged = merge(left, right, mergeSteps);
      return merged;
    };

    const merge = (left, right, mergeSteps) => {
      let result = [];
      let i = 0, j = 0;
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }
      result = [...result, ...left.slice(i), ...right.slice(j)];
      mergeSteps.push({ type: "merge", result });
      return result;
    };

    helper(arr);
    setSteps(mergeSteps);
  };

  const handleForward = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      const step = steps[currentStep];
      if (step.type === "divide") {
        setStepMessage(`Dividing: Left: [${step.left}] Right: [${step.right}]`);
      } else if (step.type === "merge") {
        setStepMessage(`Merging: Result: [${step.result}]`);
      }
    } else {
      setStepMessage("Sorting Complete!");
    }
  };

  const handleBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const step = steps[currentStep - 1];
      if (step.type === "divide") {
        setStepMessage(`Reversed to Division: Left: [${step.left}] Right: [${step.right}]`);
      } else if (step.type === "merge") {
        setStepMessage(`Reversed to Merge: Result: [${step.result}]`);
      }
    } else {
      setStepMessage("No previous steps to show.");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4 font-weight-bold">Merge Sort</h1>

      {/* Input Section */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter array elements separated by commas (e.g., 5,3,8,6,2)"
          onChange={handleArrayChange}
        />
      </div>

      <div className="row d-flex align-items-start">
        {/* Code Section */}
        <div className="col-md-6">
          <pre>
            <code className="language-javascript">
              {`function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`}
            </code>
          </pre>
        </div>

        {/* Visualization Section */}
        <div className="col-md-6">
          <div id="visualization" className="d-flex flex-column align-items-center">
            {steps.slice(0, currentStep + 1).map((step, index) => (
              <div key={index} className="step">
                {step.type === "divide" ? (
                  <div className="division">
                    <span className="left">Left: [{step.left.join(", ")}]</span>
                    <span className="right">Right: [{step.right.join(", ")}]</span>
                  </div>
                ) : (
                  <div className="merge">
                    <span className="result">Merged: [{step.result.join(", ")}]</span>
                  </div>
                )}
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

export default MergeSortVisualizer;
