export const config = {
    baseUrl: 'https://norma.nomoreparties.space/api', 
    ingredients: '/ingredients',
    order: '/orders',
    defaultHeaders: {
        'Content-Type': 'application/json'
    },
};

class Api {
    constructor({ baseUrl, ingredients, order, defaultHeaders }) {
        this._baseUrl = baseUrl;
        this._ingredientsEndpoint = ingredients;
        this._orderEndpoint = order;
        this._defaultHeaders = defaultHeaders;
    }
 
    _makeUrl(endpoint) {
        return `${this._baseUrl}${endpoint}`;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return res.json()
            .then(function (err) {
                err.code = res.status;
                return Promise.reject(`Ошибка: ${res.status}`)
            });
    };

    getBurgerIngredients() {
        const options = {
            method: 'GET',
            headers: this._defaultHeaders
        };
        return fetch(this._makeUrl(this._ingredientsEndpoint), options)
            .then(this._handleResponse);
    }

    getOrderDetails(idIngredientsList) {
        const options = {
            method: 'POST',
            headers: this._defaultHeaders,
            body: JSON.stringify({
                ingredients: idIngredientsList
            })
        }
        return fetch(this._makeUrl(this._orderEndpoint), options)
            .then(this._handleResponse);
    }
}

export const apiBurger = new Api(config);
