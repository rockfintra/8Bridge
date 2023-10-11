import React, { useState } from "react";
import PairsTable from "./PairsTable";
import "./PairsList.scss";

const PairsList: React.FC = () => {
  const [selectedInterval, setSelectedInterval] = useState("24h");
  const [selectedType, setSelectedType] = useState("pairs");

  return (
    <div>
      
      {
        {
          pairs: <PairsTable />,
          gainers: <PairsTable />,
          losers: <PairsTable />,
        }[selectedType]
      }
    </div>
  );
};

export default PairsList;
