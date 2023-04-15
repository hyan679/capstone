import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditorHtml({ initalValue, onChange, readOnly = true }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initalValue);
  }, [initalValue]);

  function onEditorChange(e) {
    setValue(e);
    if (onChange) {
      onChange(e);
    }
  }
  return (
    <ReactQuill
      style={{
        height: "60vh",
        backgroundColor: "#fff",
        boxShadow: "2px 5px 5px #ddd",
      }}
      theme={readOnly ? "bubble" : "snow"}
      readOnly={readOnly}
      value={value || ""}
      onChange={onEditorChange}
    />
  );
}

export default EditorHtml;
