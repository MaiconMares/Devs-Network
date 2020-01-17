import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';
import './global.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [techs, setTechs] = useState('');
  const [github_username, setGithubUsername] = useState('');

  async function handleSaveDev(event) {
    event.preventDefault();
    /* Impede o comportamento padrão do formulário HTML que é redirecionar 
       para uma nova página quando o formulário terminar de ser preenchido */

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    })
    console.log(response.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        console.log(position.coords);

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 3000,
        //O 3º parâm. são condições extrar que eu posso passar para esta função
      }
    )
  }, []);

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleSaveDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
              name="github_username" 
              id="github_username" 
              value={github_username}
              onChange={ event => setGithubUsername(event.target.value) }
              required/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              value={techs}
              onChange={ event => setTechs(event.target.value) }
              required/>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                value={latitude} 
                onChange={ event => setLatitude(event.target.value) } 
                //Armazena o valor que o usuário digitar no estado dessa constante
                required/> 
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                value={longitude} 
                onChange={ event => setLongitude(event.target.value) }
                //Armazena o valor que o usuário digitar no estado dessa constante
                required/> 
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/47460478?s=460&v=4" alt="Maicon Mares"/>
              <div className="user-info">
                <strong>Maicon Mares</strong>
                <span>HTML, CSS, Javascript</span>
              </div>
            </header>
            <p>I'm passionate about all things involving technology. Software Engineering, UnB-FGA.
            </p>
            <a href="https://github.com/MaiconMares">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/47460478?s=460&v=4" alt="Maicon Mares"/>
              <div className="user-info">
                <strong>Maicon Mares</strong>
                <span>HTML, CSS, Javascript</span>
              </div>
            </header>
            <p>I'm passionate about all things involving technology. Software Engineering, UnB-FGA.
            </p>
            <a href="https://github.com/MaiconMares">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/47460478?s=460&v=4" alt="Maicon Mares"/>
              <div className="user-info">
                <strong>Maicon Mares</strong>
                <span>HTML, CSS, Javascript</span>
              </div>
            </header>
            <p>I'm passionate about all things involving technology. Software Engineering, UnB-FGA.
            </p>
            <a href="https://github.com/MaiconMares">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/47460478?s=460&v=4" alt="Maicon Mares"/>
              <div className="user-info">
                <strong>Maicon Mares</strong>
                <span>HTML, CSS, Javascript</span>
              </div>
            </header>
            <p>I'm passionate about all things involving technology. Software Engineering, UnB-FGA.
            </p>
            <a href="https://github.com/MaiconMares">Acessar perfil no Github</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
