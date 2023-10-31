const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let goodCount = action.payload.good
      state = {...state, good: goodCount}
      return state
    case 'OK':
      let okCount =  action.payload.ok
      state = {...state, ok: okCount}
      return state
    case 'BAD':
      let badCount =  action.payload.bad
      state = {...state, bad: badCount}
      return state
    case 'ZERO':
      state = {...state, good:0, ok:0, bad:0}
      return state
    default: return state
  }
  
}

export default counterReducer
