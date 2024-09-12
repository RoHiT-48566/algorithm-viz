import React, { useState } from 'react';
import './BubbleSort.css';

const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [pass, setPass] = useState(0); // Track the current pass in Bubble Sort
  const [history, setHistory] = useState([]); // History of steps
  const [stepMessage, setStepMessage] = useState('');

  const handleArrayChange = (e) => {
    const value = e.target.value.split(',').map(Number);
    setArray(value);
    setCurrentIndex(0);
    setSwapping(false);
    setSorted(false);
    setPass(0); // Reset pass
    setStepMessage('');
    setHistory([]); // Clear history when a new array is entered
  };

  const handleForward = () => {
    if (sorted) return;

    let newArray = [...array];
    let i = currentIndex;
    let swapped = false;

    if (newArray[i] > newArray[i + 1]) {
      // Swap elements
      [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
      swapped = true;
      setSwapping(true);
    }

    setArray(newArray);

    // Save the current step to history for backward operation
    setHistory([...history, { array: [...array], currentIndex, pass, swapped }]);

    // Check if this is the last comparison of the current pass
    if (i + 1 >= newArray.length - 1 - pass) {
      // One full pass completed
      setCurrentIndex(0);
      setPass(pass + 1);
      if (!swapped) {
        setSorted(true);
        setStepMessage('Array is sorted!');
      } else {
        setStepMessage('Completed one full pass. Moving to the next pass.');
      }
    } else {
      // Move to the next comparison
      setCurrentIndex(i + 1);
      setSwapping(swapped);
      setStepMessage(
        swapped
          ? `Swapped elements at index ${i} and ${i + 1}.`
          : `No swap needed at index ${i}.`
      );
    }
  };

  const handleBackward = () => {
    if (history.length === 0) {
      setStepMessage('No previous step available.');
      return;
    }

    // Get the last state from the history
    const lastState = history[history.length - 1];
    setArray(lastState.array);
    setCurrentIndex(lastState.currentIndex);
    setPass(lastState.pass);
    setSwapping(lastState.swapped);

    // Adjust step message
    if (lastState.swapped) {
      setStepMessage(`Reversed swap of elements at index ${lastState.currentIndex} and ${lastState.currentIndex + 1}.`);
    } else {
      setStepMessage(`Reversed step at index ${lastState.currentIndex}.`);
    }

    // Remove the last state from history
    setHistory(history.slice(0, -1));

    // If the array was marked sorted, unmark it after going backward
    if (sorted) setSorted(false);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4 font-weight-bold">Bubble Sort</h1>

      {/* Input Section */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter array elements separated by commas (e.g., 5,3,8,6,2)"
          onChange={handleArrayChange}
        />
      </div>

      <div className="row">
        {/* Code Section */}
        <div className="col-md-6">
          <pre>
            <code className="language-javascript">
              {`function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n-1; i++) {
    for (let j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
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
                  index === currentIndex || index === currentIndex + 1
                    ? 'current'
                    : ''
                } ${sorted || index >= array.length - pass ? 'sorted' : ''}`}
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

export default BubbleSortVisualizer;
