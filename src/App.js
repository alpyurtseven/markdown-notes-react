import './App.css';
import Sidebar from './components/Sidebar';
import Split from 'react-split'
import Editor from './components/Editor';
import {useEffect, useState} from 'react'
import MarkdownStorage from './utils/localStorage/storage';

function App() {
  const [storage, setStorage] = useState(new MarkdownStorage());
  const [selectedNote, setSelectedNote] = useState({});
  const changeNotes = (event)=>{
    setSelectedNote(storage.getNotes().find(note => note.id === event.target.id));
  }

  useEffect(() => {
    storage.createIfNotExists();
    setSelectedNote((storage.getNotes()[0] || {}));
   }, [storage]);

  return (
    <div className="App">
      <Split sizes={[30,70]} direction="horizontal" minSize={300} className='wrap split'>
         <Sidebar changeNotes={changeNotes} selectedNote={selectedNote}/>
         <Editor selectedNote={selectedNote}/>
      </Split> 
    </div>
  );
}

export default App;
