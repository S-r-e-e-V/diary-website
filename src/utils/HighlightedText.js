const getHighlightedText = (text, highlight) => {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part, i) => (
    <span
      key={i}
      style={
        part.toLowerCase() === highlight.toLowerCase()
          ? { color: "var(--black)" }
          : {}
      }
    >
      {part}
    </span>
  ));
};
export default getHighlightedText;
