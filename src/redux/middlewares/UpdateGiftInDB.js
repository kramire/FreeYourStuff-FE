import { updateGiftInDBSuccess } from '../actions';

export default store => next => action => {
  if (action.type !== 'UPDATE_GIFT_IN_DB') return next(action);

  next({
    ...action,
    type: action.type + '_REQUEST'
  });

  fetch(`${process.env.REACT_APP_SERVER}/update/${action.data.id}`, {
    method: 'PUT',
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(action.data)
  })
  .then(() => store.dispatch(updateGiftInDBSuccess()));
};
