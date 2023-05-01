import React, { useEffect } from 'react';
import { select, scaleBand, axisLeft, axisBottom, scaleLinear } from 'd3';

const Heatmap = ({ chartId, width, height, data, xDomain, yDomain }) => {

    useEffect(() => {
        if (!select(`#${chartId}`).select('g').size()) {
            renderHeatmap();
        }
    }, []);


    const renderHeatmap = () => {
        const margin = { top: 30, right: 30, bottom: 30, left: 30 };

        const svg = select(`#${chartId}`)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = scaleBand()
            .range([0, (width - margin.left - margin.right)])
            .domain(xDomain)
            .padding(0.01);
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(axisBottom(xScale));

        const yScale = scaleBand()
            .range([height - margin.top - margin.bottom, 0])
            .domain(yDomain)
            .padding(0.01);
        svg.append("g")
            .call(axisLeft(yScale));

        const noOfCommits = data.map(d => d.num_commits);
        const myColor = scaleLinear()
            .range(["white", "#69b3a2"])
            .domain([Math.min(...noOfCommits), Math.max(...noOfCommits)]);

        svg.selectAll()
            .data(data, (d) => d.num_commits)
            .join("rect")
            .attr("x", (d) => xScale(d.hour_of_day).toString())
            .attr("y", (d) => yScale((d.day_of_week).toString()))
            .attr("width", xScale.bandwidth())
            .attr("height", yScale.bandwidth())
            .style("fill", (d) => myColor(d.num_commits));
    }


    return (
        <svg id={chartId}></svg>
    )
}

export default Heatmap