import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const createStatsTemplate = () => (
  `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="money" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="type" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
  </div>
  </section>`
);

export default class Stats extends SmartView {
  getTemplate() {
    return createStatsTemplate();
  }
}
