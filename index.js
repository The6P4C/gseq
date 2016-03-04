angular.module("gseq", [])
	.controller("InputController", ["$scope", function($scope) {
		this.init = function() {
			Graph.init("#graph-container");
			Graph.update([
				{x: 1, y: 1},
				{x: 2, y: 10},
				{x: 3, y: 2},
				{x: 4, y: 9},
				{x: 5, y: 3},
				{x: 6, y: 8},
				{x: 7, y: 4},
				{x: 8, y: 7},
				{x: 9, y: 5},
				{x: 10, y: 6}
			]);
		};

		$scope.functions = ["bab"];
		$scope.mainFunction = "";

		this.addFunction = function() {
			$scope.functions.push("");
		};

		this.removeFunction = function(index) {
			$scope.functions.splice(index, 1);
		}

		$scope.ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		$scope.constants = [10];

		this.addConstant = function() {
			if ($scope.constants.length == $scope.ALPHABET.length) {
				alert("Cannot add constant: constant limit reached");
			} else {
				$scope.constants.push(0);
			}			
		};

		this.removeConstant = function(index) {
			console.log($scope.constants);
			$scope.constants.splice(index, 1);
			console.log($scope.constants);
		};
	}]);
