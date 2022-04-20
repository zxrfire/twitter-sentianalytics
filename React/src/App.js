import "./App.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import data from "./data.json";
import { Chart } from "./Chart";
import { ScatterChart } from "./ScatterChart";
import { TweetList } from "./TweetList";
import { Overview } from "./Overview";
import { useState } from "react";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Sentiment />
    </QueryClientProvider>
  );
}

function getProcessedChartData(data) {
  return data.map(({ end_time, sentiment }) => ({
    x: end_time,
    y: sentiment.avgCompound,
  }));
}

function getScatterData(data) {
  const res = [];
  for (const row of data) {
    for (const innerRow of row?.sentiment?.scores) {
      res.push({
        x: new Date(innerRow.created_at),
        y: innerRow.compound,
        text: innerRow.text,
      });
    }
  }

  return res;
}

function Sentiment() {
  const [query, setQuery] = useState();
  const [actualQuery, setActualQuery] = useState();
  // const { data, isLoading } = useQuery(
  //   "itsover",
  //   async () =>
  //     await (
  //       await fetch("http://localhost:5000/search/thomas?num_days=2")
  //     ).json()
  // );

  // // console.log(data)

  // if (isLoading) {
  //   return <>Loading...</>
  // }

  // const thomas = data.data;
  // console.log(thomas);
  // const processedChartData = getProcessedChartData(thomas);

  // console.info(processedChartData);

  return (
    <div className="App">
      <h1 style={{ fontSize: 70 }}>Twitter Sentiment Tracker</h1>
      <div>
        <input
          type="text"
          id="header-search"
          placeholder="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          style={{ width: "400px", height: "25px", border: "2px solid black" }}
        />
        <button
          style={{ width: "100px", height: "31px", border: "2px solid black" }}
          onClick={() => {
            setActualQuery(query);
          }}
        >
          Submit
        </button>
      </div>
      {actualQuery && <ItsOver query={actualQuery} />}
    </div>
  );
}

function ItsOver({ query }) {
  // const { data, isLoading } = useQuery(
  //   `${query}`,
  //   async () =>
  //     await (
  //       await fetch(`http://localhost:5000/search/${query}?num_days=2`)
  //     ).json()
  // );
  const [line, setLine] = useState(true);
  // if (isLoading) {
  //   return <>Loading...</>;
  // }
  const thomas = data.data;

  return (
    <>
      <h2 style={{ fontSize: 40, textAlign: "left" }}>
        Sentiment for "{query}"
      </h2>
      <Overview data={thomas} />
      <button
        style={{ width: "120px", height: "31px", border: "2px solid black" }}
        onClick={() => {
          setLine((prev) => !prev);
        }}
      >
        {line ? "Switch to scatter" : "Switch to line"}
      </button>
      {line ? (
        <Chart data={getProcessedChartData(thomas)} />
      ) : (
        <ScatterChart data={getScatterData(thomas)} />
      )}
      <TweetList tweets={thomas} />
    </>
  );
}

export default App;
