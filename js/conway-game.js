(function() {
	function ConwayGame() {
		this.gridSize = 20;
		this.element = "";
	};
	
	ConwayGame.prototype.generateUI = function() {
		var strDom = "",
			cell = "<div class='cell'></div>",
			containerWidth = this.gridSize + this.gridSize * 3;

		for(var i=0; i < this.gridSize; i++) {
			strDom = strDom + "<div class='container' style='width:"+ containerWidth +"px;'>";
			for(var j=0; j < this.gridSize; j++) {
				strDom = strDom + cell;
			}
			strDom = strDom + "</div>";
		}
		
		this.element.html(strDom);
	};
	
	ConwayGame.prototype.init = function(ele, obj) {
		obj = obj ? obj : {};
		
		this.element = $(ele);
		this.gridSize = obj.gridSize ? parseInt(obj.gridSize) : this.gridSize;
		
		this.start();
	};

	ConwayGame.prototype.start = function(ele) {
		
		this.element = ele ? $(ele) : this.element;
		this.generateUI();
	};
	
	window.conwayGame = new ConwayGame();
	
}());