import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import App from './App.jsx'
import Inclusao from './Inclusao.jsx';
import Pesquisa from './Pesquisa.jsx';
import ComentariosLivro from './ComentariosLivro.jsx';

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "inclusao", Component: Inclusao },
  { path: "pesquisa", Component: Pesquisa },
  { path: "/comentarios/:livroId", Component: ComentariosLivro },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)