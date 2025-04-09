import { Rectangle } from "./../models/classRectangle";

export function drawAllRectangle(
  rectangleList: Rectangle[],
  canvas: HTMLCanvasElement,
  opacity: number
) {
  rectangleList.forEach((item) => item.draw(canvas, opacity));
}
