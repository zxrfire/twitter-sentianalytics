function colorScale(val, multiplier) {
  const green = (val) => `rgb(${255 + val * multiplier},255,${255 + val * multiplier})`;
  const red = (val) => `rgb(255,${255 - val * multiplier},${255 - val * multiplier})`;
  return val > 0 ? red(val) : green(val);
}

function TweetListItem({ created_at, compound, neg, neu, pos, text }) {
  return (
    <div
      style={{
        border: "1px solid rgb(100, 100, 100)",
        borderRadius: "5px",
        margin: "10px 0px",
        padding: "10px",
        background: colorScale(-compound, 100)
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px"
        }}
      >
        <div>
          <span style={{ color: "rgb(120, 120, 120)" }}>Time</span>
          <br />
          {new Date(created_at).toLocaleString()}
        </div>
        <div>
          <span style={{ color: "rgb(120, 120, 120)" }}>Overall Sentiment</span>
          <br />
          <div style={{ borderRadius: "3px"}}>
          {compound}
          </div>
        </div>
        <div>
          <span style={{ color: "rgb(120, 120, 120)" }}>Negative</span>
          <br />
          {neg}
        </div>
        <div>
          <span style={{ color: "rgb(120, 120, 120)" }}>Neutral</span>
          <br />
          {neu}
        </div>
        <div>
          <span style={{ color: "rgb(120, 120, 120)" }}>Positive</span>
          <br />
          {pos}
        </div>
      </div>
      <div
        style={{
          textAlign: "left",
        }}
        >
        <strong>Tweet</strong>
        <br/>
        {text}
      </div>
    </div>
  );
}

function getTweets(tweets) {
  let allTweets = [];
  tweets.forEach(
    ({ sentiment }) => (allTweets = allTweets.concat(sentiment.scores))
  );
  return allTweets;
}

export function TweetList({ tweets }) {
  return (
    <>
      <h2>Tweets</h2>
      {getTweets(tweets).slice(0, 100).map((data, i) => (
        <TweetListItem key={data.created_at + i} {...data} />
      ))}
    </>
  );
}
