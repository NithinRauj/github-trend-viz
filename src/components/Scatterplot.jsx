import React, { useEffect } from 'react';
import { select, scaleLinear, axisLeft, axisBottom } from 'd3';

const Scatterplot = ({ chartId, data, width, height }) => {

    useEffect(() => {
        if (!select(`#${chartId}`).select('g').size()) {
            renderPlot();
        }
    }, []);

    const renderPlot = () => {
        const margin = { top: 10, right: 30, bottom: 30, left: 60 };

        const svg = select(`#${chartId}`)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);

        const xData = data.map(d => d.num_repositories);
        const x = scaleLinear()
            .domain([Math.min(...xData), Math.max(...xData)])
            .range([0, width - margin.left - margin.right]);
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(axisBottom(x));

        const yData = data.map(d => d.num_commits);
        const y = scaleLinear()
            .domain([30000, Math.max(...yData)])
            .range([height - margin.top - margin.bottom, 0]);
        svg.append("g")
            .call(axisLeft(y));

        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.num_repositories); })
            .attr("cy", function (d) { return y(d.num_commits); })
            .attr("r", 7)
            .style("fill", "#60be18")
            .style("opacity", 0.3)
            .style("stroke", "white");


    }

    return (
        <svg id={chartId}></svg>
    )
}

export default Scatterplot