import { getTagsFromGoogleSuccess } from '../actions';

const googleVisionUrl = `${process.env.REACT_APP_GOOGLE_VISION_API}key=${process.env.REACT_APP_GOOGLE_KEY}`;

const googleVisionRequestFormat = (url) => {
  return {
    "requests":[
      {
        "image":{
          "source":{
            "imageUri": url
          }
        },
        "features":[
          {
            "type":"LABEL_DETECTION",
            "maxResults":6
          }
        ]
      }
    ]
  }
};

export default store => next => action => {
  if (action.type !== 'GET_TAGS_FROM_GOOGLE') return next(action);

  next({
    ...action,
    type: action.type + '_REQUEST'
  });

  const tags = [];

  fetch(googleVisionUrl, {
    method: 'POST',
    body: JSON.stringify(googleVisionRequestFormat(action.data)),
    headers: {
      'Content-Type':'application/json'
    }
  })
  .then(res => res.json())
  .then(res => res.responses[0].labelAnnotations)
  .then(res => res.forEach(item => {
    tags.push(item.description)
  }))
  .then(() => store.dispatch(getTagsFromGoogleSuccess(tags)))
  .catch(err => {
    next({
      ...action,
      type: action.type + '_FAILURE'
    })
  });
};
