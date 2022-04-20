import { ResponsiveScatterPlot } from "@nivo/scatterplot";
export function ScatterChart({ data }) {
  return (
    <div style={{ width: "100%", height: 600 }}>
      <ResponsiveScatterPlot
        colors={["rgb(47, 65, 143, 0.4)"]}
        // data={[
        //   {
        //     id: "group A",
        //     data
        //   },
        // ]}
        // margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        // xScale={{
        //   type: "time",
        //   format: "%Y-%m-%d",
        //   // format: "%Y-%m-%dT%H:%M:%SZ",
        //   precision: "day",
        // }}
        // yScale={{ type: "linear", min: "auto", max: "auto" }}
        // blendMode="multiply"
        // axisTop={null}
        // axisRight={null}
        // axisLeft={{
        //   orient: "left",
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: "size",
        //   legendPosition: "middle",
        //   legendOffset: -60,
        // }}
        margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
        data={[
          {
            id: "apples",
            data: data,
          },
        ]}
        xScale={{
          type: "time",
          // format: '%Y-%m-%d',
          // format: "%Y-%m-%dT%H:%M:%SZ",
          // precision: "secound",
        }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
        xFormat="time:%Y-%m-%d"
        // axisBottom={{
        //   format: "%b %d",
        //   tickValues: "every 2 days",
        // }}
        axisLeft={{
          legend: "Sentiment",
          legendOffset: 12,
        }}
        axisBottom={{
          format: "%Y %d %H:%M",
          tickValues: "every 6 hours",
          legend: "Time",
          legendOffset: -12,
        }}
        nodeSize={5}
        tooltip={(node) => {
          if (node?.node?.data) {
            console.info(node);
            return (
              <div style={{ background: "white", border: "2px solid black", padding: "10px", maxWidth: "300px" }}>
                <span  style={{ color: "rgb(120, 120, 120)" }}>Time</span><br/>
                <span>{new Date(node?.node?.data?.x).toLocaleString()}</span><br/>
                <span  style={{ color: "rgb(120, 120, 120)" }}>Sentiment</span><br/>
                <span>{node?.node?.data?.y}</span><br/>
                <span  style={{ color: "rgb(120, 120, 120)" }}>Tweet</span><br/>
                <span>{node?.node?.data?.text}</span>
              </div>
            );
          }
        }}
      />
    </div>
  );
}
