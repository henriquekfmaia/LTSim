import { ProcessDetailComponent } from "../process-detail/process-detail.component";
import { StageExtension } from "./extensions/stage-extension";
import { Relationship } from "./relationship";
import { Model } from "./model";
import { ProcessService } from "../services/process.service";
import { ObservableInput, Observable } from "rxjs/Observable";
import { timer } from "rxjs/observable/timer";
import { Distribution } from "./distribution";
import { Flow } from "./flow";

export class Process {
  id: number;
  name: string;
  processTypeId: number;
  imagePath: string;
  // imageHex: string;
  // imageBlob: Blob;
  input: Relationship[];
  inputLimit: number;
  inputFlow: Flow;
  output: Relationship[];
  outputLimit: number;
  stageId: number;
  model: Model;
  models: Model[];

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
    this.models = process.models.map(function(m) {
      var newModel = new Model();
      newModel.mapFromBaseObject(m);
      return newModel;
    });
    if(this.models.length > 0) {
      this.model = this.models[0];
    }
    else {
      this.models = new Array<Model>();
      this.models.push(new Model());
    }
    this.inputFlow = new Flow();
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

  modelStartup(): void {
    if(this.model) {
      this.model.parameters.forEach(function(p) {
        if(p.type == 4 && !(p.value instanceof Distribution)) {
          p.value = new Distribution(true, 10, 10, 100, false);
        }
      });
      this.model.results.forEach(function(r) {
        if(r.type == 4 && !(r.value instanceof Distribution)) {
          r.value = new Distribution(true, 10, 10, 100, false);
        }
      });
    }
    else {
      this.model = new Model();
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