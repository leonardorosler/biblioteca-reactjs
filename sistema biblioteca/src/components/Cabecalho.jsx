import { useNavigate } from 'react-router-dom';
import './Cabecalho.css'

export default function Cabecalho() {
  const navigate = useNavigate();
    return(
        <>
            <header className='cabecalho'>
                <div className="cabecalho__logo">
                    <img src="/livro-aberto.png" alt="Livro aberto" className='logo__livros'/>
                    <div className='titulo'>
                        <h1>Biblioteca Familiar</h1>
                        <p>Controle de livros lidos pelos membros da familia</p>
                    </div>
                </div>
            </header>
            <div className='botoes'>
                <button onClick={() => navigate('/')}>
                    <img src="home.png"/>Menu Principal
                </button>
                <button onClick={() => navigate('/pesquisa')}>
                    <img src="pesquisa.png"/>Pesquisar
                </button>
                <button onClick={() => navigate('/inclusao')}>
                    <img src="add.png"/>Adicionar Livro
                </button>
            </div>
            
        </>
    )
}