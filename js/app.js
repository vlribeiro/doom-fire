let firePixelsArray = [];

const fireColorsPalette = [
  { r: 7, g: 7, b: 7 },
  { r: 31, g: 7, b: 7 },
  { r: 47, g: 15, b: 7 },
  { r: 71, g: 15, b: 7 },
  { r: 87, g: 23, b: 7 },
  { r: 103, g: 31, b: 7 },
  { r: 119, g: 31, b: 7 },
  { r: 143, g: 39, b: 7 },
  { r: 159, g: 47, b: 7 },
  { r: 175, g: 63, b: 7 },
  { r: 191, g: 71, b: 7 },
  { r: 199, g: 71, b: 7 },
  { r: 223, g: 79, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 103, b: 15 },
  { r: 207, g: 111, b: 15 },
  { r: 207, g: 119, b: 15 },
  { r: 207, g: 127, b: 15 },
  { r: 207, g: 135, b: 23 },
  { r: 199, g: 135, b: 23 },
  { r: 199, g: 143, b: 23 },
  { r: 199, g: 151, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 175, b: 47 },
  { r: 183, g: 175, b: 47 },
  { r: 183, g: 183, b: 47 },
  { r: 183, g: 183, b: 55 },
  { r: 207, g: 207, b: 111 },
  { r: 223, g: 223, b: 159 },
  { r: 239, g: 239, b: 199 },
  { r: 255, g: 255, b: 255 },
];

const fireInfo = {
  width: 0,
  height: 0,
  virtualWidth: 0,
  virtualHeight: 0,
  pixelArray: [],
  init() {
    this.width = canvasInfo.canvas.width;
    this.height = canvasInfo.canvas.height;
    this.virtualWidth = this.width / canvasInfo.pixelSize;
    this.virtualHeight = this.height / canvasInfo.pixelSize;
    this.pixelArray = new Array(
      ((this.width / canvasInfo.pixelSize) * this.height) / canvasInfo.pixelSize
    ).fill(0);
  },
  createSource() {
    const lastRowIndex = this.pixelArray.length - this.virtualWidth;

    for (let i = lastRowIndex; i < this.pixelArray.length; i++) {
      this.pixelArray[i] = 36;
    }
  },
  propagate() {
    for (let i = 0; i < this.pixelArray.length; i++) {
      let belowIndex = i + this.virtualWidth;
      if (belowIndex < this.pixelArray.length) {
        const decay = Math.floor(Math.random() * 3);
        this.pixelArray[i - decay * 0.5] = Math.max(
          this.pixelArray[belowIndex] - decay,
          0
        );
      }
    }
  },
  render(showInfo) {
    for (const [i, v] of this.pixelArray.entries()) {
      canvasInfo.context.fillStyle = "#fff5f5";

      const pixelX = (i % this.virtualWidth) * canvasInfo.pixelSize,
        pixelY = Math.floor(i / this.virtualWidth) * canvasInfo.pixelSize;

      canvasInfo.context.fillStyle = `rgb(${fireColorsPalette[v].r},${fireColorsPalette[v].g},${fireColorsPalette[v].b})`;
      canvasInfo.context.fillRect(
        pixelX,
        pixelY,
        canvasInfo.pixelSize,
        canvasInfo.pixelSize
      );

      canvasInfo.context.lineWidth = 0.5;
      canvasInfo.context.strokeStyle = "#1a202c";
      canvasInfo.context.strokeRect(
        pixelX,
        pixelY,
        canvasInfo.pixelSize,
        canvasInfo.pixelSize
      );

      const random = Math.random();

      canvasInfo.canvas.style.setProperty(
        "--light1-opacity",
        0.1 + random / 100
      );
      canvasInfo.canvas.style.setProperty(
        "--light2-opacity",
        0.04 + random / 1000
      );

      if (showInfo) this.renderInfo();
    }
  },
  renderInfo() {
    canvasInfo.context.fillStyle = "#1a202c";
    canvasInfo.context.font = "16px serif";
    canvasInfo.context.textAlign = "center";
    canvasInfo.context.textBaseline = "middle";
    canvasInfo.context.fillText(
      v,
      pixelX + canvasInfo.pixelSize / 2,
      pixelY + canvasInfo.pixelSize / 2
    );

    canvasInfo.context.fillStyle = "#4a5568";
    canvasInfo.context.font = "12px serif";
    canvasInfo.context.textAlign = "right";
    canvasInfo.context.textBaseline = "top";
    canvasInfo.context.fillText(
      i,
      pixelX + canvasInfo.pixelSize - 6,
      pixelY + 6
    );
  },
  loop() {
    this.propagate();
    this.render();

    setTimeout(this.loop.bind(this), 50);
  },
};

const canvasInfo = {
  canvas: null,
  context: null,
  pixelSize: 8,
  init() {
    this.canvas = document.querySelector("#fire-canvas");
    this.context = this.canvas.getContext("2d");

    this.context.fillStyle = "#1a202c";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function start() {
  canvasInfo.init();
  fireInfo.init();

  fireInfo.createSource();
  fireInfo.loop();
}

document.addEventListener("DOMContentLoaded", start);
