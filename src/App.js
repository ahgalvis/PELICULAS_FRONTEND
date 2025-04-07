import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import GeneroList from './pages/GeneroList';
import DirectorList from './pages/DirectorList';
import ProductoraList from './pages/ProductoraList';
import TipoList from './pages/TipoList';
import MediaList from './pages/MediaList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <div
        style={{
          backgroundImage: `url(/images/movie-background.jpg)`, // Imagen de fondo
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Cubre toda la pantalla
          color: '#fff', // Texto blanco para que contraste con el fondo
          fontFamily: "'Poppins', sans-serif", // Fuente moderna
        }}
      >
        {/* Barra de navegación */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffcc00' }}>
                🌌 Galaxia Films
              </span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/generos"
                    style={{
                      transition: 'color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.target.style.color = '#ffcc00')}
                    onMouseOut={(e) => (e.target.style.color = '#fff')}
                  >
                    Géneros
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/directores"
                    style={{
                      transition: 'color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.target.style.color = '#ffcc00')}
                    onMouseOut={(e) => (e.target.style.color = '#fff')}
                  >
                    Directores
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/productoras"
                    style={{
                      transition: 'color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.target.style.color = '#ffcc00')}
                    onMouseOut={(e) => (e.target.style.color = '#fff')}
                  >
                    Productoras
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/tipos"
                    style={{
                      transition: 'color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.target.style.color = '#ffcc00')}
                    onMouseOut={(e) => (e.target.style.color = '#fff')}
                  >
                    Tipos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/medias"
                    style={{
                      transition: 'color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.target.style.color = '#ffcc00')}
                    onMouseOut={(e) => (e.target.style.color = '#fff')}
                  >
                    Medias
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Contenido principal */}
        <div className="container mt-5 text-center">
          <Switch>
            <Route exact path="/">
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.85)', // Fondo más oscuro para mejor legibilidad
                  padding: '3rem',
                  borderRadius: '15px',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Sombra para un efecto elevado
                }}
              >
                <h1
                  className="display-4 mb-3"
                  style={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                >
                  Galaxia Films
                </h1>
                <p className="lead mb-4" style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
                  Películas IU Digital de Antioquia.
                </p>
                {/* Carrusel de películas destacadas */}
                <div
                  id="movieCarousel"
                  className="carousel slide mb-4"
                  data-bs-ride="carousel"
                  style={{ backgroundColor: '#1a1a1a', borderRadius: '10px' }}
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                      <div className="row align-items-center">
                        {/* Columna izquierda: Título y descripción */}
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                          <div className="text-start">
                            <h5 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                              Dune
                            </h5>
                            <p style={{ fontSize: '1rem' }}>
                              Se ha convertido en el planeta más importante del universo.
                            </p>
                          </div>
                        </div>
                        {/* Columna derecha: Imagen */}
                        <div className="col-md-6">
                          <img
                            src="/images/Dune.jpg"
                            className="d-block w-100"
                            alt="Dune"
                            style={{ height: '300px', objectFit: 'contain' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                      <div className="row align-items-center">
                        {/* Columna izquierda: Título y descripción */}
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                          <div className="text-start">
                            <h5 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                              Inception
                            </h5>
                            <p style={{ fontSize: '1rem' }}>
                              Un thriller de ciencia ficción de Christopher Nolan.
                            </p>
                          </div>
                        </div>
                        {/* Columna derecha: Imagen */}
                        <div className="col-md-6">
                          <img
                            src="/images/Inception.jpg"
                            className="d-block w-100"
                            alt="Inception"
                            style={{ height: '300px', objectFit: 'contain' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                      <div className="row align-items-center">
                        {/* Columna izquierda: Título y descripción */}
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                          <div className="text-start">
                            <h5 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                              The Godfather
                            </h5>
                            <p style={{ fontSize: '1rem' }}>
                              Un drama épico de Francis Ford Coppola.
                            </p>
                          </div>
                        </div>
                        {/* Columna derecha: Imagen */}
                        <div className="col-md-6">
                          <img
                            src="/images/The Godfather.jpg"
                            className="d-block w-100"
                            alt="The Godfather"
                            style={{ height: '300px', objectFit: 'contain' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#movieCarousel"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#movieCarousel"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </Route>
            <Route path="/generos" component={GeneroList} />
            <Route path="/directores" component={DirectorList} />
            <Route path="/productoras" component={ProductoraList} />
            <Route path="/tipos" component={TipoList} />
            <Route path="/medias" component={MediaList} />
          </Switch>
        </div>

        {/* Footer */}
        <footer className="bg-dark text-light text-center py-3 mt-5">
          <p className="mb-0">© 2025 Galaxia Films - IU Digital de Antioquia. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;