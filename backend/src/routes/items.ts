//items.js

import express from 'express';
import {IItem, Item} from "../models/item"

const router = express.Router();


router.post('/add', (req, res) => {
    const { title, content, status } = req.body;

    const newNote = new Item({
        title,
        content,
        status: status || 'active',
    });

    console.log('Adding new note:', JSON.stringify(newNote))

    newNote.save()
        .then(() => res.json('Note added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.get('/', (req, res) => {
    console.log('Fetching notes')
    Item.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.put('/update/:id', (req, res) => {
    const id = req.params.id
    Item.findById(id, null)
        .then(note => {
            if (note) {
                note.title = req.body.title;
                note.content = req.body.content;
                note.status = req.body.status || note.status;
                note.save()
                    .then(() => res.json('Note updated!'))
                    .catch(err => res.status(400).json(`Error: ${err}`));
            }
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.delete('/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json('Note deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
