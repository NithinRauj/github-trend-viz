import './App.css';
import BarChart from './components/BarChart';
import ChartWindow from './components/ChartWindow';
import licensesData from './data/licenses.json';
import reposData from './data/repos.json';

function App() {

  return (
    <div className="App">
      <h1>
        GitHub Trends Visualization
      </h1>
      <div className="flex">
        <ChartWindow title={'Popular Licenses among GitHub Repositories'}>
          <BarChart
            chartId={'popular-licenses'}
            width={700}
            height={300}
            data={licensesData}
          />
        </ChartWindow>
        {/* <ChartWindow title={'Top 10 GitHub Repositiories'}>
          <BarChart
            chartId={'popular-repos'}
            width={700}
            height={300}
            data={reposData}
          />
        </ChartWindow> */}
        <ChartWindow title={'Percentage of Repositories covered by each license'}>

        </ChartWindow>
      </div>
    </div>
  )
}

export default App
