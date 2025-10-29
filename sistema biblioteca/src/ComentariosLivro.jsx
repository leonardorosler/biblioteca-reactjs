import { useParams } from "react-router"
import { useEffect, useState } from "react"
import './ComentariosLivro.css'
import { Estrelas } from "./components/Estrela"

function ComentariosLivro() {
  const { livroId } = useParams()
  const [livro, setLivro] = useState({})

  useEffect(() => {
    async function getLivro() {
      const response = await fetch(`http://localhost:3000/livros/${livroId}`)      
      const livro2 = await response.json()
      setLivro(livro2)
    }
    getLivro()
  }, [livroId])

  const listaComentarios = []
  if (livro.comentarios) {
    for (let i = 0; i < livro.comentarios.length; i++) {
      listaComentarios.push(
        <tr key={livro.comentarios[i]}>
          <td>{livro.nomes[i]}</td>
          <td>{livro.comentarios[i]}</td>
          <td><Estrelas num={livro.notas[i]} /></td>
        </tr>
      )
    }
  }

  return (
    <>
      <h1 className="titulo__comentario">Comentários sobre o Livro: {livro.titulo}</h1>

      <div className="comentarios">
        <img src={livro.imagem} alt="Capa do Livro" />
        <div>
          <h2>Comentários e Avaliações dos Usuários</h2>

          <table>
            <thead>
              <tr>
                <th>Nome do Usuário</th>
                <th>Comentário sobre o livro</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {listaComentarios}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ComentariosLivro