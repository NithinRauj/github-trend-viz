import { arc, scaleOrdinal, schemeSet2, select } from 'd3';
import * as d3 from 'd3';
import React, { useEffect } from 'react';

const PieChart = ({ chartId, data, width, height }) => {
    const margin = 30;
    const reformattedData = {};

    const reformat = () => {
        data.forEach((d) => {
            reformattedData[d['license']] = d['number_of_files'];
        });
    }

    useEffect(() => {
        if (!Object.keys(reformattedData).length) {
            reformat();
            renderChart();
        }
    }, []);

    const renderChart = () => {
        const radius = Math.min(width, height) / 2 - margin;
        const svg = select(`#${chartId}`);
        svg.attr('width', width).attr('height', height);

        const color = scaleOrdinal().range(schemeSet2);
        const pie = d3.pie()
            .value((d) => d[1]);
        const dataReady = pie(Object.entries(reformattedData));

        const arcGenerator = arc()
            .innerRadius(0)
            .outerRadius(radius);

        svg.select('g')
            .selectAll('mySlices')
            .data(dataReady)
            .join('path')
            .attr('d', arcGenerator)
            .attr('fill', (d) => color(d.data[0]))
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);

        svg.select('g')
            .selectAll('mySlices')
            .data(dataReady)
            .join('text')
            .text((d) => d.data[0])
            .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
            .style("text-anchor", "middle")
            .style("font-size", 10);
    }


    return (
        <svg id={chartId}>
            <g style={{ transform: `translate(${width / 2}px,${height / 2}px)` }}></g>
        </svg>
    );
}

export default PieChart;