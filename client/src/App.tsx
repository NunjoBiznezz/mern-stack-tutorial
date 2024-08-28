//App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from './components/NoteList';
import CreateNote from './components/CreateNote';
import './App.css';
import { Note } from './types';  // Import the Note type

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    axios.get<Note[]>('http://localhost:5000/items')
        .then(response => {
          setNotes(response.data);
          console.log(response.data)
        })
        .catch(error =>
            console.error('Error fetching notes:', error));
  }, []);

  const handleCreateNote = (newNote: Note) => {
    axios.post<Note>('http://localhost:5000/items/add', newNote)
        .then(response => {
            setNotes([...notes, newNote]);
            console.log('Note created:', response.data)
        })
        .catch(error =>
            console.error('Error creating note:', error));
  };

  const handleUpdateNote = (noteId: string) => {
    console.log(`Update note with ID: ${noteId}`);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note._id !== noteId));
    axios.delete(`http://localhost:5000/items/${noteId}`)
        .then(response =>
            console.log('Note deleted:', response.data))
        .catch(error =>
            console.error('Error deleting note:', error));
  };

  return (
      <div className="container">
        <CreateNote onCreate={handleCreateNote} />
        <NoteList notes={notes}
                  onUpdate={handleUpdateNote}
                  onDelete={handleDeleteNote} />
      </div>
  );
};

export default App;
