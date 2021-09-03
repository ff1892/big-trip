import { UpdateType } from './const';
import PointsModel from './model/points';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const DataUrl = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: DataUrl.POINTS})
      .then(Api.toJSON)
      .then((points) => points.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    return this._load({
      url: `${DataUrl.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  getOffers() {
    return this._load({url: DataUrl.OFFERS})
      .then(Api.toJSON);
  }

  getDestinations() {
    return this._load({url: DataUrl.DESTINATIONS})
    .then(Api.toJSON);
  }

  getData() {
    return Promise.all([
      this.getPoints()
        .catch(() => {
          UpdateType.INIT, []
        }),
      this.getOffers()
        .catch((error) => {
          throw new Error(error)
        }),
      ,this.getDestinations()
        .catch((error) => {
          throw new Error(error)
        }),
    ]);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (response.ok) {
      return response;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
