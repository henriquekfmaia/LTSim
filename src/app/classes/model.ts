import { String, StringBuilder } from 'typescript-string-operations';
import { Parameter } from "./parameter";
import { ProcessService } from "../services/process.service";
import { timer } from "rxjs/observable/timer";

export class Model {
    id: number;
    name: string;
    parameters: Array<Parameter>;
    results: Array<Parameter>;

    // private _script: string;
    public _scriptHead: string;
    private _scriptTail: string;
    scriptBody: string;
    get script(): string {
      return this.scriptHead + this.scriptBody + this.scriptTail;
    };
    set script(newStr: string) {
      newStr = newStr.replace(this.scriptHead, String.Empty);
      newStr = newStr.replace(this.scriptTail, String.Empty);
      this.scriptBody = newStr;
    }
    get scriptHead(): string {
      var headText = '';
      var sb = new StringBuilder();
      sb.Append('function simulation_result = f(parameter_input)' + '\n');
      for(var i = 1; i <= this.parameters.length; i++) {
        // sb.Append(String.Format("{0} = parameter_input{{1}};\n", this.parameters[i].key, i));
        sb.AppendFormat("{0} = parameter_input{{1}};\n", this.parameters[i].key, i.toString());
      }
      return sb.ToString();
    };
    get scriptTail(): string {
      var sb = new StringBuilder();
      sb.Append('\n');
      sb.Append('simulation_result = {');
      var resultKeys = this.results.map(function(r) {
        return String.Format('{{0}}', r.key);
      });
      sb.Append(String.Join(', ', resultKeys));
      sb.Append('};');
      return sb.ToString();
    };

    

    constructor() {
      this.parameters = new Array<Parameter>();
      this.results = new Array<Parameter>();
      this.scriptBody = '';
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