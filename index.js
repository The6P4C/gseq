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

	console.log(functions);

	parser.set("f", function(v) {
		console.log(v);
		if (functions.hasOwnProperty(v)) {
			return functions[v];
		} else {
			return functions["n"](v);
		}
	});

	var f = parser.get("f");
	var points = [];
	for (var i = 1; i < 51; ++i) {
		points.push({x: i, y: f(i)});
	}

	Graph.update(points);
}

angular.module("gseq", [])
	.controller("InputController", ["$scope", function($scope) {
		this.init = function() {
			Graph.init("#graph-container");
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

			runSequence(functions, constants);
		};
	}]);
