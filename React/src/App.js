import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import data from "./data.json"
import { Chart } from "./Chart"
import { TweetList } from "./TweetList"
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
    y: sentiment.avgCompound
  }))
}

function Sentiment() {

    console.log(data)

    const processedChartData = getProcessedChartData(data?.data);
    return (
      <div className="App">
        <h1 style={{fontSize: 70}}>Twitter Sentiment Tracker</h1>
        <h2 style={{fontSize: 40, textAlign: 'left'}}>Sentiment for "Putin"</h2>
        <Chart data={processedChartData}/>
        <TweetList tweets={data?.data} />
      </div>
    );
}

export default App;
