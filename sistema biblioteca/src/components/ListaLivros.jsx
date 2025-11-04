import './ListaLivros.css';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
import { Estrelas } from './Estrela';
import { Link } from 'react-router';

const MySwal = withReactContent(Swal);

export default function ListaLivros({ livros, setLivros }) {
  const { register, handleSubmit, reset } = useForm();

  // ---- Função para enviar avaliação ----
  async function enviarComentario(data, livro) {
    const { nome, comentario, nota } = data;

    // Atualiza o objeto do livro com as novas informações
    const livroAlterado = {
      ...livro,
      nomes: [...livro.nomes, nome],
      comentarios: [...livro.comentarios, comentario],
      notas: [...livro.notas, Number(nota)]
    };

    try {
      const resposta = await fetch(`http://localhost:3000/livros/${livro.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(livroAlterado),
      });

      if (!resposta.ok) throw new Error("Erro ao incluir avaliação...");

      // Mensagem de sucesso
      MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "Ok! Avaliação cadastrada com sucesso",
        showConfirmButton: false,
        timer: 1500,
      });

      // Atualiza lista de livros no estado
      if (setLivros) {
        const respostaLista = await fetch("http://localhost:3000/livros");
        const dados = await respostaLista.json();
        setLivros(dados);
      }
    } catch (erro) {
      console.error("Erro: " + erro.message);
      MySwal.fire({ icon: 'error', title: 'Problema ao enviar avaliação' });
    }

    reset(); // limpa os campos do formulário
  }

  // ---- Abre a janela de avaliação ----
  function avaliarLivro(e, livro) {
    e.preventDefault(); // impede o <Link> de navegar
    e.stopPropagation();

    MySwal.fire({
      title: <span style={{ fontFamily: "Arial" }}>Avaliação: {livro.titulo}</span>,
      html: (
        <form
          onSubmit={handleSubmit((data) => enviarComentario(data, livro))}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <input type="text" placeholder="Seu nome"
            className="swal2-input" style={{ width: 300 }}
            required {...register("nome")}
          />
          <input type="text" placeholder="Comentário"
            className="swal2-input" style={{ width: 300 }}
            required {...register("comentario")}
          />
          <input type="number" placeholder="Nota (1 a 5)"
            className="swal2-input" style={{ width: 300 }}
            min="1" max="5" required {...register("nota")}
          />
          {/* Botão realmente envia esse form */}
          <button type="submit" className="swal2-confirm swal2-styled" style={{ marginTop: "12px" }}>
            Enviar
          </button>
        </form>
      ),
      showConfirmButton: false,
    });
  }

  function calculaMedia(livro) {
    const notas = livro.notas || [];
    if (notas.length === 0) return 0;
    const soma = notas.reduce((s, n) => s + n, 0);
    return soma / notas.length;
  }

  return (
    <div className='listaCards'>
      {livros.map(livro => (
        <div className="containerLivros" key={livro.id}>
          <Link to={`/comentarios/${livro.id}`} className="cardLivro-link">
            <div className='cardLivro'>
              <img src={livro.imagem} alt={`Capa do livro ${livro.titulo}`} className='capalivro' />
              <div>
                <h2>{livro.titulo}</h2>
                <h3>{livro.genero}</h3>
                <h4>Ano de Lançamento: {livro.ano}</h4>
                <h4>Editora: {livro.editora}</h4>
                <div>
                  {(livro.notas && livro.notas.length > 0) ? (
                    <div className="avaliacao-container">
                      <strong>Avaliação:</strong>
                      <Estrelas num={calculaMedia(livro)} />
                      <span className="media-texto">
                        ({livro.notas.length} {livro.notas.length === 1 ? 'avaliação' : 'avaliações'})
                      </span>
                    </div>
                  ) : <em>Sem avaliações ainda</em>}
                </div>
              </div>
            </div>
          </Link>
          {/* IMPORTANTE: Botão fora do <Link> */}
          <button className="btn-avaliar" onClick={(e) => avaliarLivro(e, livro)}>
            Avaliar
          </button>
        </div>
      ))}
    </div>
  );
}
