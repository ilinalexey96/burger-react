import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../actions/ingredients";

const initialState = {
    ingredientsList: [],
    ingredientDetails: {},
    orderDetails: {},
    ingredientsRequest: false,
    ingredientsSuccess: false,
    ingredientsFailed: false,
    currentTab: 'one',
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsFailed: false,
                ingredientsRequest: false,
                ingredientsList: action.payload
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            }
        }
        default: {
            return state;
        }
    }
}