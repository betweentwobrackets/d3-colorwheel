(function() {

    d3.colorWheel = function(config) {
        var width = 500;
        var height = 500;

        var margin = {top: 40, right: 0, bottom: 0, left: 0};

        function colorWheel(selection) {
            var radius = Math.min(width - (margin.left + margin.right), height - (margin.top + margin.bottom)) / 2;

            selection.each(function(data) {
                var arc = d3.svg.arc()
                    .outerRadius(radius - 0)
                    .innerRadius(radius - (radius/2));

                // Degrees per segment
                var arcSegmentSize = 360/data.colors.length;
                // Horizontally centre first segment
                var arcStartRads = - (6.28/data.colors.length)/2;
                var arcEndRads = 6.28 + arcStartRads;

                var pie = d3.layout.pie()
                    .sort(null)
                    .startAngle(arcStartRads)
                    .endAngle(arcEndRads)
                    .padAngle(0.1)
                    .value(function() { return arcSegmentSize; });

                var svg = d3.select(this)
                    .attr("class", "d3-colorwheel")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("viewBox", "0 0 " + width + " " + height);

                var title = svg.append("text")
                    .attr("class", "title")
                    .text(data.title)
                    .style("text-anchor", "middle")
                    .attr("transform", "translate(" + width / 2 + ", 30)");

                var container = svg
                  .append("g")
                    .attr("transform", "translate("+
                        ((width / 2) + ((margin.left / 2) - (margin.right / 2))) + "," +
                        ((height / 2) + ((margin.top / 2) - (margin.bottom / 2))) + ")");

                var g = container.selectAll(".arc")
                    .data(pie(data.colors))
                  .enter().append("g")
                    .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .style("fill", function(d) { return d.data.color; });

                g.append("text")
                    .attr("class", "label")
                    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                    .attr("dy", ".35em")
                    .style("text-anchor", "middle")
                    .text(function(d) { return d.data.label; });
            });
        }

        colorWheel.width = function(value) {
            if (typeof value === 'undefined') {
                return width;
            }
            width = value;
            return colorWheel;
        };

        colorWheel.height = function(value) {
            if (typeof value === 'undefined') {
                return height;
            }
            height = value;
            return colorWheel;
        };

        return colorWheel;
    };

})();
