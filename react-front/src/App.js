// App.js is a wrapper component for the whole application
// It is rendered in the index.js
import React from 'react';
import {BrowserRouter} from  'react-router-dom'
import MainRouter  from './MainRouter'


const App = () => (
  <BrowserRouter>
      <MainRouter/>
  </BrowserRouter>

)

export default App;
