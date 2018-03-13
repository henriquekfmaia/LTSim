import { ProcessDetailComponent } from "../process-detail/process-detail.component";

export class Process {
  id: number;
  name: string;
  processTypeId: number;
  imagePath: string;
  imageByteString: ByteString;
  imageArrayBuffer: ArrayBuffer;
  imageBlob: Blob;
  input: Process[];
  inputLimit: number;
  output: Process[];
  outputLimit: number;

  constructor(process: Process) {
    this.id = process.id;
    this.name = process.name;
    this.processTypeId = process.processTypeId;
    this.imagePath = process.imagePath;
    this.imageByteString = process.imageByteString;
    this.imageArrayBuffer = this.GetArrayBufferFromString(btoa(process.imageByteString));
    var a = new Uint32Array(this.imageArrayBuffer);
    console.log(a);
    this.imageBlob = new Blob([a]);
    console.log(this.imageBlob);
    this.input = [];
    this.inputLimit = 2;
    this.output = [];
    this.outputLimit = 2;
  }
  // constructor(id: number, name: string, processTypeId: number, imagePath: string) {
  //   this.id = id;
  //   this.name = name;
  //   this.processTypeId = processTypeId;
  //   this.imagePath = imagePath;
  //   this.input = [];
  //   this.inputLimit = 2;
  //   this.output = [];
  //   this.outputLimit = 2;
  // }

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

  GetArrayBufferFromString(str: string): ArrayBuffer {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
}
