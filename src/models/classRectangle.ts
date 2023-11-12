import { handlerLengthLine } from "../helpers/handlerLengthLine";
export let colorList = [
  [134, 166, 157],
  [242, 178, 99],
  [242, 198, 194],
  [242, 133, 133],
  [137, 217, 157],
  [22, 72, 115],
];
export function setColorList() {
  colorList = [
    [134, 166, 157],
    [242, 178, 99],
    [242, 198, 194],
    [242, 133, 133],
    [137, 217, 157],
    [22, 72, 115],
  ];
}
function getColor(color: number[] | null = null): number[] {
  if (!color) {
    let colorRandom = colorList[Math.floor(Math.random() * colorList.length)];
    colorList = colorList.filter(
      (item) => String(item) !== String(colorRandom)
    );
    return colorRandom;
  }
  colorList = colorList.filter((item) => String(item) !== String(color));
  return color!;
}

export class Rectangle {
  id: number;
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  width: number;
  height: number;
  color: number[];
  borderRadius: number;
  contextText: string;
  contextTextFontSize: string;
  activeInput: boolean;

  constructor(
    x: number,
    y: number,
    id: number,
    text?: string,
    textSize?: string,
    color?: number[],
    startX?: number,
    endX?: number,
    startY?: number,
    endY?: number
  ) {
    this.id = id;
    this.startX = startX ?? x - 80;
    this.endX = endX ?? x + 80;
    this.startY = startY ?? y - 90;
    this.endY = endY ?? y + 90;
    this.width = 160;
    this.height = 180;
    this.color = getColor(color);
    this.borderRadius = 30;
    this.contextText = text ?? "";
    this.contextTextFontSize = textSize ?? "";
    this.activeInput = false;
  }
  getInfoRectangle = () => {
    const info = {
      startX: this.startX,
      endX: this.endX,
      startY: this.startY,
      endY: this.endY,
      width: this.width,
      height: this.height,
      color: this.color,
      contextText: this.contextText,
    };
    return info;
  };
  draw = (canvas: HTMLCanvasElement, opacity: number) => {
    let ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.fillStyle = `rgb(${this.color},${opacity})`;
    ctx.moveTo(this.startX + this.borderRadius, this.startY);
    ctx.arcTo(
      this.startX + this.width,
      this.startY,
      this.startX + this.width,
      this.startY + this.height,
      this.borderRadius
    );
    ctx.arcTo(
      this.startX + this.width,
      this.startY + this.height,
      this.startX,
      this.startY + this.height,
      this.borderRadius
    );
    ctx.arcTo(
      this.startX,
      this.startY + this.height,
      this.startX,
      this.startY,
      this.borderRadius
    );
    ctx.arcTo(
      this.startX,
      this.startY,
      this.startX + this.width,
      this.startY,
      this.borderRadius
    );
    ctx.fill();
    if (this.contextText) {
      ctx.font = `${this.contextTextFontSize} Helvetica`;
      ctx.fillStyle = "white";
      if (handlerLengthLine(ctx, this.contextText)!.length > 0) {
        let heightLine = this.startY + 45;
        for (let item of handlerLengthLine(ctx, this.contextText)!) {
          ctx.fillText(item, this.startX + 15, heightLine);
          heightLine += 18;
        }
      }
    }
    ctx.closePath();
  };
  drawText = (canvas: HTMLCanvasElement) => {
    let ctx = canvas.getContext("2d")!;
    if (this.contextText) {
      ctx.font = `${this.contextTextFontSize} Helvetica`;
      ctx.fillStyle = "white";
      if (handlerLengthLine(ctx, this.contextText)!.length > 0) {
        let heightLine = this.startY + 45;
        console.log(handlerLengthLine(ctx, this.contextText));
        for (let item of handlerLengthLine(ctx, this.contextText)!) {
          ctx.fillText(item, this.startX + 15, heightLine);
          heightLine += 18;
        }
      }
    }
  };
  updated = (x: number, y: number) => {
    this.startX = x - 80;
    this.endX = x + 80;
    this.startY = y - 90;
    this.endY = y + 90;
    this.width = 160;
    this.height = 180;
    this.color = this.color;
  };

  wipeOf = (canvas: HTMLCanvasElement) => {
    let ctx = canvas.getContext("2d")!;
    ctx.clearRect(this.startX, this.startY, 160, 180);
  };

  insertText = (textInput: HTMLTextAreaElement) => {
    this.contextText = textInput.value;
    this.contextTextFontSize = textInput.style.fontSize;
    textInput.focus();
  };
  removeText = (canvas: HTMLCanvasElement, textInput: HTMLTextAreaElement) => {
    textInput.value = this.contextText;
    this.contextText = "";
    this.wipeOf(canvas);
    this.draw(canvas, 1);
  };
}
