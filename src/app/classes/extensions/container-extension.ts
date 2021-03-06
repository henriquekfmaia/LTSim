import * as createjs from 'createjs-module';
import { twoDVector } from '../graphs/two-d-vector';
export abstract class ContainerExtension extends createjs.Container {
    _offset: twoDVector;
    _abs: twoDVector;
    _isContainerExtension: boolean;

    constructor() { 
        super();
        this._isContainerExtension = true;
    }

    getOffset(): twoDVector {
        if(this.parent && this.parent != null) {
            var parent = this.parent as ContainerExtension;
            if(parent._isContainerExtension) {
                this._offset = parent.getAbs();
                return this._offset;
            }
            else {
                this._offset = new twoDVector([0, 0]);
                return this._offset;
            }
        }
        else {
            this._offset = new twoDVector([0, 0]);
            return this._offset;
        }
    }

    getAbs(): twoDVector {
        var offset = this.getOffset();
        var absX = offset.x + this.x;
        var absY = offset.y + this.y;
        return new twoDVector([absX, absY]);
    }

    abstract deleteSelf(): void;
}