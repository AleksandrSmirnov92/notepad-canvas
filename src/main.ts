import "./style.css";
import "./reset.css";
import { handleCanvas } from "./Components/Canvas/HandleCanvas";
import { handleLinks } from "./Components/Header/HandleLInks";
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  <div class="notepad-container">
  <header class="header-container">
  <div class="header">
  <div class="header-empty"></div>
  <div class="header-title"><h1>Canvas Notepad</h1></div>
  <div class="header-links">
  <a class="link-save">
  <img src="save.svg"/>
  </a>
  <div class="download-container">
  <a class="link-download">
  <input type="file" id="file" class="fileUpload"></input>
  <label for="file">
  <img src="download.svg"/>
  </label>
  </a>
  </div>
  </div>
  </div>
  </header>
  <div class="canvas-сontainer">
  <canvas id="canvas"></canvas>
  </div>
  </div>
  </div>
`;

handleCanvas(document.querySelector<HTMLCanvasElement>("canvas")!);
handleLinks(
  document.querySelector<HTMLLinkElement>(".link-save")!,
  document.querySelector<HTMLDivElement>(".download-container")!,
  document.querySelector<HTMLCanvasElement>("canvas")!
);
