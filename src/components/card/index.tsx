import { useState, useEffect } from "react";

import { api } from "./../../service/Api";
import { Jogos } from "./../../types/Jogos";
import axios from "axios";

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
    try {
      setLoading(true);
      const response = await api.get("/data", {
        signal: AbortSignal.timeout(5000),
        headers: { "dev-email-address": "lucasgomes@appmasters.com" },
      });
      setLoading(false);
      setJogos(response?.data);
    } catch (error: any) {
      const statusErroServidor = [500, 502, 503, 504, 506, 507, 508, 509];
      const statusCode = error?.response?.status;
      const found = statusErroServidor.includes(statusCode);

      if (found) {
        alert("O servidor falhou em responder, tente recarregar a página");
        setLoading(false);
      }

      if (statusCode < 500 || statusCode >= 510) {
        alert(
          "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde"
        );
        setLoading(false);
      }

      if (axios.isCancel(error)) {
        alert("O servidor demorou para carregar, tente recarregar a página");
        setLoading(false);
      }
    }
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

      {loading && <div className="loader"></div>}

      {!loading && jogos.length > 0 && (
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
      )}

      {!loading && jogos.length === 0 && (
        <h1 className="title"> Recarregue a página</h1>
      )}
    </>
  );
};
