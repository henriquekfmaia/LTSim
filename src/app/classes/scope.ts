import { StageHandler } from './stage-handler';
import { Process } from './process';

export class Scope {
  name: string;
  stageHandler: StageHandler;
  //currentProcess: Process;
  showDetail: boolean;
  constructor() {} 
}
