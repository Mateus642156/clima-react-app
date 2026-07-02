import {useState} from "react";


const Clima = () => {
const [cidade, setCidade] = useState("");
const [clima, setClima] = useState(null);

      const buscarClima = async () => {
        
          if(!cidade) {
            alert("Digite o nome da cidade");
          }

          try {
             const resposta = await fetch(`https://api.openWeatherMap.org/data/2.5/weather?q=${cidade}&appid=7b6bcad48a46eba5a18e5a2dd17d7a54&units=metric&lang=pt_br`);
             
                if(!resposta.ok) {
                    throw new Error("Erro ao buscar clima");
                }

                const dados = await resposta.json();

                setClima({
                    nome: dados.name,
                    temperatura: dados.main.temp,
                    descricao: dados.weather[0].description,
                    umidade: dados.main.humidity,
                    velocidadeVento: dados.wind.speed,

                });


          } catch (error) {
            
            alert(error.message);
            setClima(null);
          }
        
      }




  return (

       <div>
            <input
                type="text"
                placeholder="Digite o nome da cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                />
    <button onClick={buscarClima}>Buscar</button>
                

                {clima && (
                     <div>
                        <h2>Clima em {clima.nome}</h2>
                        <p>🌡️ Temperatura: {clima.temperatura}°C</p>
                        <p>☁️ Clima: {clima.descricao}</p>
                        <p>💧 Umidade: {clima.umidade}%</p>
                        <p>💨 Velocidade do vento: {clima.velocidadeVento} m/s</p>

                     </div>
                )}
       </div>
       
  )
}

export default Clima