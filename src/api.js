const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const DataUrl = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
}

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};


export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: DataUrl.POINTS})
      .then(Api.toJSON);
  }

  updatePoint(point) {
    return this._load({
      url: `${DataUrl.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON);
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
