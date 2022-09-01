

export const addCarToDB = (sessionId, payload) => {
  const postUrl = `http://localhost:3000/session/${sessionId}/${payload.vin}`
  console.log('about to post car to DB', {postUrl});
  return fetch(postUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then((r) => console.log('hi mom', r))
  .catch()
}

export const deleteCarFromDB = (sessionId, vin) => {
  return fetch(`http://localhost:3000/session/${sessionId}/${vin}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log('car deleted from db');
    console.log({response})
  })
  .catch()
}

export const getCarsForSessionId = (sessionId) => {
  return fetch(`http://localhost:3000/session/${sessionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(data => data.json())
  .then(data => {
    console.log(data)
    return data
  })
  .catch(() => []); 
}