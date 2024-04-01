export const config = {
  _apiUrl: process.env.REACT_APP_API_URL,
  get apiUrl() {
    return this._apiUrl;
  },
  set apiUrl(value) {
    this._apiUrl = value;
  },
};
