import {
    GET_BURGER_INGREDIENTS_REQUEST,
    GET_BURGER_INGREDIENTS_ERROR,
    GET_BURGER_INGREDIENTS_SUCCESS
} from "../actions/burger-ingredients";

export const burgerIngredientsState = {
    burgerIngredients: [],
    burgerIngredientsRequest: false,
    burgerIngredientsError: false,
}

export const burgerIngredientsReducer = (state = burgerIngredientsState, action) => {
    switch (action.type) {
        case GET_BURGER_INGREDIENTS_REQUEST: {
            return {
                ...state,
                burgerIngredientsRequest: true
            }
        }
        case GET_BURGER_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                burgerIngredients: [...action.payload],
                burgerIngredientsError: false,
            }
        }
        case GET_BURGER_INGREDIENTS_ERROR: {
            return {
                ...state,
                burgerIngredientsRequest: false,
                burgerIngredientsError: true
            }
        }
        default: {
            return state;
        }
    }
}
