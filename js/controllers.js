'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('ConwayCtrl', ['$scope', '$timeout', function($scope, $timeout) {
		var promise;
		
  		$scope.gridTempSize = 6;
  		$scope.gridSize = 6;
  		$scope.timeInterval = 1000;
  		$scope.generation = 0;
  		$scope.spentTime = 0;
  		$scope.successor = [];
  		$scope.currentSuccessor = [];
		
		$scope.getNumber = function(num) {
			var arr = new Array(num);
			for(var i = 0; i< num; i++) {
				arr[i] = {value:0, state:0};
			}
    		return arr;   
		};
		
		$scope.updateGridSize = function() {
			$scope.gridSize = parseInt($scope.gridTempSize);
		};
		
		$scope.resetGame = function() {
			console.log('Logged Reset ' + Math.random());
	  		$scope.generation = 0;
  			$scope.spentTime = 0;
  			$timeout.cancel(promise);
		};
		
		$scope.startGame = function() {
			$scope.init();
		};
		
		$scope.stopGame = function() {
  			$timeout.cancel(promise);
		};
		
		$scope.msToTime = function(mstime) {
			var milliseconds = parseInt((mstime%1000)/100),
				seconds = parseInt((mstime/1000)%60),
				minutes = parseInt((mstime/(1000*60))%60),
				hours = parseInt((mstime/(1000*60*60))%24);

    			hours = (hours < 10) ? "0" + hours : hours;
    			minutes = (minutes < 10) ? "0" + minutes : minutes;
    			seconds = (seconds < 10) ? "0" + seconds : seconds;

    		return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
		};
		
		$scope.makeLiveDead = function(row, column, state) {
			var sum = 0,
				successor = $scope.successor;
			
			try{
			
				sum = sum + successor[row][column].state;
				
				if(column > 0) {
					sum = sum + successor[row][column-1].state;
				}
				if(column < $scope.gridSize-1) {
					sum = sum + successor[row][column+1].state;
				}
				
				if(row > 0) {
					if(column > 0) {
						sum = sum + successor[row-1][column-1].state;
					}

					sum = sum + successor[row-1][column].state;
					
					if(column < $scope.gridSize-1) {
						sum = sum + successor[row-1][column+1].state;
					}
				}
	
				if(row < $scope.gridSize-1) {
					if(column > 0)		
						sum = sum + successor[row+1][column-1].state;

					sum = sum + successor[row+1][column].state;
					
					if(row < $scope.gridSize-1)
						sum = sum + successor[row+1][column+1].state;
				}

			} catch(e) {
				console.log('Logged --- ' + row + ' ' + column);
			}
			console.log('Sum ' + sum);
			if(sum === 3) {
				return 1;
			} else if(sum === 4) {
				return state;
			} else {
				return 0;
			}
		};
		
		$scope.updateGrid = function() {
			$scope.generation++;
			$scope.spentTime = $scope.spentTime + $scope.timeInterval;
			

				for(var i=0;i < $scope.gridSize; i++) {
					for(var j=0;j < $scope.gridSize; j++) {
						$scope.currentSuccessor[i][j].state = $scope.makeLiveDead(i, j, $scope.successor[i][j].state); // Alive
					}
				}
				console.log($scope.currentSuccessor);
				$scope.successor = [];
	  			for(var i = 0;i < $scope.gridSize; i++) {
	  				$scope.successor.push($scope.currentSuccessor[i]);
	  				$scope.currentSuccessor[i] = $scope.getNumber($scope.gridSize);
				}

			promise = $timeout($scope.updateGrid, $scope.timeInterval);
		};
  		
  		$scope.init = function() {
	  		$scope.successor = [];
	  		$scope.currentSuccessor = [];
  			for(var i = 0;i < $scope.gridSize; i++) {
  				$scope.successor.push($scope.getNumber($scope.gridSize));
				$scope.currentSuccessor.push($scope.getNumber($scope.gridSize));
  			}
  			$scope.containerWidth = $scope.gridSize + $scope.gridSize * 3;
  			$scope.containerWidth = $scope.containerWidth + "px";			
  			
// Oscilator Blinker start
//   			$scope.successor[1][2].state = 1;
//   			$scope.successor[2][2].state = 1;
//   			$scope.successor[3][2].state = 1;
// Oscilator Blinker end
  				
//Oscillators Toad config
			$scope.successor[2][2].state = 1;
			$scope.successor[2][3].state = 1;
			$scope.successor[2][4].state = 1;

			$scope.successor[3][1].state = 1;
			$scope.successor[3][2].state = 1;
			$scope.successor[3][3].state = 1;
//Oscillators Toad config end
						
  			$timeout($scope.updateGrid, $scope.timeInterval);
  		};
  		
  		
  }]);