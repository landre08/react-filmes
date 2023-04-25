import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import './filme-info.css';
import api from '../../services/api';

function Filme() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFime() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "34ec1e0be0a6b6493e6a8cb227bb8d1c",
          language: "pt-BR"
        }
      })
      .then((response) => {
        setFilme(response.data)
        setLoading(false)
      })
      .catch(() => {
        navigate('/', {replace: true})
        return
      })
    }

    loadFime();

    return () => {
      console.log('Componente foi desmonntado')
    }
  }, [navigate, id])


  function salvarFilme() {
    const minhaLista = localStorage.getItem('@primeflix');

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id == filme.id)

    if (hasFilme) {
      toast.warning('Esse filme já está na lista')
      return
    }

    filmesSalvos.push(filme)
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
    toast.success('Filme salvo com sucesso')
  }

  if (loading) {
    return(
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

    return (
      <div className="filme-info">
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} />

        <h3>Sinope</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação: {filme.vote_average} / 10</strong>

        <div className="area-buttons">
          <button onClick={salvarFilme}>Salvar</button>
          <button>
            <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
              Trailer
            </a>
          </button>
        </div>

      </div>
    );
  }
  
  export default Filme;
  