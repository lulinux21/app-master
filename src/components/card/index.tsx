import { useState, useEffect } from "react";

import { JogosService } from "./../../service/JogosService";
import { Jogos } from "./../../types/Jogos";

import "./styles.css";

export const Card = () => {
  const [jogos, setJogos] = useState<Jogos[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

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
      {loading && <div className="loader"></div>}

      {jogos.map((jogo) => (
        <div className="card" key={jogo.id}>
          <img src={jogo.thumbnail} alt={jogo.title} />
          <div className="box-info">
            <h4 className="title">{jogo.title}</h4>
            <p className="description">{jogo.short_description}</p>
          </div>
        </div>
      ))}
    </>
  );
};
