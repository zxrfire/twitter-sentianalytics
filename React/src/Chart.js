import { ResponsiveLine } from "@nivo/line";

export function Chart({ data }) {
  console.info(data);
  return (
    <div style={{ width: "100%", height: 600 }}>
      <ResponsiveLine
        margin={{ top: 20, right: 20, bottom: 30, left: 30 }}
        colors={['#2f418f']}
        data={[
          {
            id: "fake corp. A",
            data
          }
        ]}
        xScale={{
          type: "time",
          format: "%Y-%m-%dT%H:%M:%SZ",
          useUTC: false,
          precision: "second",
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto"
          // stacked: boolean('stacked', false),
        }}
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
        // curve={select('curve', curveOptions, 'monotoneX')}
        // pointSymbol={CustomSymbol}
        pointSize={5}
        pointBorderWidth={1}
        pointBorderColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        useMesh={true}
        enableSlices={false}
      />
    </div>
  );
}
