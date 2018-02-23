export class Process {
  id: number;
  name: string;
  processTypeId: number;
  image: string;

  constructor(id: number, name: string, processTypeId: number, image: string) {
    this.id = id;
    this.name = name;
    this.processTypeId = processTypeId;
    this.image = image;
  }
}
