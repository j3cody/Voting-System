// ./components/Vote.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Vote = ({ user }) => {
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/candidates");
        setCandidates(res.data);
      } catch (err) {
        console.error("Error fetching candidates", err);
      }
    };
    fetchCandidates();
  }, []);

  const voteCandidate = async (id) => {
    try {
      const res = await axios.post("http://localhost:5000/api/vote", {
        scholarNo: user.scholarNo,
        candidateId: id,
      });
      setMessage(res.data.message);
      // Optionally update the candidate's vote count in UI
      setCandidates(
        candidates.map((c) =>
          c._id === id ? { ...c, votes: c.votes + 1 } : c
        )
      );
    } catch (err) {
      console.error("Error voting", err);
      setMessage(err.response?.data?.message || "Voting failed");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Candidates for CR Election</h2>
      {message && (
        <p className="text-center text-bold  text-2xl text-red-500 mb-4">
          {message}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <div key={candidate._id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl text-blue-800 font-semibold mb-2">{candidate.name}</h3>
            {candidate.scholarNo && (
              <p className="text-gray-700 mb-2">
                <strong>Scholar No:</strong> <label className="text-blue-800 text-bold">{candidate.scholarNo}</label> 
              </p>
            )}
            {candidate.manifesto && (
              <p className="text-gray-700 mb-4">
                <strong>Manifesto:</strong> <label className="text-blue-800 text-bold">{candidate.manifesto}</label> 
              </p>
            )}
            <p className="text-gray-700 mb-4">
              <strong>Votes:</strong> <label className="text-blue-800 text-bold" >{candidate.votes}</label> 
            </p>
            <button
              onClick={() => voteCandidate(candidate._id)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-red
               py-2 px-4 rounded transition duration-300"
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vote;
