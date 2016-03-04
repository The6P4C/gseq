var VALID_NUMBERS = /^[\d.-]+$/;

function validatePoints(points) {
	for (var i = 0; i < points.length; ++i) {
		if (!VALID_NUMBERS.test(points[i].y)) {
			return false;
		}
	}
	return true;
}

function runSequence(functions, constants) {
	var parser = math.parser();

	for (var name in constants) {
		parser.set(name, parser.eval(""+constants[name]));
	}

	for (var n in functions) {
		if (n != "n") {
			functions[n] = parser.eval(functions[n]);
		} else {
			functions[n] = parser.eval("f(n)=" + functions[n]);
		}
	}

	var cache = {};
	parser.set("f", function(v) {
		if (v < 1) {
			throw "Value of n was less than or equal to 1";
		}

		if (cache.hasOwnProperty(v)) {
			return cache[v];
		}

		var ret;
		if (functions.hasOwnProperty(v)) {
			ret = functions[v];
		} else {
			ret = functions["n"](v);
		}

		cache[v] = ret;

		return ret;
	});

	var f = parser.get("f");
	var points = [];
	for (var i = 1; i < 51; ++i) {
		points.push({x: i, y: f(i)});
	}

	if (!validatePoints(points)) {
		throw "One or more points of the sequence were invalid.";
	}

	return points;
}

angular.module("gseq", [])
	.controller("InputController", ["$scope", function($scope) {
		this.init = function() {
			Graph.init("#graph-container");
			this.run();
		};

		$scope.functions = ["A"];
		$scope.mainFunction = "f(n-1) + A";

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
			$scope.constants.splice(index, 1);
		};

		$scope.points = [];

		this.run = function() {
			var functions = {};
			for (var i = 0; i < $scope.functions.length; ++i) {
				functions[i + 1] = $scope.functions[i];
			}
			functions["n"] = $scope.mainFunction;

			var constants = {};
			for (var i = 0; i < $scope.constants.length; ++i) {
				constants[$scope.ALPHABET[i]] = $scope.constants[i];
			}

			var points;
			try {
				points = runSequence(functions, constants);
			} catch (e) {
				alert("Error: " + e);
				points = [];
			}
			Graph.update(points);
			$scope.points = points;
		};
	}]);
