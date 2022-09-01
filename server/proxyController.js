const fetch = require('node-fetch');


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
  const targetURL = req.header('Target-URL');
  if (!targetURL) return next(createErr({
    method: 'validateRequest',
    type: 'Invalid request. Missing target URL',
  }));

  const requestUrl = req.originalUrl.split('').slice(9).join('');
  const protocolAndDomain = requestUrl.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/)[0];
  if (!(protocolAndDomain in allowList)) return next(createErr({
    method: 'validateRequest',
    type: 'Invalid request. Unauthorized target URL'
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
  myHeaders['cookie'] = 'visitor-id=04745348-da49-4af0-9e65-a96c76f01b4a; edmunds=04745348-da49-4af0-9e65-a96c76f01b4a; usprivacy=1YNN; device-characterization=false,false; content-targeting=US,MA,BILLERICA,506,-71.2504,42.5493,01821-01822; __carcode_7maoao_FIRST_VISIT_TS=1661962933340; __carcode_7maoao_user_id=6; g_state={"i_p":1662049704409,"i_l":2}; edwpt={"p":"unknown"}; ak_bmsc=577A9B3A12998829E868A4671EA077D8~000000000000000000000000000000~YAAQBLxuaHtuotqCAQAAQLB39RDg9BEsuWmFBqE0l4co2dL+qiDbv552zkGX2BltMAo3YF3aV/LZHyidBMO3vlD7OXmSxEJqrFTrHlYZHZyxpxBtC+UjFV/CScMCPefhkH2wVEkv326JddaGAiV57KKh4JQBcjroFA85lRDa9VzmdH4AbGzi1ebb7GqUMQcWxl+c+Z/I5H1zJFDGmRt/8Ct4074vhF821Yfb2XJkDDodWQWpbJ3A3QId8gk/S3piS4GAmCFc3On0EZIqJq0n8qWfU5V13hUH5Ze0Ce6robUXcAkbxsaxrS/PFxQhywGL6+NnV2LoLlfAm0dEGh5Gre4ytaQiKS+G1A/TYC7gD0HzU/H3KU9rie/zOjBGkIvF301+TkIvoZYBkzGy; feature-flags=j%3A%7B%7D; session-id=677106490164044.5; edw=677106490164044.5; location=j%3A%7B%22ipDma%22%3A%22506%22%2C%22ipStateCode%22%3A%22MA%22%2C%22ipZipCode%22%3A%2201821%22%2C%22userIP%22%3A%2273.100.229.112%22%2C%22userSet%22%3Atrue%2C%22zipCode%22%3A%2202571%22%2C%22type%22%3A%22Standard%22%2C%22areaCode%22%3A%22508%2F774%22%2C%22timeZone%22%3A%22Eastern%22%2C%22gmtOffset%22%3A-5%2C%22dst%22%3A%221%22%2C%22latitude%22%3A41.748569%2C%22longitude%22%3A-70.710818%2C%22salesTax%22%3A0.0625%2C%22dma%22%3A%22506%22%2C%22dmaRank%22%3A10%2C%22stateCode%22%3A%22MA%22%2C%22city%22%3A%22Wareham%22%2C%22county%22%3A%22Plymouth%22%2C%22inPilotDMA%22%3Atrue%2C%22state%22%3A%22Massachusetts%22%7D; entry_url=www.edmunds.com%2Fsubaru%2Foutback%2F2019%2Fvin%2F4S4BSAFC5K3367774%2F; entry_page=model_car_inventory_vin_detail; entry_url_params=%7B%7D; edw=677106490164044.5; _edwvts=677106490164044.5; __carcode_7maoao_DEALER_OPEN_HOURS={"SALES":{"chatGreetingMessage":"Hi! What can I help you with today?","hasInventory":true,"enableAppraisalForm":false,"currentlyClosed":false}}; __carcode_7maoao_DEALER_OPEN_HOURS_EXPIRE=Wed%2C%2031%20Aug%202022%2020%3A54%3A35%20GMT; EdmundsYear="&zip=02571&dma=506:ZIP&city=Wareham&state=MA"; bm_sv=06E525A1E1175E8DBECACCF8D9AA7341~YAAQHLxuaNnHzdqCAQAAdOOJ9RD7toLp7r7mZmruxoGnaG+qqrluedT0pf+FTZCGX8EIVdtnPFOFeYZKXFPT6bmRAhzP02Vk5HbLH+e/aikumKowLAb2x2k9w7gmPOSfal5LXbUdVwYPyi4zPLZ4Mg15VhV7da/iyRZ92BIxzChxzP2MSqcf7v7gGVozLGUFTTbX/u632Zl82sTnCIToEpaWnTnYh79+62g/uGiguTU/yFQxKKoRYWJ/kGt2XG6xF64=~1';
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
