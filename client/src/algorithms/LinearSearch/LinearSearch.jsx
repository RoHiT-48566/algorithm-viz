import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import "./LinearSearch.css";

function LinearSearch() {
  const [message, setMessage] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [searching, setSearching] = useState(false);
  const values = [2, 13, 4, 5, 9, 3, 6];
  const target = 5;
  const timeoutRefs = useRef([]);

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const linearSearch = () => {
    setMessage("");
    setSearching(true);
    setHighlightIndex(null);
    clearAllTimeouts();

    values.forEach((value, index) => {
      const timeoutId = setTimeout(() => {
        setHighlightIndex(index);
        if (value === target) {
          setMessage(`Target element ${target} found at index ${index}!`);
          setSearching(false);
          clearAllTimeouts();
        } else if (index === values.length - 1) {
          setMessage("Target element not found.");
          setSearching(false);
        }
      }, index * 2000); // Adjust delay as needed
      timeoutRefs.current.push(timeoutId);
    });
  };

  return (
    <div>
      <p className="heading">Linear Search</p>
      <Button
        onClick={linearSearch}
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
              highlightIndex === index ? "highlight" : ""
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

export default LinearSearch;
