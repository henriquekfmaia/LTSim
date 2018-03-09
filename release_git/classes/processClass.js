var image = new Image();
image.src = "images/azul.png";

function Process (scope) {
    this.scope = scope;
    this.stage = scope.stage;
    this.processImage = new ProcessImage(this);
    this.Delete = function (){
        console.log(this.stage);
        this.stage.removeChild(this.processImage.container);
        console.log(this.stage);
        delete this.processImage;
    }
    
}

function ProcessImage (process) {
    process.processImage = this;
    this.stage = process.stage;
    this.container = new createjs.Container();
    this.container.movable = true;
    this.bitmap = new createjs.Bitmap(image);
    this.container.x = process.stage.canvas.width/2;
    this.container.y = process.stage.canvas.height/2;
    //this.container.x = process.stage.canvas.width * Math.random() | 0;
    //this.container.y = process.stage.canvas.height * Math.random() | 0;

    this.container.addChild(this.bitmap);

    this.borders = new AllBorders(process);

    process.stage.addChild(this.container);

    this.container.on("mousedown", function (evt) {
        process.scope.selected = process;
        if(this.movable){
            this.parent.addChild(this);
            this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
        }
    });
    this.container.on("mouseup", function (evt) {
        this.offset = undefined;
    });
    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    this.container.on("pressmove", function (evt) {
        if(this.offset){
            this.x = evt.stageX + this.offset.x;
            this.y = evt.stageY + this.offset.y;
            process.stage.update();
        }
    });

};

ProcessImage.prototype.update = function() {
    this.stage.update();
};

function AllBorders (process) {
    this.borderNorth = new Border(process, 0, 0, 0);
    this.borderEast = new Border(process, process.processImage.bitmap.getBounds().width, 0, 90);
    this.borderSouth = new Border(process, process.processImage.bitmap.getBounds().width, process.processImage.bitmap.getBounds().height, 180);
    this.borderWest = new Border(process, 0, process.processImage.bitmap.getBounds().height, 270);
}

function Border (process, translateX, translateY, rotation) {
    this.cursorOver = false;
    this.shape = new createjs.Shape();
    process.processImage.container.addChild(this.shape);
    this.shape.border = this;
    
    this.shape.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, process.processImage.bitmap.getBounds().width, 15);
    this.shape.x = process.processImage.bitmap.x + translateX;
    this.shape.y = process.processImage.bitmap.y + translateY;
    this.shape.rotation = rotation;

    this.radian = rotation*Math.PI/180;

    this.shape.normal = {};
    
    this.shape.normal.x =  Math.round(Math.sin(this.radian));
    this.shape.normal.y =  Math.round(Math.cos(this.radian));

    this.shape.normalString = '(' + this.shape.normal.x.toString() + ', ' + this.shape.normal.y.toString() + ')';

    this.newRelationshipSquare = new NewRelationshipSquare(this, process);

    this.shape.on("rollover", function (evt) {
        this.border.newRelationshipSquare.shape.visible = true;
        this.cursorOver = true;
        process.processImage.container.setChildIndex(this.border.newRelationshipSquare.shape, process.processImage.container.getNumChildren()-1);
        process.processImage.update();
    });
    this.shape.on("rollout", function (evt) {
        this.border.newRelationshipSquare.shape.visible = false;
        this.cursorOver = false;
        process.processImage.update();
    });
}

function NewRelationshipSquare (border, process) {
    this.shape = new createjs.Shape();
    this.shape.border = border;
    this.shape.visible = false;

    this.shape.side = 5;
    
    if(border.shape.normal.x == 1){ this.shape.offset = -1}
    else if(border.shape.normal.y == -1){ this.shape.offset = 1}
    else { this.shape.offset = 0 }
    
    this.shape.graphics.beginStroke("#000");
    this.shape.graphics.setStrokeStyle(1);
    this.shape.snapToPixel = true;

    this.shape.positionX = Math.round(Math.cos(border.radian)) * ((border.shape.graphics.command.w/2) - Math.round(Math.cos(border.radian))*this.shape.side/2) 
                            - Math.round(Math.sin(border.radian)) * border.shape.normal.x * this.shape.side/2;
    this.shape.positionY = Math.round(Math.sin(border.radian)) * ((border.shape.graphics.command.w/2) - Math.round(Math.sin(border.radian))*this.shape.side/2) 
                            - Math.round(Math.cos(border.radian)) * border.shape.normal.y * this.shape.side/2;

    /*
    this.shape.positionX = Math.round(Math.cos(border.radian)) * ((border.shape.graphics.command.w/2) - Math.round(Math.cos(border.radian))*this.shape.side/2) 
                            + Math.round(Math.sin(border.radian)) * this.shape.offset * this.shape.side;
    this.shape.positionY = Math.round(Math.sin(border.radian)) * ((border.shape.graphics.command.w/2) - Math.round(Math.sin(border.radian))*this.shape.side/2) 
                            + Math.round(Math.cos(border.radian)) * this.shape.offset * this.shape.side;
    */
    
    this.shape.graphics.beginFill("#FFF").drawRect(this.shape.positionX, this.shape.positionY, this.shape.side, this.shape.side);

    


    this.shape.x = border.shape.x;
    this.shape.y = border.shape.y;

    this.shape.normal = border.shape.normal;

    process.processImage.container.addChild(this.shape);

    this.shape.on("mousedown", function (evt) {
        //console.log(process);
        process.processImage.container.offset = undefined;
        console.log(process.processImage.container.offset);
    });
    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    this.shape.on("pressmove", function (evt) {
        process.stage.update();
    });

    this.shape.on("rollover", function (evt) {
        this.visible = true;
        process.processImage.container.setChildIndex(this.border.newRelationshipSquare.shape, process.processImage.container.getNumChildren()-1);
        process.processImage.update();
    });

    this.shape.on("rollout", function (evt) {
        if(!this.border.cursorOver) {
            this.visible = false;
        }
        process.processImage.container.setChildIndex(this.border.newRelationshipSquare.shape, process.processImage.container.getNumChildren()-1);
        process.processImage.update();
    });

    this.shape.on("rollover", function (evt) {
        process.processImage.container.movable = false;
    });
    this.shape.on("rollout", function (evt) {
        process.processImage.container.movable = true;
    });

}