import { Rectangle } from "../../models/classRectangle";
import { findRectangleByCoordinates } from "../../helpers/findRectangleByCordinates";
import { resizeWindowBrowser } from "../../helpers/resizeWindowBrowser";
import { drawAllRectangle } from "../../helpers/drawAllRectangle";
import { createTextArea } from "../../helpers/createTextArea";
import { sortRectangleList } from "../../helpers/sortRectangleList";
import { rectangleList } from "./../../store/index";
import { findRectangleById } from "../../helpers/findRectangleById";

export function handleCanvas(canvas: HTMLCanvasElement) {
  let activeMove = false;
  let currentElement: { id: number; flag: boolean };
  resizeWindowBrowser(canvas, rectangleList);
  window.addEventListener("resize", () =>
    resizeWindowBrowser(canvas, rectangleList)
  );
  function handleMouseDown(event: MouseEvent) {
    let rectangle: Rectangle = findRectangleById(currentElement.id)!;
    rectangle.wipeOf(canvas);
    rectangle.updated(event.offsetX, event.offsetY);
    rectangleList
      .filter((item) => item.id !== rectangle.id)
      .forEach((item) => item.draw(canvas, 1));
    rectangle.draw(canvas, 0.5);
  }

  canvas.addEventListener("mousedown", (event) => {
    currentElement = findRectangleByCoordinates(
      rectangleList,
      event.offsetX,
      event.offsetY
    );
    if (currentElement.flag) {
      canvas.addEventListener("mousemove", handleMouseDown);
      activeMove = true;
      drawAllRectangle(rectangleList, canvas, 1);
    } else {
      console.log("Вы находитесь не на элементе");
    }
  });
  canvas.addEventListener("mouseup", (event) => {
    event.preventDefault();
    sortRectangleList(rectangleList, currentElement.id);
    drawAllRectangle(rectangleList, canvas, 1);
    findRectangleById(currentElement.id)?.draw(canvas, 1);

    if (
      rectangleList.length < 6 &&
      !findRectangleByCoordinates(rectangleList, event.offsetX, event.offsetY)
        .flag &&
      !activeMove
    ) {
      let rectangle = new Rectangle(
        event.offsetX,
        event.offsetY,
        rectangleList.length + 1
      );
      rectangleList.push(rectangle);
      rectangle.draw(canvas, 1);
    }
    canvas.removeEventListener("mousemove", handleMouseDown);
    activeMove = false;
  });
  canvas.addEventListener("dblclick", () => {
    const canvasContainer = document.querySelector(".canvas-сontainer");
    let element = findRectangleById(currentElement.id)!;
    element.activeInput = true;
    const textInput = createTextArea(element.getInfoRectangle());
    element.removeText(canvas, textInput);
    drawAllRectangle(rectangleList, canvas, 1);
    element.draw(canvas, 1);

    if (element && rectangleList.length <= 6) {
      textInput.addEventListener("input", () => {
        let charCount = textInput.value.length;
        textInput.style.fontSize =
          Math.max(18, 18 + charCount <= 18 ? charCount : 18) + "px";
        while (textInput.scrollHeight > textInput.clientHeight) {
          let currentFontSize = parseFloat(
            window
              .getComputedStyle(textInput, null)
              .getPropertyValue("font-size")
          );
          textInput.style.fontSize = currentFontSize - 1 + "px";
        }
      });
      function listenerDBClick() {
        element.insertText(textInput);
        element.draw(canvas, 1);
        textInput.remove();
        document.removeEventListener("click", listenerDBClick);
      }
      document.addEventListener("click", listenerDBClick);
      textInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          element.insertText(textInput);
          element.draw(canvas, 1);
          textInput.remove();
        }
      });
      canvasContainer!.appendChild(textInput);
      element.insertText(textInput);
    }
  });

  return;
}
