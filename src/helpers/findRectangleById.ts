import { rectangleList } from "./../store/index";
export function findRectangleById(id: number) {
  const result = rectangleList.find((item) => item.id === id);
  return result;
}
