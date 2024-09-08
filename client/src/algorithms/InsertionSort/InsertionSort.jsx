import React, { useState } from 'react';
import './InsertionSort.css';

const InsertionSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [sortedIndex, setSortedIndex] = useState(0);
  const [stepMessage, setStepMessage] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [history, setHistory] = useState([]); // To store the history of states

  const handleArrayChange = (e) => {
    const value = e.target.value.split(',').map(Number);
    setArray(value);
    setCurrentIndex(1);
    setSortedIndex(0);
    setStepMessage('');
    setIsSorted(false);
    setHistory([]); // Clear history when a new array is entered
  };

  const handleForward = () => {
    let newArray = [...array];
    let i = currentIndex;
    let j = i;

    if (isSorted) {
      setStepMessage('Array is fully sorted!');
      return;
    }

    // Save the current state to history before making changes
    setHistory([...history, { array: [...array], currentIndex, sortedIndex, stepMessage }]);

    if (i >= newArray.length) {
      setIsSorted(true);
      setStepMessage('Array is fully sorted!');
      return;
    }

    // Insert the current element into the sorted portion of the array
    while (j > 0 && newArray[j - 1] > newArray[j]) {
      [newArray[j], newArray[j - 1]] = [newArray[j - 1], newArray[j]];
      j--;
    }

    setArray(newArray);
    setCurrentIndex(i + 1);
    setSortedIndex(i);

    setStepMessage(`Inserted element at index ${i} into the correct position.`);
  };

  const handleBackward = () => {
    if (history.length === 0) {
      setStepMessage('No previous step available.');
      return;
    }

    const lastState = history[history.length - 1];
    setArray(lastState.array);
    setCurrentIndex(lastState.currentIndex);
    setSortedIndex(lastState.sortedIndex);
    setStepMessage(lastState.stepMessage);
    setHistory(history.slice(0, -1)); // Remove the last state from history
  };

  return (
    <div className="container">
      <h1 className="text-center my-4 font-weight-bold">Insertion Sort</h1>

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

        {/* Visualization Section */}
        <div className="col-md-6">
          <div id="visualization" className="d-flex justify-content-center">
            {array.map((num, index) => (
              <div
                key={index}
                className={`array-element ${
                  index === currentIndex ? 'current' : ''
                } ${index <= sortedIndex ? 'sorted' : ''}`}
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

export default InsertionSortVisualizer;
