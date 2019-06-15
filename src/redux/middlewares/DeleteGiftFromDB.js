export default store => next => action => {
  if (action.type !== 'DELETE_GIFT_FROM_DB') return next(action);

  next({
    ...action,
    type: action.type + '_REQUEST'
  });

  fetch(`${process.env.REACT_APP_SERVER}/delete/${action.data}`, {
    method:'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
