import React , {useState, useEffect} from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import MarkdownStorage from "../utils/localStorage/storage";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

function Editor(props) {
    const [storage, setStorage] = useState(new MarkdownStorage());
    const [selectedTab, setSelectedTab] = useState("write");
    const [text,setText] = useState(""); 

    useEffect(() => {
      setText(props.selectedNote.value)
    },[props]);

    return (
        <div className="containesr">
        
              <ReactMde
              heightUnits="vh"
              minEditorHeight={'100'}
              maxEditorHeight={'100'}
              onChange={e=>{storage.updateNote({id:props.selectedNote.id, title: props.selectedNote.title, value: e}); setText(e)}}
              value={text}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(converter.makeHtml(markdown))
              }
              childProps={{
                writeButton: {
                  tabIndex: -1
                }
              }}
            />
       
      </div>
    )
}

export default Editor;