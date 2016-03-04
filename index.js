var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

angular.module("gseq", [])
	.controller("InputController", function() {
		var inputController = this;

		inputController.init = function() {
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

		inputController.functions = ["2", "3", "4"];
		inputController.mainFunction = "f(n-1) / f(n-2) + f(n-3)";

		inputController.getFunctions = function() {
			var ret = {};

			for (var i = 0; i < inputController.functions.length; ++i) {
				ret[i] = inputController.functions[i];
			}

			ret['n'] = inputController.mainFunction;

			return ret;
		};

		inputController.addFunction = function() {
			inputController.functions.push("");
		};

		inputController.removeFunction = function(index) {
			inputController.functions.splice(index, 1);
		};

		inputController.constants = ["10", "5", "2"];

		inputController.getConstants = function() {
			var ret = {};

			for (var i = 0; i < inputController.constants.length; ++i) {
				ret[ALPHABET[i]] = inputController.constants[i];
			}

			return ret;
		};

		inputController.addConstant = function() {
			if (inputController.constants.length != ALPHABET.length) {
				inputController.constants.push("");
			} else {
				alert("Cannot add new constant: constant limit reached");
			}
		};

		inputController.removeConstant = function(name) {
			inputController.constants.splice(ALPHABET.indexOf(name), 1);
		};

		inputController.run = function() {
			alert("Run Button Clicked");
		};
	});
