function MarkdownStorage() {
    this.createIfNotExists = () => {
        if (!localStorage.getItem('markdown-notes')) {
            localStorage.setItem('markdown-notes', JSON.stringify([]));
        }
    }
    this.getNotes = () => {
        return JSON.parse(localStorage.getItem('markdown-notes')) || [];
    }
    this.deleteNote = (id) => {
        const notes = this.getNotes();
        const newNotes = notes.filter(note => note.id !== id);
        localStorage.setItem('markdown-notes', JSON.stringify(newNotes));
    }
    this.addNote = (note) => {
        const notes = this.getNotes();
        const newNotes = [...notes, note];
        localStorage.setItem('markdown-notes', JSON.stringify(newNotes));
    }
    this.updateNote = (note) => {
        const notes = this.getNotes();
        const newNotes = notes.map(n => {
            if (n.id === note.id) {
                return note;
            }
            return n;
        });
        localStorage.setItem('markdown-notes', JSON.stringify(newNotes));
    }
}

export default MarkdownStorage;