import React, { useState } from 'react';
import './BubbleSort.css';

const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [stepMessage, setStepMessage] = useState('');

  const handleArrayChange = (e) => {
    const value = e.target.value.split(',').map(Number);
    setArray(value);
    setCurrentIndex(0);
    setSwapping(false);
    setSorted(false);
    setStepMessage('');
  };

  const handleForward = () => {
    if (sorted) return;

    let newArray = [...array];
    let i = currentIndex;
    let swapped = false;

    if (newArray[i] > newArray[i + 1]) {
      [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
      swapped = true;
      setSwapping(true);
    }

    setArray(newArray);

    if (i + 1 >= newArray.length - 1) {
      setCurrentIndex(0);
      if (!swapped) {
        setSorted(true);
        setStepMessage('Array is sorted!');
      } else {
        setStepMessage('Completed one full pass. Moving to the next pass.');
      }
    } else {
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
    if (currentIndex === 0 && swapping) return;

    let newArray = [...array];
    let i = currentIndex;
    let unswapped = false;

    if (swapping) {
      [newArray[i - 1], newArray[i]] = [newArray[i], newArray[i - 1]];
      unswapped = true;
    }

    setArray(newArray);

    if (i === 0) {
      setStepMessage('Reversed one pass. Moving to the previous pass.');
    } else {
      setCurrentIndex(i - 1);
      setSwapping(unswapped);
      setStepMessage(
        unswapped
          ? `Reversed swap of elements at index ${i - 1} and ${i}.`
          : `Reversed step at index ${i - 1}.`
      );
    }
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
                } ${sorted ? 'sorted' : ''}`}
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
