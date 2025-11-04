import { useEffect, useState } from 'react'
import Cabecalho from './components/Cabecalho'
import './App.css'
import ListaLivros from "./components/ListaLivros"


function App() {
  const [livros, setLivros] = useState([])

  useEffect( () => {
    async function buscarLivros() {
      const resposta = await fetch("http://localhost:3000/livros")
      const dados = await resposta.json()
      setLivros(dados)
    }
    buscarLivros()
  }, [])


  return (
    <>  
      <Cabecalho />  
      <ListaLivros livros={livros} setLivros={setLivros} />
    </>
  )
}

export default App
