import * as createjs from 'createjs-module';
import { ContainerExtension } from '../../extensions/container-extension';

export class Point extends ContainerExtension {
    shape: createjs.Shape;

    constructor() {
        super();
        this.shape = new createjs.Shape();
    }
}