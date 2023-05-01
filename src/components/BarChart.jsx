import React, { useEffect, useRef } from 'react'
import { scaleBand, scaleLinear, select, axisBottom, axisLeft } from 'd3';

const BarChart = ({ width, height, data, chartId }) => {

    const margin = { top: 30, left: 30, bottom: 30, right: 30 };

    const xScale = scaleBand()
        .range([0, width])
        .domain(data.map(d => d.label))
        .padding(0.3);

    const yScale = scaleLinear()
        .range([height, 0])
        .domain([0, Math.max(...data.map(d => d.value))]);

    useEffect(() => {
        if (!select(`#${chartId}`).select('g').size()) {
            renderBottomAxis();
            renderLeftAxis();
            renderBars();
        }
    }, []);


    const renderBottomAxis = () => {
        select(`#${chartId}`).append("g")
            .attr("transform", `translate(50, ${height})`)
            .call(axisBottom(xScale))
            .selectAll("text")
            .attr('transform', 'translate(10,20) rotate(45)')
    }

    const renderLeftAxis = () => {
        select(`#${chartId}`).append("g")
            .attr("transform", `translate(50, 0)`)
            .call(axisLeft(yScale));
    }

    const renderBars = () => {
        select(`#${chartId}`).selectAll("mybar")
            .data(data)
            .join("rect")
            .attr("x", d => xScale(d.label))
            .attr("y", d => yScale(0))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(0))
            .attr("fill", "#108010")
            .attr("transform", `translate(50, 0)`);

        select(`#${chartId}`).selectAll("rect")
            .transition()
            .duration(800)
            .attr("y", d => yScale(d.value))
            .attr("height", d => height - yScale(d.value))
            .delay((d, i) => i * 100);
    }


    return (
        <svg
            id={chartId}
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
        >
        </svg>
    )
}

export default BarChart