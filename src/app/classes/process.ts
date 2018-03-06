import { ProcessDetailComponent } from "../process-detail/process-detail.component";

export class Process {
  id: number;
  name: string;
  processTypeId: number;
  image: string;
  input: Process[];
  output: Process[];

  constructor(id: number, name: string, processTypeId: number, image: string) {
    this.id = id;
    this.name = name;
    this.processTypeId = processTypeId;
    this.image = image;
    this.input = [];
    this.output = [];
  }
}
