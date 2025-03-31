import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import GeneroList from './pages/GeneroList';
import DirectorList from './pages/DirectorList';
import ProductoraList from './pages/ProductoraList';
import TipoList from './pages/TipoList';
import MediaList from './pages/MediaList';

function App() {
  return (
    <Router>
      <div className="container">
        {/* Barra de navegación */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <Link className="navbar-brand" to="/">Películas App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/generos">Géneros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/directores">Directores</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productoras">Productoras</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tipos">Tipos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/medias">Medias</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Rutas */}
        <Switch>
          <Route path="/generos">
            <GeneroList />
          </Route>
          <Route path="/directores">
            <DirectorList />
          </Route>
          <Route path="/productoras">
            <ProductoraList />
          </Route>
          <Route path="/tipos">
            <TipoList />
          </Route>
          <Route path="/medias">
            <MediaList />
          </Route>
          <Route path="/">
            <h1>Bienvenido a la App de Películas</h1>
            <p>Selecciona un módulo en la barra de navegación para comenzar.</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
