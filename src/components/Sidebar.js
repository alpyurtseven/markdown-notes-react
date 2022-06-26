import React, {useState} from 'react';
import '../assets/style/sidebar.css';
import MarkdownStorage from '../utils/localStorage/storage';
import {nanoid} from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'




function Sidebar(props){
    const storage = new MarkdownStorage();
    const [notes, setNotes] = useState(storage.getNotes());
    const createNewNote = () => {
        const newNote = {id: nanoid(), title:'Note ' + (notes.length+ 1), value: 'New Note'};
        storage.addNote(newNote);
        setNotes([...notes, newNote]);	
    };
    const handleClick = () => {
        createNewNote();
    };
    const deleteNote = (event,id) => {
        event.stopPropagation();
        storage.deleteNote(id);

        setNotes(storage.getNotes());
    }
    const notesDDOM = (notes || []).map(note => {
        let className = note.id === props.selectedNote.id ? 'container selected' : 'container';
        return <li onClick={props.changeNotes} className={className} id={note.id} key={note.id}>
            <button onClick={(e)=>{deleteNote(e,note.id)}} className='btn btn-light'><FontAwesomeIcon icon={faTrash} /></button>
            {note.title}
            </li>
    }); 

    return (
        <div className="sidebar">
            <div className='header mt-5'>
                <h1>Markdown Notes</h1>
                <button onClick={handleClick} type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark">New Note</button>
            </div>
            <hr/>
            <div className='notes'>
                <ul className='note--list'>
                    {notesDDOM}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;