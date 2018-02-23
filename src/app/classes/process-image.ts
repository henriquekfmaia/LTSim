import * as createjs from 'createjs-module';

export class ProcessImage {
  id: number;
  name: string;
  container: createjs.Container;
  bitmap: createjs.Bitmap;

  constructor(image: string) {
    this.bitmap = new createjs.Bitmap(image);
    this.container = new createjs.Container();
    this.container.x = 20;
    this.container.y = 20;
    this.container.addChild(this.bitmap);
  }

  
}
