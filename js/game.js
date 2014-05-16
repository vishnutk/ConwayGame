$(document).ready(function() {
	$("#btnenter").on('click', function() {
		var gridSize = $("#txtGridSize").val();
		conwayGame.init("#gameBoard", {gridSize: gridSize});
	});
	
	$("#start").on('click', function() {
		conwayGame.start();
	});

	$("#stop").click = function() {
	};

	$("#reset").click = function() {
	};
	
// 	var config = {
// 		gridSize: 80
// 	};
// 	
// 	conwayGame.init("#gameBoard", config);
});