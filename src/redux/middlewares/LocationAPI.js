export default store => next => action => {
  if (action.type !== 'GET_LOCATION') return next(action);

  next({
    ...action,
    type: action.type + '_REQUEST'
  });

  // console.log("LOCATION REQUEST")

  navigator.geolocation.getCurrentPosition((pos) => {
    // console.log(pos)
    const lat = Number(pos.coords.latitude);
    const lng = Number(pos.coords.longitude);
    next({
      ...action,
      data: {lat, lng}
    });
  });
};