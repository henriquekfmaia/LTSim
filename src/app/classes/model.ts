import { Parameter } from "./parameter";
import { ProcessService } from "../services/process.service";
import { timer } from "rxjs/observable/timer";

export class Model {
    id: number;
    name: string;
    parameters: Array<Parameter>;
    script: string;

    constructor() {
      this.parameters = new Array<Parameter>();
      this.script = '';
    }

    getParameters(processService: ProcessService): void {
        this.parameters = null;
        processService.getParametersFromModel(this.id)
        .subscribe(parameters => {
          return parameters;
        });
      }
    
      setParameters(doSearch: Boolean, processService: ProcessService): Parameter[] {
        if(this.parameters && this.parameters == null) {
          if(doSearch) { this.getParameters(processService); }
          timer(50).subscribe(() => {
            return this.setParameters(false, processService); 
          });
        }
        else {
          return this.parameters;
        }
      }
}