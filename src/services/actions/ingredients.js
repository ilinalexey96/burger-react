import { baseUrl } from "../../utils/api";
import { request } from "../../utils/request";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredientsSuccess = (data) => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: data,
})

export const getIngredients = () => {
  const url = `${baseUrl}/ingredients`;
  return (dispatch) => {
    request(url)
      .then(({ data }) => {
        dispatch(getIngredientsSuccess(data))
      })
      .catch(console.warn)
  }
}