// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Apply from "./components/Apply";
import Vote from "./components/Vote";
import Results from "./components/Results";
import Home from "./components/Home";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        {/* Header */}
        <header className="py-6">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-extrabold gap-2">College Voting Portal</h1>
            <nav className="space-x-6">
              {user ? (
                <>
                  <Link className="hover:text-yellow-300 text-xl" to="/home">Home</Link>
                  <Link className="hover:text-yellow-300 text-xl" to="/apply">Apply</Link>
                  <Link className="hover:text-yellow-300 text-xl" to="/vote">Vote</Link>
                  <Link className="hover:text-yellow-300 text-xl" to="/results">Results</Link>
                  <Link className="hover:text-yellow-300 text-xl" to="/login">Logout</Link>
                </>
              ) : (
                <>
                  <Link className="hover:text-yellow-300" to="/signup">Register</Link>
                  <Link className="hover:text-yellow-300" to="/login">Login</Link>
                </>
              )}
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            {/* Protected Routes */}
            <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
            <Route path="/apply" element={user ? <Apply user={user} /> : <Navigate to="/login" />} />
            <Route path="/vote" element={user ? <Vote user={user} /> : <Navigate to="/login" />} />
            <Route path="/results" element={user ? <Results user={user} /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
