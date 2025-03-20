import React, { useState, useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addNote = () => {
    if (input.trim()) {
      setNotes([...notes, input]);
      setInput("");
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className={`min-h-screen flex flex-col items-center p-5 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">📝 Note-Taking App</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
        <div className="mb-4 flex gap-3">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className="px-4 py-2 border rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
            placeholder="Enter your note..." 
          />
          <button
            onClick={addNote}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
          >
            ➕ Add Note
          </button>
        </div>
        <ul className="w-full">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center">No notes added yet. Start writing! ✏️</p>
          ) : (
            notes.map((note, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 my-2 rounded-lg shadow-md">
                <span className="flex-1">{note}</span>
                <button 
                  onClick={() => deleteNote(index)} 
                  className="text-red-500 hover:text-red-700 transition"
                >
                  ❌
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;