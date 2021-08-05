import { pointsSortedByDate } from "../mock/point-data";

const POINTS_TO_SHOW = 3;

const createDestinationsTemplate = (points) => {
    const firstDestination = points[0].name;
    const lastDestination = points[points.length - 1].name;
    const uniqueDestionations = [...new Set(points.map(point => point.name))];

    if (uniqueDestionations.length === 1) {
      return firstDestination;
    }
    if (points.length <= POINTS_TO_SHOW) {
      return points.map((point) => point.name).join(' &mdash; ');
    }
    return `${firstDestination} &mdash; ${lastDestination}`;
  };

console.log(createDestinationsTemplate(pointsSortedByDate));
