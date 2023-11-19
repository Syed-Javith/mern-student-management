// DataVisualization.js

import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const DataVisualization = ({data , setChartVisible}) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 ;
    const height = 200 ;

    // D3.js code for visualization
    const svg = d3.select(svgRef.current);

    // Clear existing content
    svg.selectAll('*').remove();

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.subject))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.mark)])
      .range([height - margin.bottom, margin.top]);

    // Create x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Create y-axis
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Create bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.subject))
      .attr('y', d => yScale(d.mark))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(d.mark))
      .attr('fill', 'steelblue');

    // Add labels for each bar
    svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(d => `${d.subject} : ${d.mark}`)
      .attr('x', d => xScale(d.subject) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.mark) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white');

      svg.selectAll('text.mark')
      .data(data)
      .enter()
      .append('text')
      .text(d => d.mark)
      .attr('class', 'mark')
      .attr('x', d => xScale(d.subject) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.mark) - 7) // Adjust the position as needed
      .attr('text-anchor', 'middle')
      .attr('fill', 'white');

  }, [data]);

  return (
    <div style={{ margin : 'auto'}}>
      <svg ref={svgRef} width={400} height={250}>
      </svg>
      <button className='white-bg-colored-btn' onClick={() => setChartVisible(false)}>Back to Marks</button>
    </div>
  );
}

export default DataVisualization

