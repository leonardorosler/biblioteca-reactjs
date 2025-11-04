import { useForm } from "react-hook-form";
import Cabecalho from "./components/Cabecalho";
import { useEffect, useState } from 'react'
import './Pesquisa.css'
import ListaLivros from "./components/ListaLivros";

export default function Pesquisa() {
    const { register, handleSubmit, reset } = useForm()
    const [livrosOriginais, setLivrosOriginais] = useState([])
    const [livros, setLivros] = useState([])

    async function pesquisaLivro(data) {
        const nomeLivro = data.nomeLivro
        const livrosFiltrados = livrosOriginais.filter(livro =>
            livro.titulo.toLowerCase().includes(nomeLivro.toLowerCase())
        )
        setLivros(livrosFiltrados)
        reset()
    }

    useEffect(() => {
        async function buscarLivros() {
            const resposta = await fetch("http://localhost:3000/livros")
            const dados = await resposta.json()
            setLivros(dados)
            setLivrosOriginais(dados)
        }
        buscarLivros()
    }, [])


    return (
        <>
            <Cabecalho />
            <div className="pesquisaLivros">
                <h1><img src="search-lilas.png" className="lupa" /> Pesquisa de Livros</h1>
                <form onSubmit={handleSubmit(pesquisaLivro)}>
                    <p>
                        <label>Digite o nome do Livro:</label>
                        <input type="text"  {...register("nomeLivro")} required />
                    </p>
                    <div className="botoes__pesquisa">
                        <button type='submit'>Pesquisar</button>
                        <button type='button' onClick={() => setLivros(livrosOriginais)}>Limpar Pesquisa</button>
                    </div>
                </form>
            </div>
            <ListaLivros livros={livros} setLivros={setLivros} />
        </>
    )
}