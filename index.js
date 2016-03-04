$(document).ready(function() {
	Graph.init("#graphContainer");
	Graph.update([
		{x: 1, y: 0},
		{x: 2, y: 20},
		{x: 3, y: 10},
		{x: 4, y: 3},
		{x: 5, y: -7},
		{x: 6, y: 2},
		{x: 7, y: -14},
		{x: 8, y: 25},
		{x: 9, y: 23},
		{x: 10, y: -1}
	]);

	setTimeout(function() {
		Graph.update([
			{x: 1, y: 51},
			{x: 2, y: 0.1},
			{x: 3, y: -11},
			{x: 4, y: 35},
			{x: 5, y: 0.43532},
			{x: 6, y: 12},
			{x: 7, y: 0.2554132},
			{x: 8, y: 10.4321},
			{x: 9, y: 32},
			{x: 10, y: -1.19},
			{x: 11, y: 0.2554132},
			{x: 12, y: 10.4321},
			{x: 13, y: 22},
			{x: 14, y: -1.19}
		]);
	}, 1000);

	setTimeout(function() {
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
	}, 2000);
});
