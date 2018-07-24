import { String, StringBuilder } from 'typescript-string-operations';
import { Parameter } from "./parameter";
import { ProcessService } from "../services/process.service";
import { timer } from "rxjs/observable/timer";

export class Model {
  id: number;
  name: string;
  parameters: Array<Parameter>;
  results: Array<Parameter>;
  outputLimit: number;

  public script: string;
  public scriptHead: string;
  public scriptBody: string;
  public scriptTail: string;
  public blank: string;
  get Script(): string {
    this.script = this.ScriptHead + this.scriptBody + this.ScriptTail + this.blank;
    return this.script;
  };
  set Script(newStr: string) {
    if(newStr.includes(this.ScriptHead) && newStr.includes(this.ScriptTail)) {
      newStr = newStr.replace(this.ScriptHead, String.Empty);
      newStr = newStr.replace(this.ScriptTail, String.Empty);
      this.scriptBody = newStr;
    }
    else {
      if(this.blank == '') { this.blank = ' '; }
      else { this.blank = '' }
    }
    this.script = this.Script;
  }
  get ScriptHead(): string {
    var sb = new StringBuilder();
    sb.Append('function simulation_result = f(input_information)' + '\n');
    sb.Append('input_flow = input_information{1};' + '\n');
    sb.Append('water_flow = input_flow{1};' + '\n');
    sb.Append('mass_flow = input_flow{2};' + '\n');
    sb.Append('size_distribution = input_flow{3};' + '\n');
    sb.Append('\n');
    sb.Append('parameter_input = input_information{2};' + '\n');
    for(var i = 1; i <= this.parameters.length; i++) {
      sb.AppendFormat("{0} = parameter_input{{1}};\n", this.parameters[i-1].key, i.toString());
    }
    this.scriptHead = sb.ToString();
    return this.scriptHead;
  };
  get ScriptTail(): string {
    var sb = new StringBuilder();
    sb.Append('\n');
    sb.Append('output_flow = {};\n');
    var outputLimit = Math.max(this.outputLimit, 1);
    for(var i = 1; i <= outputLimit; i++) {
      sb.AppendFormat("output_flow_{0} = {};\n", i.toString());
      sb.AppendFormat("output_flow_{0}{{1}} = out_water_flow_{0};\n", i.toString(), (1).toString());
      sb.AppendFormat("output_flow_{0}{{1}} = out_mass_flow_{0};\n", i.toString(), (2).toString());
      sb.AppendFormat("output_flow_{0}{{1}} = out_size_distribution_{0};\n", i.toString(), (3).toString());
      sb.AppendFormat("output_flow{{0}} = output_flow_{0};\n", i.toString());
    }
    sb.Append('output_parameters = {');
    var resultKeys = this.results.map(function(r) {
      return String.Format('{0}', r.key);
    });
    sb.Append(String.Join(', ', resultKeys));
    sb.Append('};\n');
    sb.Append('simulation_result = {output_flow, output_parameters};');
    this.scriptTail = sb.ToString();
    return this.scriptTail; 
  };

  constructor() {
    this.parameters = new Array<Parameter>();
    this.results = new Array<Parameter>();
    this.scriptBody = '';
    this.blank = '';
  }

  mapFromBaseObject(model: Model): void {
    this.id = model.id;
    this.name = model.name;
    this.parameters = model.parameters;
    this.results = model.results;
    this.scriptHead = model.scriptHead;
    this.scriptBody = model.scriptBody;
    this.scriptTail = model.scriptTail;
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
  public GetLines(str: string): string[] {
    var array = str.split('\n');
    return array;
  }
}