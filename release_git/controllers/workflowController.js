var app = angular.module('app');

app.controller('workflowController', function($scope) {
    var canvas, stage;
	var mouseTarget;	// the display object currently under the mouse, or being dragged
	var dragStarted;	// indicates whether we are currently in a drag operation
	var offset;
	var update = true;

	$scope.NewElement = function () {
		var proc = new Process($scope);
		$scope.stage.update();
	}

	$scope.DeleteElement = function () {
		var toDelete = $scope.selected;
		if (toDelete) {
			toDelete.Delete();
			$scope.stage.update();
		}
	}

	function init() {
		// create stage and point it to the canvas:
        canvas = document.getElementById("testCanvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.8;
		$scope.stage = new createjs.Stage(canvas);
		// enable touch interactions if supported on the current device:
		createjs.Touch.enable($scope.stage);
		// enabled mouse over / out events
		$scope.stage.enableMouseOver(10);
		$scope.stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
		// load the source image:
		var image = new Image();
		image.src = "/images/laranja.png";
		image.onload = handleImageLoad;
	}
	function stop() {
		createjs.Ticker.removeEventListener("tick", tick);
	}
	function handleImageLoad(event) {
		var image = event.target;
		// create and populate the screen with random daisies:
		/* for (var i = 0; i < 10; i++) {
            var proc = new Process(stage);
		} */
		$scope.stage.update();
	}
    init();
});