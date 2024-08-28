export interface Note {
    _id?: string;
    content: string;
    title: string;
    status?: string;
    // Add other properties if necessary
}

export interface CreateNoteProps {
    onCreate: (newNote: Note) => void;
}

export interface NoteListProps {
    notes: Note[];
    onUpdate: (noteId: string) => void;
    onDelete: (noteId: string) => void;
}
