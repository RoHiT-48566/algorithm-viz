import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import algoMapping from "../AlgoMapping";
import "./Algopage.css";

function AlgoPage() {
  const { algo } = useParams();
  const AlgoComponent = algoMapping[algo];
  return (
    <div className="algoComponent">
      {AlgoComponent ? (
        <Suspense fallback={<div>Loading...</div>}>
          <AlgoComponent />
        </Suspense>
      ) : (
        <div>
          <h2>Algorithm {algo} not found!</h2>
        </div>
      )}
    </div>
  );
}

export default AlgoPage;
