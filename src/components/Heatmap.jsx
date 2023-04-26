import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Heatmap = ({ chartId, width, height, data, xDomain, yDomain }) => {

    useEffect(() => {
        renderHeatmap();
    }, []);


    const renderHeatmap = () => {
        const margin = { top: 30, right: 30, bottom: 30, left: 30 };

        const svg = d3.select(`#${chartId}`)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);


        const xScale = d3.scaleBand()
            .range([0, (width - margin.left - margin.right)])
            .domain(xDomain)
            .padding(0.01);
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(xScale))

        const yScale = d3.scaleBand()
            .range([height - margin.top - margin.bottom, 0])
            .domain(yDomain)
            .padding(0.01);
        svg.append("g")
            .call(d3.axisLeft(yScale));

        const noOfCommits = data.map(d => d.num_commits);
        const myColor = d3.scaleLinear()
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