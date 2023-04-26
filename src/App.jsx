import BarChart from './components/BarChart';
import ChartWindow from './components/ChartWindow';
import PieChart from './components/PieChart';
import WordCloud from './components/WordCloud';
import Heatmap from './components/Heatmap';
import './App.css';
import licensesData from './data/licenses.json';
import filesCovered from './data/filesCoveredByLicenses.json';
import commonPhrases from './data/commonPhrases.json';
import commitActivityByTime from './data/commitsActivityByTime.json';
import reposData from './data/repos.json';

const generateXDomain = (length) => {
  return Array.from({ length }, (v, i) => i.toString());
}

const generateYDomain = (length) => {
  return Array.from({ length }, (v, i) => (i + 1).toString());
}

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
        <ChartWindow title={'Top 10 GitHub Repositiories'}>
          <BarChart
            chartId={'popular-repos'}
            width={700}
            height={300}
            data={reposData}
          />
        </ChartWindow>
        <ChartWindow title={'Repositories covered by each License'}>
          <PieChart
            chartId={'files-covered'}
            width={350}
            height={350}
            data={filesCovered}
          />
        </ChartWindow>
        <ChartWindow title={'Fifty common phrases in commit messages'}>
          <WordCloud
            chartId={'word-cloud'}
            width={500}
            height={500}
            data={commonPhrases}
          />
        </ChartWindow>
        <ChartWindow title={'Commit Activity by Time of Day'}>
          <Heatmap
            chartId={'commit-activity'}
            width={450}
            height={450}
            xDomain={generateXDomain(24)}
            yDomain={generateYDomain(7)}
            data={commitActivityByTime}
          />
        </ChartWindow>
      </div>
    </div>
  )
}

export default App
