import BarChart from './components/BarChart';
import ChartWindow from './components/ChartWindow';
import PieChart from './components/PieChart';
import WordCloud from './components/WordCloud';
import Heatmap from './components/Heatmap';
import Scatterplot from './components/Scatterplot';
import BubbleChart from './components/BubbleChart';
import { generateHeatmapXDomain, generateHeatmapYDomain } from './utils/heatmapUtils';
import './App.css';
import licensesData from './data/licenses.json';
import commonPhrases from './data/commonPhrases.json';
import commitActivityByTime from './data/commitsActivityByTime.json';
import authorContributions from './data/authorContributions.json';
import repoAndLanguages from './data/repoAndLanguages.json';

function App() {


  return (
    <div className="App">
      <h1>
        GitHub Trends Visualization
      </h1>
      <div className="flex">
        <ChartWindow
          title={'Popular Licenses among GitHub Repositories'}
          xLabel={'Licenses'}
          yLabel={'No of repositories'}
          xLabelPosition={{ top: '75%', left: '43%' }}
          yLabelPosition={{ top: '37%', left: '-13%' }}
        >
          <BarChart
            chartId={'popular-licenses'}
            width={700}
            height={300}
            data={licensesData}
          />
        </ChartWindow>
        <ChartWindow
          title={'Fifty common phrases in commit messages'}
        >
          <WordCloud
            chartId={'word-cloud'}
            width={500}
            height={500}
            data={commonPhrases}
          />
        </ChartWindow>
        <ChartWindow
          title={'Commit Activity by Time of Day'}
          xLabel={'Hour of Day'}
          yLabel={'Day of Week'}
          xLabelPosition={{ top: '90%', left: '43%' }}
          yLabelPosition={{ top: '50%', left: '2%' }}
        >
          <Heatmap
            chartId={'commit-activity'}
            width={450}
            height={450}
            xDomain={generateHeatmapXDomain(24)}
            yDomain={generateHeatmapYDomain(7)}
            data={commitActivityByTime}

          />
        </ChartWindow>
        <ChartWindow
          title={'Contributions by Top 50 Authors'}
          xLabel={'No of Repositories'}
          yLabel={'No of Commits'}
          xLabelPosition={{ top: '90%', left: '43%' }}
          yLabelPosition={{ top: '50%', left: '-5%' }}
        >
          <Scatterplot
            chartId={'author-contributions'}
            width={460}
            height={450}
            data={authorContributions}
          />
        </ChartWindow>
        <ChartWindow
          title={'Popular Programming Languages'}
        >
          <BubbleChart
            chartId={'repo-languages'}
            data={repoAndLanguages}
          />
        </ChartWindow>
      </div>
    </div >
  )
}

export default App
