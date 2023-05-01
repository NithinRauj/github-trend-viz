import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BubbleChart = ({ chartId, data }) => {

    useEffect(() => {
        if (!d3.select(`#${chartId}`).select('g').size()) {
            renderChart();
        }
    }, []);

    const renderChart = () => {
        const width = 800;
        const height = 800;
        const groups = ['Below 1000', 'Below 50000', 'Above 50000'];

        let filteredData = data.filter(d => d.count > 500);
        filteredData = filteredData.map((d) => {
            if (d.count < 1000) {
                return { ...d, group: 'Below 1000' }
            } else if (d.count > 1000 && d.count < 50000) {
                return { ...d, group: 'Below 50000' }
            } else {
                return { ...d, group: 'Above 50000' }
            }
        });
        console.log(filteredData);

        const svg = d3.select(`#${chartId}`).append('svg')
            .attr("width", width)
            .attr("height", height);

        const langFrequency = filteredData.map(d => d.count);
        const color = d3.scaleOrdinal()
            .domain(groups)
            .range(d3.schemeSet1);

        const size = d3.scaleLinear()
            .domain([Math.min(...langFrequency), Math.max(...langFrequency)])
            .range([7, 55])

        const x = d3.scaleOrdinal()
            .domain(groups)
            .range([50, 200, 340])

        const tooltip = d3.select(`#${chartId}`)
            .select("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px");

        const mouseover = function (event, d) {
            tooltip
                .style("opacity", 1)
        }
        const mousemove = function (event, d) {
            tooltip
                .html(d.language + ': ' + d.count + " files")
                .style("left", (event.x / 2 + 20) + "px")
                .style("top", (event.y / 2 - 30) + "px")
        }
        const mouseleave = function (event, d) {
            tooltip
                .style("opacity", 0)
        }

        const node = svg.append("g")
            .selectAll("circle")
            .data(filteredData)
            .join("circle")
            .attr("class", "node")
            .attr("r", d => size(d.count))
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .style("fill", (d) => color(d.group))
            .style("fill-opacity", 0.8)
            .attr("stroke", "black")
            .style("stroke-width", 1)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        const simulation = d3.forceSimulation()
            .force("x", d3.forceX().strength(0.5).x(d => x(d.group)))
            .force("y", d3.forceY().strength(0.1).y(height / 2))
            .force("center", d3.forceCenter().x(width / 2).y(height / 2))
            .force("charge", d3.forceManyBody().strength(1))
            .force("collide", d3.forceCollide().strength(.1).radius(30).iterations(1))


        simulation
            .nodes(filteredData)
            .on("tick", function (d) {
                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
            });

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(.03).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(.03);
            d.fx = null;
            d.fy = null;
        }


    }

    return (
        <div id={chartId}>
            <div></div>
        </div>
    )
}

export default BubbleChart