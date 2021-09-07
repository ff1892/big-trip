import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {BackgroundColorChart} from '../const.js';
import {getPriceForAllTypes, getTypeTotalCount, getDurationForAllTypes} from '../utils/stats.js';
import {getHumanizedTimeDiff} from '../utils/time.js';

const BAR_HEIGHT = 55;

const renderPriceChart = (priceCtx, points) => {
  const priceForAllTypes = getPriceForAllTypes(points);
  const types = [...priceForAllTypes.keys()].map((value) => value.toUpperCase());
  const prices = [...priceForAllTypes.values()];
  const backgroundColors = types.map((type) => BackgroundColorChart[type.toLowerCase()]);
  const backgroundColorsHover = backgroundColors.map((color) => `${color.slice(0, color.length - 6)})`);

  return new Chart(priceCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: prices,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColorsHover,
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 30,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypesCountChart = (typeCtx, points) => {
  const typeTotalCount = getTypeTotalCount(points);
  const types = [...typeTotalCount.keys()].map((value) => value.toUpperCase());
  const counts = [...typeTotalCount.values()];
  const backgroundColors = types.map((type) => BackgroundColorChart[type.toLowerCase()]);
  const backgroundColorsHover = backgroundColors.map((color) => `${color.slice(0, color.length - 6)})`);


  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: counts,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColorsHover,
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 30,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, points) => {
  const timeForAllTypes = getDurationForAllTypes(points);
  const types = [...timeForAllTypes.keys()].map((value) => value.toUpperCase());
  const times = [...timeForAllTypes.values()];
  const backgroundColors = types.map((type) => BackgroundColorChart[type.toLowerCase()]);
  const backgroundColorsHover = backgroundColors.map((color) => `${color.slice(0, color.length - 6)})`);

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: times,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColorsHover,
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${getHumanizedTimeDiff(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME-SPEND',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 30,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

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
  constructor(points) {
    super();
    this._data = points;
    this._uniqePoints = getTypeTotalCount(this._data).size;

    this._resetCharts();
    this._setCharts();
  }

  _resetCharts() {
    this._priceChart = null;
    this._typeChart = null;
    this._timeChart = null;
  }

  removeElement() {
    super.removeElement();

    if (this._priceChart !== null
      || this._typeChart !== null
      || this._timeChart !== null) {
      this._resetCharts();
    }
  }

  getTemplate() {
    return createStatsTemplate();
  }

  _setCharts() {
    if (this._priceChart !== null
      || this._typeChart !== null
      || this._timeChart !== null) {
      this._resetCharts();
    }

    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    moneyCtx.height = BAR_HEIGHT * this._uniqePoints;
    typeCtx.height = BAR_HEIGHT * this._uniqePoints;
    timeCtx.height = BAR_HEIGHT * this._uniqePoints;

    this._priceChart = renderPriceChart(moneyCtx, this._data);
    this._typeChart = renderTypesCountChart(typeCtx, this._data);
    this._timeChart = renderTimeChart(timeCtx, this._data);
  }
}
