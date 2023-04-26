import cloud from 'd3-cloud';
import React, { useEffect } from 'react'
import { select } from 'd3';


const WordCloud = ({ width, height, data, chartId }) => {

    useEffect(() => {
        if (!select(`#${chartId}`).select('g').size()) {
            renderWordCloud();
        }
    }, []);


    const renderWordCloud = () => {
        const draw = (words) => {
            select(`#${chartId}`)
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", (d) => d.size * 1.1 + "px")
                .style("fill", "#1b66b0")
                .attr("text-anchor", "middle")
                .attr("transform", (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
                .text((d) => d.text);
        }

        const margin = { top: 10, right: 10, bottom: 10, left: 10 };

        select(`#${chartId}`)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        const layout = cloud()
            .size([width, height])
            .words(data.map((d) => ({ text: d.subject, size: d.count })))
            .padding(15)
            .rotate(() => ~~(Math.random() * 2) * 90)
            .fontSize((d) => d.size * 1.1)
            .on("end", draw);

        layout.start();
    }

    return (
        <svg id={chartId}></svg>
    );
}

export default WordCloud;
