import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    let good_ = store.getState().good
    good_ = ++good_
    store.dispatch({
      type: 'GOOD',
      payload:{
        good: good_
      }
    })
  }

  const ok = () => {
    let ok_ = store.getState().ok
    ok_ = ++ok_
    store.dispatch({
      type: 'OK',
      payload:{
        ok: ok_
      }
    })
  }

  const bad = () => {
    let bad_ = store.getState().bad
    bad_ = ++bad_
    store.dispatch({
      type: 'BAD',
      payload:{
        bad: bad_
      }
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }



  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
