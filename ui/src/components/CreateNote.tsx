//CreateNote.js

import React, { useState } from 'react';

const CreateNote = ({ onCreate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleCreate = () => {
        if (!title || !content) {
            alert('Please enter both title and content.');
            return;
        }

        const newNote = {
            title: title,
            content: content,
            status: 'active',
        };
        onCreate(newNote);

        setTitle('');
        setContent('');
    };

    return (
        <div>
            <h2>Create Note</h2>
            <label>Title:</label>
            <input type="text" value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   name='name' /><br />
            <label>Content:</label>
            <textarea value={content}
                      onChange={(e) => setContent(e.target.value)} /><br />

            <button onClick={handleCreate}>Create Note</button>
        </div>
    );
};

export default CreateNote;
