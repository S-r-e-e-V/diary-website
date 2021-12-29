import React from "react";
import { Quill } from "react-quill";
import "../constant/EditorFonts.css";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
// Font.whitelist = [
//   "arial",
//   "Roboto",
//   "comic-sans",
//   "courier-new",
//   "georgia",
//   "helvetica",
//   "lucida",
// ];
Font.whitelist = [
  "Arial",
  "Roboto",
  "Raleway",
  "Ayuthaya",
  "Bradley-Hand",
  "Chalkduster",
  "Snell-Roundhand",
  "Trattatello",
  "monospace",
  "comic-sans",
  "courier-new",
  "Georgia",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

// Quill Toolbar component
export const QuillToolbar = ({ Save, isHideTools }) => (
  <div
    id="toolbar"
    style={isHideTools ? { display: "none" } : { display: "block" }}
  >
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="Arial">Arial</option>
        <option value="Roboto">Roboto</option>
        <option value="Raleway">Raleway</option>
        <option value="Ayuthaya">Ayuthaya</option>
        <option value="Bradley-Hand">Bradley Hand</option>
        <option value="Chalkduster">Chalkduster</option>
        <option value="Snell-Roundhand">Snell Roundhand</option>
        <option value="Trattatello">Trattatello</option>
        <option value="monospace">monospace</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    {/* <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
      <button className="ql-direction" />
    </span> */}
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-clean" />
      {/* <button className="ql-image" />
      <button className="ql-video" /> */}
    </span>
    <span className="ql-formats">
      {/* <button className="ql-formula" />
      <button className="ql-code-block" /> */}
    </span>
    <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>
    <span className="ql-save" style={{ cursor: "pointer" }} onClick={Save}>
      Save
    </span>
  </div>
);
export default QuillToolbar;
