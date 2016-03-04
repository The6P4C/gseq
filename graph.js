var Graph = {
	init: function(graphContainerSelector) {
		var margins = { top: 20, right: 20, bottom: 40, left: 60 };
		var outerWidth = 900;
		var width = outerWidth - margins.left - margins.right;
		var outerHeight = 675;
		var height = outerHeight - margins.top - margins.bottom;

		var xValue = function(d) { return d.x; };
		var xScale = d3.scale.linear().range([0, width]);
		var xMap = function (d) { return xScale(xValue(d)); };
		var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

		var yValue = function(d) { return d.y; };
		var yScale = d3.scale.linear().range([height, 0]);
		var yMap = function (d) { return yScale(yValue(d)); };
		var yAxis = d3.svg.axis().scale(yScale).orient("left");

		var svg = d3.select(graphContainerSelector).append("svg")
				.attr("class", "graph")
				.attr("width", outerWidth)
				.attr("height", outerHeight)
			.append("g")
				.attr("transform", "translate(" + margins.left + ", " + margins.top + ")");

		var xAxisEl = svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0, " + height + ")");

		svg.append("text")
				.attr("class", "label")
				.attr("x", width / 2)
				.attr("y", height - 10)
				.text("n");

		var yAxisEl = svg.append("g")
				.attr("class", "y axis")

		svg.append("text")
				.attr("class", "label")
				.attr("transform", "rotate(-90)")
				.attr("x", -height / 2)
				.attr("y", 6)
				.attr("dy", ".7em")
				.text("f(n)");

		Graph.update = function(data) {
			// Subtract one from minimum and add one to maximum so that the points
			// don't intersect with either axis
			xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
			yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

			var lineFunction = d3.svg.line()
					.x(xMap)
					.y(yMap)
					.interpolate("linear");

			xAxisEl.transition().duration(200)
					.call(xAxis);
			yAxisEl.transition().duration(200)
					.call(yAxis);

			svg.select("path.line").remove();
			svg.append("path")
					.attr("class", "line")
					.attr("d", lineFunction(data));

			svg.selectAll(".point").remove();
			svg.selectAll(".point")
					.data(data)
				.enter().append("circle")
					.attr("class", "point")
					.attr("r", 3.5)
					.attr("cx", xMap)
					.attr("cy", yMap);
		}
	}
};
