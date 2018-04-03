import { SignalDispatcher, SimpleEventDispatcher, EventDispatcher } from "strongly-typed-events";

import { StageHandler } from './stage-handler';
import { Process } from './process';
import { ProcessContainer } from "./containers/process-container";

export class Scope {
  private _onShowDetail = new SimpleEventDispatcher<ProcessContainer>();
  name: string;
  stageHandler: StageHandler;

  constructor() {
  }

  setStageHandler(stageHandler: StageHandler): void {
    this.stageHandler = stageHandler;
    this.stageHandler.onShowDetail.subscribe(s => this._onShowDetail.dispatch(s));
  }

  public get onShowDetail() {
    return this._onShowDetail.asEvent();
  }
}
