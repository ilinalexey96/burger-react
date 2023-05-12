import { getCookie } from "../../utils/cookies/cookies";
import { USER_AUTHORIZATION_SUCCESS } from "../actions/authorization";
import { USER_LOGOUT_SUCCESS } from "../actions/logout";

export const initialState = {
    authorization: getCookie('access') ? true : false,
    user: {}
}

export const userAuthorizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTHORIZATION_SUCCESS: {
            return {
                ...state,
                authorization: true,
                user: action.payload.user
            }
        }
        case USER_LOGOUT_SUCCESS: {
            return {
                ...state,
                authorization: false,
                user: {}
            }
        }
        default: {
            return state;
        }
    }
}