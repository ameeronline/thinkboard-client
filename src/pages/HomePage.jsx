import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";

const baseURL = import.meta.env.VITE_API || "http://localhost:5000";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseURL}/notes`);
        setNotes(res.data);
        setIsRateLimited(false); 
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching notes:", error);
        (error.response.status === 429) ? toast.error("Failed to load notes") : T;
        
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  },[]);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading...</div>}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;
