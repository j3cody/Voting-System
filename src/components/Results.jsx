// ./components/Results.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Results = ({ user }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/candidates");
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">Election Results</h2>
      {results.map(candidate => (
        <div key={candidate._id} className="flex justify-between items-center border-b py-4">
          <h3 className="text-xl font-semibold text-blue-800">{candidate.name}</h3>
          <span className="text-blue-800"> Current Votes: {candidate.votes}</span>
        </div>
      ))}
    </div>
  );
};

export default Results;
