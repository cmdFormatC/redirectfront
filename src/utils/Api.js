class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  _getToken() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    }
  }
  authentication(userdata) {
    return fetch(`${this._baseUrl}user/authentication`, {
      method: "POST",
      headers: this._getToken(),
      body: JSON.stringify({
        username: userdata.username,
        password: userdata.password,
      }),
    });
  }
  getLinks() {
    return fetch(`${this._baseUrl}dashboard/getlinks`, {
      headers: this._getToken(),
    }).then(this._checkResponse);
  }
  updateLink(id, link) {
    return fetch(`${this._baseUrl}dashboard/updatelinks`, {
      method: "PATCH",
      headers: this._getToken(),
      body: JSON.stringify({
        id,
        link,
      }),
    }).then(this._checkResponse);
  }
  checkAuth() {
    return fetch(`${this._baseUrl}user/authentication`, {
      headers: this._getToken(),
    });
  }
  addLink(link) {
    return fetch(`${this._baseUrl}dashboard/addlink`, {
      method: "POST",
      headers: this._getToken(),
      body: JSON.stringify({
        link,
      }),
    }).then(this._checkResponse);
  }
  deleteLink(id) {
    return fetch(`${this._baseUrl}dashboard/${id}`, {
      method: "DELETE",
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3003/",
});
export default api;
