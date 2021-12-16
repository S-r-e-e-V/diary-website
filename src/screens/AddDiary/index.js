import React, { useState, useRef, useEffect } from "react";
import "./AddDiary.css";

// text editor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.core.css";
// import "react-quill/dist/quill.bubble.css";
import EditorToolbar, { modules, formats } from "../../utils/EditorToolbar.js";

import { useLocation } from "react-router";

// api calls
import { postData, getData, putData } from "../../api";

// components
import Header from "../../components/Header";
import RingLoading from "../../components/RingLoading";

// utils
import getHighlightedText from "../../utils/HighlightedText";
import moment from "moment";

export default function AddDiary() {
  const search = useLocation().search;
  const type = new URLSearchParams(search).get("type");
  const id = type === "edit" ? new URLSearchParams(search).get("id") : null;

  // const textArea = useRef();
  const [body, setbody] = useState("");
  const [loading, setloading] = useState(false);
  const [diary, setdiary] = useState();
  const [text, settext] = useState();
  const [isHideTools, setisHideTools] = useState(
    type === "edit" ? true : false
  );

  // get diary 📔
  const viewDiary = async () => {
    setloading(true);
    const response = await getData(`/diary/${id}`);
    setloading(false);
    console.log(response);
    setdiary(response);
    setbody(response?.content);
    settext(response?.content);
  };

  // add diary
  const Save = async () => {
    setloading(true);
    if (type === "edit") {
      const payload = {
        id: id,
        content: body,
      };
      const response = await putData(`/diary/update`, payload);
      if (response) setisHideTools(true);
    } else {
      const payload = {
        date: new Date(),
        content: body,
      };
      const response = await postData(`/diary/new`, payload);
    }
    setloading(false);
  };

  useEffect(() => {
    if (type === "edit") viewDiary();
  }, []);

  // search
  const onSearch = (searchTerm) => {
    settext(getHighlightedText(diary?.content, searchTerm));
  };
  console.log(text);

  // const onClickBold = () => {
  // console.log(textArea.current.selectionStart);
  // let sel = window.getSelection();
  // console.log(sel.toString().length);
  // console.log(textArea.current.selectionStart, textArea.current.selectionEnd);
  // setbody(
  //   textArea.current.innerHTML.slice(0, 12) +
  //     `<strong>` +
  //     textArea.current.innerHTML.slice(12, 22) +
  //     `</strong>` +
  //     textArea.current.innerHTML.slice(22)
  // );
  // };
  // console.log(body);
  return (
    <div className="add-diary">
      <RingLoading loading={loading} />
      <Header
        page={isHideTools ? "edit" : "add"}
        date={moment(diary?.date).format("YYYY-MM-DD")}
        edit={() => setisHideTools(false)}
        onSearch={onSearch}
      />
      <EditorToolbar Save={Save} isHideTools={isHideTools} />
      <div className="container">
        {/* <div
          className="textarea"
          contentEditable={true}
          ref={textArea}
          placeholder="Start your diary"
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: body }}
        /> */}
        <ReactQuill
          readOnly={isHideTools}
          placeholder="Start your diary"
          value={body}
          onChange={(e) => setbody(e)}
          modules={modules}
          // formats={formats}
          theme="snow"
        />
      </div>
    </div>
  );
}
// const modules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["link", "image"],
//     ["clean"],
//   ],
// };
// const modules = {
//   toolbar: [
//     ["bold", "italic", "underline", "strike"], // toggled buttons
//     ["blockquote", "code-block"],

//     [{ header: 1 }, { header: 2 }], // custom button values
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ script: "sub" }, { script: "super" }], // superscript/subscript
//     [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//     [{ direction: "rtl" }], // text direction

//     [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],

//     [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//     [{ font: [] }],
//     [{ align: [] }],

//     ["clean"],
//   ],
// };
// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
// ];
