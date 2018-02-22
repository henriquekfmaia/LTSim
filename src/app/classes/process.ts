import { ProcessImage } from './process-image';

export class Process {
  id: number;
  name: string;
  image: ProcessImage;

  constructor() {
    this.image = new ProcessImage();
  }
}
