import React, { useState, useEffect } from 'react';
import api from './services/api';
import DevItem from './components/DevItem/index';
import DevForm from './components/DevForm/index';
import './App.css';
import './global.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(()=> {
    async function mostrarDevs() {
      const response = await api.get('/devs_show');

      setDevs(response.data);
    }
    mostrarDevs();
  }, []);

  async function handleSaveDev(data) {

    const response = await api.post('/dev_save',{ data });
    console.log(response.data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSaveDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
