function TweetListItem({ created_at, compound, neg, neu, pos, text }) {
  return (
    <div
      style={{
        border: "1px solid rgb(100, 100, 100)",
        borderRadius: "5px",
        margin: "10px",
        padding: "10px",
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
          {compound}
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
      {getTweets(tweets).map((data) => (
        <TweetListItem {...data} />
      ))}
    </>
  );
}
