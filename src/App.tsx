import { useState, useEffect } from "react";
import "./App.css";
import { api } from "./api";

function App() {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    loadJogos();
  }, []);

  const loadJogos = async () => {
    setLoading(true);
    let json = await api.getAllData();
    setData(json);
    setLoading(false);
  };

  return (
    <div className="p-5">
      {loading && <div>Carregando...</div>}

      {!loading && data.length > 0 && (
        <>
          <div>Total de data: {data.length}</div>

          <div>
            {data.map((item) => (
              <h1 key={item.id}>{item.title}</h1>
            ))}
          </div>
        </>
      )}

      {!loading && data.length === 0 && <div>Não há Posts para exibir.</div>}
    </div>
  );
}

export default App;
