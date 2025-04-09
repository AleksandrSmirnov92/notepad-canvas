import { Rectangle } from "../models/classRectangle";
export function sortRectangleList(rectangleList: Rectangle[], id: number) {
  const indexToFind = rectangleList.findIndex((obj) => obj.id === id);
  if (indexToFind === -1 || indexToFind === rectangleList.length - 1) {
    return rectangleList;
  }
  const foundElement = rectangleList[indexToFind];
  for (let i = indexToFind; i < rectangleList.length - 1; i++) {
    rectangleList[i] = rectangleList[i + 1];
  }
  rectangleList[rectangleList.length - 1] = foundElement;
  return rectangleList;
}
