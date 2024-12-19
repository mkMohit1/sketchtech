import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const JoditEditorCustom = () => {
    const [content, setContent] = useState("");
    const editor = useRef(null);

  return (
    <>
        <JoditEditor
                ref={editor}
                value={content}
                onChange={(necontent)=>setContent(necontent)}
              />
    </>
  )
}


export default JoditEditorCustom;