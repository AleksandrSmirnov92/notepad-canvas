import { Rectangle } from "../models/classRectangle";

export function createListForSave(rectangleList: Rectangle[]) {
  const newList = rectangleList.map((item) => {
    let result = {
      id: item.id,
      startX: item.startX,
      endX: item.endX,
      startY: item.startY,
      endY: item.endY,
      color: item.color,
      text: item.contextText,
      textSize: item.contextTextFontSize,
    };
    return result;
  });
  return newList;
}
