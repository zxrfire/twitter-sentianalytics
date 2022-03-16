
import React, { useState, useEffect } from "react";
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';


export default () => {
  const [show_table, setTable] = useState(0);
  const [currTopic, setCurrTopic] = useState("Select a Topic")
  const [tableData, setTableData] = useState('{"avgNeg" : 0, "avgNeu" : 0, "avgPos" : 0, "avgCompound" : 0}')

  function displayTable(topic){
    setTable(1);
    setCurrTopic(topic)

    if (topic == "Michigan State"){
      setTableData('{"avgNeg": 0.13731999999999997, "avgNeu": 8.409090000000052, "avgPos": 1.4035800000000038, "avgCompound": 4.148715999999957}')
    }
    else if (topic == "Almond Latte"){
      setTableData('{"avgNeg": 0.2623700000000003, "avgNeu": 4.35297, "avgPos": 0.3346700000000002, "avgCompound": 0.24241699999999988}')
    }
    else if (topic == "React Query"){
      setTableData('{"avgNeg": 0.0114, "avgNeu": 0.8671300000000001, "avgPos": 0.10146999999999996, "avgCompound": 0.304097}')
    }
    else if (topic == "Caramel Latte"){
      setTableData('{"avgNeg": 0.03757000000000001, "avgNeu": 0.8289799999999997, "avgPos": 0.11347, "avgCompound": 0.18842099999999998}')
    }

    setTableData(JSON.parse(tableData))
  }

  useEffect(() => {
  }, [tableData])

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
          <table>
            <tr>
              <th>Average Negative</th>
              <th>Average Neutral</th>
              <th>Average Positive</th>
              <th>Average Compound</th>
            </tr>
            <tr>
              <th>{tableData["avgNeg"]}</th>
              <th>{tableData["avgNeu"]}</th>
              <th>{tableData["avgPos"]}</th>
              <th>{tableData["avgCompound"]}</th>
            </tr>
          </table>
        }

      </div>
    </>
  );
};
