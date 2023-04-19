import Proptypes from 'prop-types';

export const ingredientType = Proptypes.shape({
    _id: Proptypes.string.isRequired,
    name: Proptypes.string.isRequired,
    type: Proptypes.string.isRequired,
    proteins: Proptypes.number.isRequired,
    fat: Proptypes.number.isRequired,
    carbohydrates: Proptypes.number.isRequired,
    calories: Proptypes.number.isRequired,
    price: Proptypes.number.isRequired,
    image: Proptypes.string.isRequired,
    image_mobile: Proptypes.string.isRequired,
    image_large: Proptypes.string.isRequired,
    __v: Proptypes.number.isRequired,
})