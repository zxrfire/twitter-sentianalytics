function colorScale(val, multiplier) {
  const green = (val) => `rgb(${255 + val * multiplier},255,${255 + val * multiplier})`;
  const red = (val) => `rgb(255,${255 - val * multiplier},${255 - val * multiplier})`;
  return val > 0 ? red(val) : green(val);
}


function getMonke(data) {
  let [counter, compound, neg, neu, pos] = [0, 0, 0, 0, 0];
  for (const row of data) {
    for (const innerRow of row?.sentiment?.scores) {
      compound += innerRow.compound;
      if (!isNaN(innerRow.neg)) neg += innerRow.neg;
      if (!isNaN(innerRow.neu)) neu += innerRow.neu;
      if (!isNaN(innerRow.pos)) pos += innerRow.pos;
      counter += 1;
    }
  }

  return {
    counter,
    compound: compound / counter,
    neg: neg / counter,
    neu: neu / counter,
    pos: pos / counter,
  };
}

export function Overview({ data }) {
  const { counter, compound, neg, neu, pos } = getMonke(data);
  return (
    <div
      style={{
        border: "1px solid rgb(100, 100, 100)",
        borderRadius: "5px",
        margin: "10px 0px",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px",
        background: colorScale(-compound, 100)

      }}
    >
      <div>
        <span style={{ color: "rgb(120, 120, 120)" }}>
          Average Overall Sentiment
        </span>
        <br />
        {compound.toFixed(3)}
      </div>
      <div>
        <span style={{ color: "rgb(120, 120, 120)" }}>
          Average Positive Sentiment
        </span>
        <br />
        {pos.toFixed(3)}
      </div>
      <div>
        <span style={{ color: "rgb(120, 120, 120)" }}>
          Average Neutral Sentiment
        </span>
        <br />
        {neu.toFixed(3)}
      </div>
      <div>
        <span style={{ color: "rgb(120, 120, 120)" }}>
          Average Negative Sentiment
        </span>
        <br />
        {neg.toFixed(3)}
      </div>
      <div>
        <span style={{ color: "rgb(120, 120, 120)" }}>Number of Tweets</span>
        <br />
        {counter}
      </div>
    </div>
  );
}
