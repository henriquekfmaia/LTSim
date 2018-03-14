import { ProcessDetailComponent } from "../process-detail/process-detail.component";
import { StageExtension } from "./extensions/stage-extension";

export class Process {
  id: number;
  name: string;
  processTypeId: number;
  imagePath: string;
  // imageHex: string;
  // imageBlob: Blob;
  input: Process[];
  inputLimit: number;
  output: Process[];
  outputLimit: number;
  stageId: number;

  constructor(process: Process) {
    this.id = process.id
    this.name = process.name;
    this.processTypeId = process.processTypeId;
    this.imagePath = process.imagePath;
    // this.imageHex = process.imageHex;
    // this.imageBlob = new Blob([this.hexStringToByte(this.imageHex)], new MyBlobPropertyBag('image/png'));
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

  hexStringToByte(str: string): Uint8Array {
    if (!str) {
      return new Uint8Array(0);
    }
    
    var a = [];
    for (var i = 0, len = str.length; i < len; i+=2) {
      a.push(parseInt(str.substr(i,2),16));
    }
    
    return new Uint8Array(a);
  }

  
}