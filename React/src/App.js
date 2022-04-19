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

    // const { data, isLoading } = useQuery("itsover", async () => await (await fetch("http://localhost:5000/search/thomas?num_days=2")).json());


    // // console.log(data)

    // if (isLoading) {
    //   return <>Loading...</>
    // }
    
    console.log(data.data)
    const processedChartData = getProcessedChartData(data?.data);

    console.info(processedChartData)
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
