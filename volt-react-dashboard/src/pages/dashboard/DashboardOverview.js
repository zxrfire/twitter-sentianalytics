
import React, { useState, useEffect } from "react";
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { Chart } from "react-google-charts";
import almond from "./almond-latte.js";
import caramel from "./caramel-latte.js";
import react_query from "./react-query.js";
import mich_state from "./michigan-state.js";


export default () => {
  const [show_table, setTable] = useState(0);
  const [currTopic, setCurrTopic] = useState("Select a Topic")
  const [data, setData] = useState([["Time", "Positive", "Negative"], ["0", 0, 0]])
  const [options, setOptions] = useState(
    {
      title: "Age of sugar maples vs. trunk diameter, in inches",
      hAxis: { title: "Time" },
      vAxis: { title: "Senitment Strength" },
      legend: "none",
      trendlines: { 0: {}, 1: {} },
      pointSize: .5,
    }
  )

  function displayTable(topic){
    setTable(1);
    setCurrTopic(topic)

    if (topic == "Michigan State"){
      setData(
        mich_state
      )
      setOptions(
        {
          title: "Sentiment Strenth of 'Michigan State' Tweets Over Time",
          hAxis: { title: "Time" },
          vAxis: { title: "Senitment Strength" },
          legend: "none",
          trendlines: { 0: {}, 1: {} },
          pointSize: .5,
        }
      )
    }
    else if (topic == "Almond Latte"){
      setData(
        almond
      )
      setOptions(
        {
          title: "Sentiment Strenth of 'Almond Latte' Tweets Over Time",
          hAxis: { title: "Time" },
          vAxis: { title: "Senitment Strength" },
          legend: "none",
          trendlines: { 0: {}, 1: {} },
          pointSize: .5,
        }
      )
    }
    else if (topic == "React Query"){
      setData(
        react_query
      )
      setOptions(
        {
          title: "Sentiment Strenth of 'React Query' Tweets Over Time",
          hAxis: { title: "Time" },
          vAxis: { title: "Senitment Strength" },
          legend: "none",
          trendlines: { 0: {}, 1: {} },
          pointSize: .5,
        }
      )
    }
    else if (topic == "Caramel Latte"){
      setData(
        mich_state
      )
      setOptions(
        {
          title: "Sentiment Strenth of 'Caramel Latte' Tweets Over Time",
          hAxis: { title: "Time" },
          vAxis: { title: "Senitment Strength" },
          legend: "none",
          trendlines: { 0: {}, 1: {} },
          pointSize: .5,
        }
      )
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
        </Dropdown>

        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {currTopic}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => displayTable("Michigan State")}>Michigan State</Dropdown.Item>
                <Dropdown.Item onClick={() => displayTable("Almond Latte")}>Almond Latte</Dropdown.Item>
                <Dropdown.Item onClick={() => displayTable("React Query")}>React Query</Dropdown.Item>
                <Dropdown.Item onClick={() => displayTable("Caramel Latte")}>Caramel Latte</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        <ButtonGroup>
          <Button variant="outline-primary" size="sm">Share</Button>
          <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup>

        {
          show_table > 0 &&
          <Chart
            chartType="ScatterChart"
            width="80%"
            height="400px"
            data={data}
            options={options}
          />
        }

      </div>
    </>
  );
};
