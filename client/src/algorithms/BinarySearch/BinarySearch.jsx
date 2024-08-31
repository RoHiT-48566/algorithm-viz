import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import "./BinarySearch.css";

function BinarySearch() {
  const [message, setMessage] = useState("");
  const [lowIndex, setLowIndex] = useState(null);
  const [highIndex, setHighIndex] = useState(null);
  const [midIndex, setMidIndex] = useState(null);
  const [searching, setSearching] = useState(false);
  const values = [1, 3, 4, 5, 7, 9, 11, 13, 15];
  const target = 13;
  const timeoutRefs = useRef([]);

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const binarySearch = () => {
    setMessage("");
    setSearching(true);
    setLowIndex(null);
    setHighIndex(null);
    setMidIndex(null);
    clearAllTimeouts();

    let low = 0;
    let high = values.length - 1;

    const searchStep = () => {
      if (low > high) {
        setMessage("Target element not found.");
        setSearching(false);
        return;
      }

      const mid = Math.floor((low + high) / 2);

      const timeoutId = setTimeout(() => {
        setLowIndex(low);
        setHighIndex(high);
        setMidIndex(mid);

        if (values[mid] === target) {
          setMessage(`Target element ${target} found at index ${mid}!`);
          setSearching(false);
        } else if (values[mid] < target) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }

        searchStep();
      }, 2000);

      timeoutRefs.current.push(timeoutId);
    };

    searchStep();
  };

  return (
    <div>
      <p className="heading">Binary Search</p>
      <Button
        onClick={binarySearch}
        disabled={searching}
        className="search-btn"
      >
        Search
      </Button>
      <div className="values-container">
        {values.map((value, index) => (
          <div
            key={index}
            className={`value-box ${
              index === lowIndex ? "low-highlight" : ""
            } ${index === highIndex ? "high-highlight" : ""} ${
              index === midIndex ? "mid-highlight" : ""
            }`}
          >
            {value}
          </div>
        ))}
      </div>
      <p>{message}</p>
    </div>
  );
}

export default BinarySearch;
