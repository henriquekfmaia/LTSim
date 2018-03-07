import { ProcessDetailComponent } from "../process-detail/process-detail.component";

export class Process {
  id: number;
  name: string;
  processTypeId: number;
  image: string;
  input: Process[];
  inputLimit: number;
  output: Process[];
  outputLimit: number;

  constructor(id: number, name: string, processTypeId: number, image: string) {
    this.id = id;
    this.name = name;
    this.processTypeId = processTypeId;
    this.image = image;
    this.input = [];
    this.inputLimit = 2;
    this.output = [];
    this.outputLimit = 2;
  }

  addInput(process: Process): void {
    if(this.inputLimit > this.input.length)
    {
      this.input.push(process);
    }
  }

  addOutput(process: Process): void {
    if(this.outputLimit > this.output.length)
    {
      this.output.push(process);
    }
  }
}
