const create = async (params, credentials,user) => {
  try {
    let response = await fetch('/api/carts/by/'+params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
/*
const list = async (signal) => { 
try {
let response = await fetch('/api/carts/', { 
method: 'GET',

signal: signal, 
})
return await response.json() 
} catch(err) {
console.log(err) 
}
}*/
const list = async (signal) => {
  try {
    let response = await fetch('/api/carts/', { // Include the query parameter in the URL
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}



const read = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/carts/' + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
const update = async (params, credentials, user) => {
  try {
    let response = await fetch('/api/carts/' + params.userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/carts/' + params.userId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
export { create, list, read, update, remove }