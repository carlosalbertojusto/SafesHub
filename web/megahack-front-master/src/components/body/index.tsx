import React, { useState, useEffect, ChangeEvent } from 'react';
import { FiSearch} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
    FeatureGroup,
    Map,
    Popup,
    TileLayer,
    Marker
  } from 'react-leaflet';
import banner from '../../assets/65932.jpg';

import './style.css';

interface IBGEUFResponse{
    sigla: string;
}

interface IBGECityResponse{
    nome: string;
}

const Body = () => {

    const history = useHistory();

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position =>{
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        });
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);

            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        //carregar as cidades sempre que a UF mudar
        if(selectedUf === '0'){
            return;
        }

        axios
            .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
            const cityNames = response.data.map(city => city.nome);

            setCities(cityNames);
        });
    }, [selectedUf]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;

        setSelectedCity(city);
    }

    function handleNavigationToPoints(){
        const uf = selectedUf;
        const city = selectedCity;

        history.push('/', {
            uf,
            city,
        });
      }

 return (
    <>
        <div className="image">
            <img src={banner} className="bannerImg" alt="Banner Safe's Hub"/>
        </div>
        <h2 className="title">Procure o Hub mais próximo de você</h2>
        <div className="selectContainer">
            <div className="div-select">
                <select 
                    name="uf" 
                    id="uf" 
                    value={selectedUf} 
                    onChange={handleSelectUf}>
                    <option  >Selecione uma UF</option>
                    {ufs.map(uf => (
                        <option key={uf} value={uf}>{uf}</option>
                    ))}
                </select> 
            </div>
            <div className="div-select2">
                <select 
                    name="city" 
                    id="city"
                    value={selectedCity}
                    onChange={handleSelectCity}>
                    <option value="0">Selecione uma cidade</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <button className="iconContainer" onClick={handleNavigationToPoints}>Buscar <FiSearch /></button>

        </div>
        <Map center={[-23.6060508,-46.6853005]} zoom={10}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          <FeatureGroup >
            <Popup>
                  Hub Avenida Paulista <br/>
                  CEP: 01418-100<br/>
                  UF: SP<br/>
                  Cidade: São Paulo<br/>
                  Bairro: Alameda Santos<br/>
                  Rua: Alameda Santos<br/>
                  Número: Alameda Santos<br/>
            </Popup>
            <Marker position={[-23.5632858,-46.6553875]}/>
          </FeatureGroup>

          <FeatureGroup >
            <Popup>
                  Hub Avenida Brigadeiro Faria Lima <br/>
                  CEP: 05427-001<br/>
                  UF: SP<br/>
                  Cidade: São Paulo<br/>
                  Bairro: Pinheiros<br/>
                  Rua:  Fernão Dias<br/>
                  Número: 682<br/>
            </Popup>
            <Marker position={[-23.567083,-46.6961792]}/>
          </FeatureGroup>

          <FeatureGroup >
            <Popup>
                  Hub Leroy Merlin Jaguaré <br/>
                  CEP: 05348-000<br/>
                  UF: SP<br/>
                  Cidade: São Paulo<br/>
                  Bairro: Jaguaré<br/>
                  Rua:  Av. Gonçalo Madeira<br/>
                  Número: 100<br/> 
            </Popup>
            <Marker position={[-23.5405554,-46.7542873]}/>
          </FeatureGroup>
      </Map>
    </>
 );
}

export default Body;