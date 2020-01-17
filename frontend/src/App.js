import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Teste from'./Teste';

function App() {
  const [counter, setCounter] = useState(0);

  function incrementCounter() {
    setCounter(counter + 1);
  }

  function decrementCounter() {
    if (counter >= 1) {
      setCounter(counter - 1);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Teste title="Titulo1-Teste"/>
      <Teste title="Titulo2-Teste"/>
      <h2>Contador = {counter}</h2>
      <button onClick={incrementCounter}>Incrementar</button>
      <button onClick={decrementCounter}>Decrementar</button>
    </div>
  );
}

export default App;
