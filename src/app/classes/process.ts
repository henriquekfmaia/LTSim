import { ProcessDetailComponent } from "../process-detail/process-detail.component";
import { StageExtension } from "./extensions/stage-extension";
import { Relationship } from "./relationship";

export class Process {
  id: number;
  name: string;
  processTypeId: number;
  imagePath: string;
  // imageHex: string;
  // imageBlob: Blob;
  input: Relationship[];
  inputLimit: number;
  output: Relationship[];
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
    this.inputLimit = process.inputLimit;
    this.output = [];
    this.outputLimit = process.outputLimit;
  }

  addInput(relationship: Relationship): void {
    if(this.checkInputLimit()) {
      this.input.push(relationship);
    }
  }

  addOutput(relationship: Relationship): void {
    if(this.checkOutputLimit()) {
      this.output.push(relationship);
    }
  }

  checkInputLimit(): Boolean {
    if(this.inputLimit == -1) {
      return true;
    }
    else if(this.input.length < this.inputLimit) {
      return true;
    }
    else {
      return false;
    }
  }

  checkOutputLimit(): Boolean {
    if(this.outputLimit == -1) {
      return true;
    }
    else if(this.output.length < this.outputLimit) {
      return true;
    }
    else {
      return false;
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