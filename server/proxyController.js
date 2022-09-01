const fetch = require('node-fetch');
const {cookie} = require('./private')

const proxyController = {};

const allowList = {
  'https://www.edmunds.com': true,
  'https://www.carvana.com': true,
  'https://www.google.com': true
}

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `proxyController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in proxyController.${method}. Check server logs for more details.` }
  };
};

proxyController.validateRequest = (req, res, next) => {
  // const targetURL = req.header('Target-URL');
  // if (!targetURL) return next(createErr({
  //   method: 'validateRequest',
  //   type: 'Invalid request. Missing target URL',
  // }));

  const requestUrl = req.originalUrl.split('').slice(9).join('');
  console.log(requestUrl);
  const protocolAndDomain = requestUrl.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/)[0];
  if (!(protocolAndDomain in allowList)) return next(createErr({
    method: 'validateRequest',
    type: 'Invalid request. Unauthorized target URL' + protocolAndDomain
  }))
  res.locals.requestUrl = requestUrl;
  return next();
}


proxyController.proxyRequest = (req, res, next) => {
  res.locals.headers = [
    ['Access-Control-Allow-Origin', '*'],
    ['Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE'],
    ['Access-Control-Allow-Headers', req.header('access-control-request-headers')]
  ];

  myHeaders = {}
  myHeaders['Target-URL'] =  'www.edmunds.com';
  myHeaders['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36';
  myHeaders['cookie'] = cookie;
  console.log('time to call the url');
  console.log(res.locals.requestUrl)
  console.log({myHeaders});
  fetch(res.locals.requestUrl,
    {
      mode: 'cors',
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
  ).then(response => {
    console.log('we have a response');
    if (response.ok) {
      res.locals.status = response.status;
      return response.text();
    }
    return next(createErr({
      method: 'proxyRequest',
      type: 'Bad response from requested URL'
    }));
  })
    .then(response => {
      console.log(response);
      res.locals.body = response
    })
    .then(() => next())
    .catch(err => next(createErr({
      method: 'proxyRequest',
      type: 'Failed to call requested url',
      err
    })));
}

module.exports = proxyController;
