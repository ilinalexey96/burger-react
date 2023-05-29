import React from 'react';
import { AppHeader } from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { getIngredients } from '../../services/actions/ingredients';
import Main from '../main/main';
import { setIngredientDetails, deleteIngredientDetails } from '../../services/actions/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../services/actions/order-details';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import { NotFound404 } from '../../pages/not-found-page/not-found-page';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { deleteOrder } from '../../services/actions/order-details';

export default function App() {
  const login = useSelector(state => state.login.login) || JSON.parse(sessionStorage.getItem('login'));
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector(state => state.constructorList.constructorList);
  const ingredients = useSelector(state => state.ingredients.ingredientsList);
  const { _id } = useSelector(state => state.ingredientDetails.ingredientDetails);
  const idList = React.useMemo(() => {
    return data.map(element => element._id)
  }, [data])
  const [isOpen, setOpen] = React.useState(false)
  const [element, setElement] = React.useState(false);

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  const handleOpenIngredientDetails = React.useCallback((element) => {
    const { _id } = element;
    const url = `/ingredients/:${_id}`;
    window.history.pushState(null, '', url);
    sessionStorage
      .setItem('ingredient', JSON.stringify(element));
    dispatch(setIngredientDetails(element))
    setElement(true);
    setOpen(!isOpen);
  }, [dispatch, isOpen]);

  const closeModal = () => {
    setOpen(false);
    dispatch(deleteIngredientDetails());
    dispatch(deleteOrder());
    history.replace('/');
  }

  const handleButtonClick = React.useCallback(() => {
    if (login) {
      setElement(false);
      dispatch(getOrderDetails(idList))
      setOpen(true);
    }
    if (!login) {
      history.push('/login');
    }
  }, [dispatch, history, login, idList])

  return (
    <DndProvider backend={HTML5Backend}>
      {ingredients && <div className="App">
        <AppHeader />
        <Switch location={background || location}>
          <Route path={`/ingredients/:${_id}`}>
            <IngredientPage />
          </Route>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
          <Route path='/register' exact={true}>
            <RegisterPage />
          </Route>
          <Route path='/forgot-password' exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path='/reset-password' exact={true}>
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path='/profile' exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <Route path='/' exact={true}>
            <Main handleOpenIngredientDetails={handleOpenIngredientDetails}
              handleButtonClick={handleButtonClick} />
          </Route>
          <Route path='*'>
            <NotFound404 />
          </Route>
        </Switch>
        {isOpen ?
          (
            <Modal onClick={closeModal} onClose={closeModal} >
              {element ?
                <IngredientDetails />
                : <OrderDetails />}
            </Modal>
          )
          : null}
      </div>}
    </DndProvider>
  )
}