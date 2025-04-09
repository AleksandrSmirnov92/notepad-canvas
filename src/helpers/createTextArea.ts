interface CreateTextAreaTypes {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  height: number;
  color: number[];
  contextText: string;
}
export function createTextArea({
  startX,
  startY,
  width,
  height,
  color,
  contextText,
}: CreateTextAreaTypes) {
  const textInput = document.createElement("textarea");
  textInput.id = "text-input";
  textInput.style.left = `${startX + 10}px`;
  textInput.style.top = `${startY + 90}px`;
  textInput.style.backgroundColor = `${color}`;
  textInput.style.position = "absolute";
  textInput.style.maxWidth = `${width - 30}px`;
  textInput.style.minWidth = `${width - 30}px`;
  textInput.style.maxHeight = `${height - 50}px`;
  textInput.style.height = `${height - 50}px`;
  textInput.style.outline = "none";
  textInput.style.resize = "none";
  textInput.style.color = "white";
  textInput.style.textAlign = "center";
  textInput.style.fontFamily = "Helvetica";
  textInput.style.overflow = "hidden";
  textInput.cols = 13;
  textInput.style.lineHeight = "18px";
  textInput.value = contextText;
  return textInput;
}
