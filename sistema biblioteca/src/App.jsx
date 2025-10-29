import { useEffect, useState } from 'react'
import Cabecalho from './components/Cabecalho'
import './App.css'
import ListaLivros from "./components/ListaLivros"


function App() {
  // const [livrosOriginais, setLivrosOriginais] = useState ([])
  const [livros, setLivros] = useState([])

  useEffect( () => {
    async function buscarLivros() {
      const resposta = await fetch("http://localhost:3000/livros")
      const dados = await resposta.json()
      setLivros(dados)
      // setLivrosOriginais(dados)
    }
    buscarLivros()
  }, [])

  const listaLivros = livros.map( livro => (
    <div className="containerLivros">
      <div className='cardLivro' key={livro.id}>
      <img src={livro.imagem} alt="Capa do Livro" className='capalivro'/>
      <div>
        <h2>{livro.titulo}</h2>
        <h3>{livro.genero}</h3>
        <h4>Ano de Lançamento: {livro.ano}</h4>
        <h4>Editora: {livro.editora}</h4>
      </div>
    </div>
    </div>
  ))

  return (
    <>  
      <Cabecalho />  
      <ListaLivros livros={livros} setLivros={setLivros} />
    </>
  )
}

export default App
