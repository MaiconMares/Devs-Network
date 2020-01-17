import  React, { useState, useEffect } from 'react';
import './style.css';

function DevForm({ onSubmit }) {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [techs, setTechs] = useState('');
    const [github_username, setGithubUsername] = useState('');

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

    async function handleSubmit(event) {
        event.preventDefault();
        /* Impede o comportamento padrão do formulário HTML que é redirecionar 
           para uma nova página quando o formulário terminar de ser preenchido */

        await onSubmit(
            github_username,
            techs,
            latitude,
            longitude
        );

        setGithubUsername('');
        setTechs('');
    };

    return (
        <form onSubmit={handleSubmit}>
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
    );
}

export default DevForm;