import { useState, useEffect } from "react";

import { JogosService } from "./../../service/JogosService";
import { Jogos } from "./../../types/Jogos";

import logo from "./../../assets/logo.svg";

import "./styles.css";

export const Card = () => {
  const [jogos, setJogos] = useState<Jogos[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [busca, setBusca] = useState<string>("");

  const lowerBusca = busca.toLowerCase();

  const jogosFiltrados = jogos.filter((jogo) =>
    jogo.title.toLowerCase().includes(lowerBusca)
  );

  useEffect(() => {
    loadJogos();
  }, []);

  const loadJogos = async () => {
    setLoading(true);
    let json = await JogosService.getJogosData();
    setJogos(json);
    setLoading(false);
  };
  return (
    <>
      <div className="container filter">
        <div className="logo">
          <a href="https://www.appmasters.io/pt">
            <img className="logo" src={logo} alt="Logo app masters" />
          </a>
        </div>
        <div className="filters">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquise um jogo..."
          />
        </div>
      </div>

      {loading ? <div className="loader"></div> : null}

      {!loading && jogos.length > 0 ? (
        <>
          {jogosFiltrados.map((jogo) => (
            <div className="card" key={jogo.id}>
              <img src={jogo.thumbnail} alt={jogo.title} />
              <div className="box-info">
                <h4 className="title">{jogo.title}</h4>
                <p className="description">
                  {jogo.short_description + jogo.genre}
                </p>
              </div>
            </div>
          ))}
        </>
      ) : null}

      {!loading && jogos.length === 0 ? (
        <div className="container filter">
          <div className="logo">
            <a href="https://www.appmasters.io/pt">
              <img className="logo" src={logo} alt="Logo app masters" />
            </a>
          </div>
          <div className="filters">
            <input type="text" placeholder="Pesquise um jogo..." />
          </div>
        </div>
      ) : null}
    </>
  );
};
