import { RectangleInfoForSaveTypes } from "./../../types/index";
import { Rectangle, setColorList } from "./../../models/classRectangle";
import { rectangleList, rectangleListClear } from "../../store";
import { createListForSave } from "../../helpers/createListForSave";
import { drawAllRectangle } from "../../helpers/drawAllRectangle";

export function handleLinks(
  save: HTMLLinkElement,
  download: HTMLDivElement,
  canvas: HTMLCanvasElement
) {
  save.addEventListener("click", () => {
    save.setAttribute("download", "text.json");
    if (rectangleList.length > 0) {
      const newRectangleList = createListForSave(rectangleList);
      const str = JSON.stringify(newRectangleList);
      const blob = new Blob([str], { type: "aplication/json" });
      save.href = URL.createObjectURL(blob);
    } else {
      alert("Нет элементов которые можно сохранить");
    }
  });
  download.addEventListener("click", () => {
    setColorList();
    let link = document.querySelector<HTMLLinkElement>(".link-download")!;
    link.addEventListener("click", handleDownload);
    function handleDownload() {
      let input = document.querySelector(".fileUpload")! as HTMLInputElement;
      async function handleInputChange(event: Event) {
        let files = (<HTMLInputElement>event.target).files!;
        let file = files[0];
        async function parseJsonFile(
          file: File
        ): Promise<RectangleInfoForSaveTypes[]> {
          return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (event: ProgressEvent<FileReader>) =>
              resolve(JSON.parse(event.target?.result as string));
            fileReader.onerror = (error) => reject(error);
            fileReader.readAsText(file);
          });
        }
        let res: RectangleInfoForSaveTypes[] = await parseJsonFile(file);
        let rectangle: Rectangle[] = res.map((item: any) => {
          return new Rectangle(
            item.x,
            item.y,
            item.id,
            item.text,
            item.textSize,
            item.color,
            item.startX,
            item.endX,
            item.startY,
            item.endY
          );
        });
        rectangleList.forEach((item) => item.wipeOf(canvas));
        rectangleListClear();
        rectangle.forEach((item) => {
          rectangleList.push(item);
        });
        drawAllRectangle(rectangleList, canvas, 1);
        input.value = "";
        input.removeEventListener("change", handleInputChange);
        link.removeEventListener("click", handleDownload);
      }
      input!.addEventListener("change", handleInputChange);
    }
  });
}
