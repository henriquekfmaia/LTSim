import * as createjs from 'createjs-module';


export class ProcessImage {
  id: number;
  name: string;
  container: createjs.Container;
  bitmap: createjs.Bitmap;

  constructor() {
    this.bitmap = new createjs.Bitmap('../mock/azul.png');
    this.container = new createjs.Container();
    this.container.x = 20;
    this.container.y = 20;
    this.container.addChild(this.bitmap);
  }
}
