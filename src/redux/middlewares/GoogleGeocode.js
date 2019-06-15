import { getGeocodeSuccess } from "../actions";

export default store => next => action => {

  if(action.type !== 'GET_GEOCODE') return next(action);

  next ({
    ...action,
    type: action.type + '_REQUEST'
  });

  const lat = action.data.lat;
  const lng = action.data.lng;

  fetch(`${process.env.REACT_APP_GOOGLE_MAP_API}latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
  .then(res => res.json())
  .then(res => res.results[0].formatted_address)
  .then(res => store.dispatch(getGeocodeSuccess(res)))
  .catch(err => {
    next({
      ...action,
      type: action.type + '_FAILURE'
    })
  });
};