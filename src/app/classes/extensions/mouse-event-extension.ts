import * as createjs from 'createjs-module';

export interface MouseEventExtension extends createjs.MouseEvent {
    readonly stageX: number;
    readonly stageY: number;
}