//NoteList.js

import React from 'react';
import {NoteListProps} from "../types";

const NoteList: React.FC<NoteListProps> = ({ notes, onUpdate, onDelete }) => {
    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        <strong>{note.title}</strong>
                        <p>{note.content}</p>
                        <p>Status: {note.status}</p>
                        <button onClick={() =>
                            onUpdate(note._id || '')}>Update</button>
                        <button onClick={() =>
                            onDelete(note._id || '')}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;
