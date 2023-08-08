class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    authentication (userdata) {
        return fetch(`${this._baseUrl}/authentication`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                username: userdata.username,
                password: userdata.password
              }),
        })
        .then(this._checkResponse)
    }
    getLinks() {
        return fetch(`${this._baseUrl}/dashboard`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3003',
    headers: {
      'Content-Type': 'application/json'
    }
});
export default api;