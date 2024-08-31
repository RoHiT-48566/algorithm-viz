import React from "react";
import "../Menupage/Menupage.css";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import algoMapping from "../AlgoMapping";

function Menupage() {
  const navigate = useNavigate();
  const algorithms = Object.keys(algoMapping);

  const navigateToPage = (algo) => {
    console.log(algo);
    navigate(`/algorithm/${algo}`);
  };

  return (
    <div className="buttons-container">
      {algorithms.map((algo, index) => (
        <Button
          key={index}
          onClick={() => {
            navigateToPage(algo);
          }}
        >
          {algo}
        </Button>
      ))}
    </div>
  );
}

export default Menupage;
