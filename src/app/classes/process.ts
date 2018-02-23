import { ProcessImage } from './process-image';

export class Process {
  id: number;
  name: string;
  processTypeId: number;
  image: string;
  processImage: ProcessImage;

  constructor(id: number, name: string, processTypeId: number, image: string) {
    this.id = id;
    this.name = name;
    this.processTypeId = processTypeId;
    this.image = image;
  }

  setProcessImage(): void {
    this.processImage = new ProcessImage(this.image);
  }
}
