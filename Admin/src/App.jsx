import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import Employees from './pages/Employees';
import Documents from './pages/Documents';
import SeleccionarEmpresaView from './pages/SeleccionarEmpresaView';
import Repository from './pages/Repository';
import UsuarioDocumentos from './pages/UsuarioDocumentos';
import ResponderEvaluacionPage from './pages/ResponderEvaluacionPage';
import Settings from './pages/Settings';
import { initialCompanies } from './data/companiesData';
import { initialEmployees } from './data/employeesData';
import { initialEstablecimientosSalud } from './data/establecimientosSaludData';
import { initialProfesionales } from './data/profesionalesData';
import { mockDocuments } from './data/mockDocuments';
import EstablecimientosSalud from './pages/EstablecimientosSalud';
import Profesionales from './pages/Profesionales';
import Capacitaciones from './pages/Capacitaciones';
import Evaluaciones from './pages/Evaluaciones';
import EnviarEvaluacionPage from './pages/EnviarEvaluacionPage';
import SeguimientoEvaluacion from './pages/SeguimientoEvaluacion';
import ControlResultados from './pages/ControlResultados';
import Anexo1 from './pages/Anexo1';
import GestionAnexo1 from './pages/GestionAnexo1';
import EditorAnexo1 from './pages/EditorAnexo1';
import AnalisisAnexo1 from './pages/AnalisisAnexo1';
import DocumentosInSitu from './pages/DocumentosInSitu';
import HistoricoAnexo1 from './pages/HistoricoAnexo1';
import TareasAnexo1 from './pages/TareasAnexo1';
import EmpresaView from './pages/EmpresaView';
import EmpresaAnexo1View from './pages/EmpresaAnexo1View';
import EmpresaAnexo1Estado from './pages/EmpresaAnexo1Estado';
import EmpresaRepositorio from './pages/EmpresaRepositorio';
import EmpresaFormulariosDinamicos from './pages/EmpresaFormulariosDinamicos';

function App() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [employees, setEmployees] = useState(initialEmployees);
  const [establecimientos, setEstablecimientos] = useState(initialEstablecimientosSalud);
  const [profesionales, setProfesionales] = useState(initialProfesionales);
  const [documents, setDocuments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Componente para rutas protegidas (admin)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser || currentUser.tipo !== 'admin') {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Componente para rutas de usuario
  const UserRoute = ({ children }) => {
    if (!currentUser || currentUser.tipo !== 'user') {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route 
          path="/login" 
          element={
            currentUser ? (
              currentUser.tipo === 'admin' ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/usuario/documentos" replace />
              )
            ) : (
              <Login 
                employees={employees} 
                onLogin={handleLogin}
              />
            )
          } 
        />

        {/* Rutas protegidas */}
        {currentUser?.tipo === 'admin' ? (
          <Route
            path="/*"
            element={
              <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 transition-all duration-300" style={{ marginLeft: '60px' }}>
                  <Header currentUser={currentUser} onLogout={handleLogout} />
                  <main className="mt-16 p-6">
                    <Routes>
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute>
                            <Dashboard 
                              companies={companies}
                              employees={employees}
                              documents={documents}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/companies" 
                        element={
                          <ProtectedRoute>
                            <Companies 
                              companies={companies}
                              setCompanies={setCompanies}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      {/* Rutas anidadas bajo /empresas/:empresaId */}
                      <Route 
                        path="/empresas/:empresaId" 
                        element={
                          <ProtectedRoute>
                            <EmpresaView companies={companies} />
                          </ProtectedRoute>
                        } 
                      >
                        <Route 
                          index
                          element={
                            <div className="bg-white rounded-lg shadow-md p-6">
                              <h2 className="text-xl font-bold text-gray-800 mb-4">Información General</h2>
                              <p className="text-gray-600">Selecciona una pestaña para ver más información</p>
                            </div>
                          } 
                        />
                        <Route 
                          path="trabajadores" 
                          element={
                            <ProtectedRoute>
                              <Employees 
                                employees={employees}
                                setEmployees={setEmployees}
                                companies={companies}
                              />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="establecimientos" 
                          element={
                            <ProtectedRoute>
                              <EstablecimientosSalud 
                                establecimientos={establecimientos}
                                setEstablecimientos={setEstablecimientos}
                              />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="profesionales" 
                          element={
                            <ProtectedRoute>
                              <Profesionales 
                                profesionales={profesionales}
                                setProfesionales={setProfesionales}
                              />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="repositorio" 
                          element={
                            <ProtectedRoute>
                              <EmpresaRepositorio companies={companies} />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="formularios" 
                          element={
                            <ProtectedRoute>
                              <EmpresaFormulariosDinamicos companies={companies} employees={employees} />
                            </ProtectedRoute>
                          } 
                        />
                        {/* Rutas anidadas bajo /empresas/:empresaId/anexo1 */}
                        <Route 
                          path="anexo1" 
                          element={
                            <ProtectedRoute>
                              <EmpresaAnexo1View companies={companies} />
                            </ProtectedRoute>
                          } 
                        >
                          <Route 
                            index
                            element={
                              <EmpresaAnexo1Estado companies={companies} />
                            } 
                          />
                          <Route 
                            path="estado" 
                            element={
                              <EmpresaAnexo1Estado companies={companies} />
                            } 
                          />
                          <Route 
                            path="checklist" 
                            element={
                              <EditorAnexo1 companies={companies} />
                            } 
                          />
                          <Route 
                            path="tareas" 
                            element={
                              <ProtectedRoute>
                                <TareasAnexo1 companies={companies} />
                              </ProtectedRoute>
                            } 
                          />
                          <Route 
                            path="documentos-requeridos" 
                            element={
                              <EmpresaRepositorio companies={companies} />
                            } 
                          />
                          <Route 
                            path="documentos-in-situ" 
                            element={
                              <ProtectedRoute>
                                <DocumentosInSitu companies={companies} />
                              </ProtectedRoute>
                            } 
                          />
                          <Route 
                            path="historial" 
                            element={
                              <ProtectedRoute>
                                <HistoricoAnexo1 companies={companies} />
                              </ProtectedRoute>
                            } 
                          />
                          <Route 
                            path="analitica" 
                            element={
                              <ProtectedRoute>
                                <AnalisisAnexo1 companies={companies} />
                              </ProtectedRoute>
                            } 
                          />
                        </Route>
                      </Route>
                      <Route 
                        path="/employees" 
                        element={
                          <ProtectedRoute>
                            <Employees 
                              employees={employees}
                              setEmployees={setEmployees}
                              companies={companies}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/establecimientos-salud" 
                        element={
                          <ProtectedRoute>
                            <EstablecimientosSalud 
                              establecimientos={establecimientos}
                              setEstablecimientos={setEstablecimientos}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/profesionales" 
                        element={
                          <ProtectedRoute>
                            <Profesionales 
                              profesionales={profesionales}
                              setProfesionales={setProfesionales}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/capacitaciones" 
                        element={
                          <ProtectedRoute>
                            <Capacitaciones 
                              companies={companies}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/evaluaciones" 
                        element={
                          <ProtectedRoute>
                            <Evaluaciones 
                              companies={companies}
                              employees={employees}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/evaluaciones/enviar/:evaluacionId" 
                        element={
                          <ProtectedRoute>
                            <EnviarEvaluacionPage 
                              companies={companies}
                              employees={employees}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/evaluaciones/seguimiento/:evaluacionId" 
                        element={
                          <ProtectedRoute>
                            <SeguimientoEvaluacion 
                              companies={companies}
                              employees={employees}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/control-resultados" 
                        element={
                          <ProtectedRoute>
                            <ControlResultados 
                              employees={employees}
                              companies={companies}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/documents" 
                        element={
                          <ProtectedRoute>
                            <SeleccionarEmpresaView 
                              companies={companies}
                              employees={employees}
                              profesionales={profesionales}
                              mockDocuments={mockDocuments}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/formularios/crear" 
                        element={
                          <ProtectedRoute>
                            <Documents 
                              companies={companies}
                              employees={employees}
                              establecimientos={establecimientos}
                              profesionales={profesionales}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/formularios/lista" 
                        element={<Navigate to="/documents" replace />} 
                      />
                      <Route 
                        path="/repository" 
                        element={
                          <ProtectedRoute>
                            <Repository 
                              documents={documents}
                              setDocuments={setDocuments}
                              companies={companies}
                              employees={employees}
                            />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/anexo1" 
                        element={
                          <ProtectedRoute>
                            <Anexo1 />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/anexo1/gestion" 
                        element={
                          <ProtectedRoute>
                            <GestionAnexo1 companies={companies} />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/anexo1/editor/:empresaId" 
                        element={
                          <ProtectedRoute>
                            <EditorAnexo1 companies={companies} />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/anexo1/editor/:empresaId/:anexoId" 
                        element={
                          <ProtectedRoute>
                            <EditorAnexo1 companies={companies} />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/anexo1/analisis/:empresaId/:anexoId" 
                        element={
                          <ProtectedRoute>
                            <AnalisisAnexo1 companies={companies} />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/anexo1/documentos/:empresaId" 
                        element={
                          <ProtectedRoute>
                            <DocumentosInSitu companies={companies} />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/anexo1/historico/:empresaId" 
                        element={
                          <ProtectedRoute>
                            <HistoricoAnexo1 companies={companies} />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/anexo1/tareas" 
                        element={
                          <ProtectedRoute>
                            <TareasAnexo1 companies={companies} />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/settings" 
                        element={
                          <ProtectedRoute>
                            <Settings />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/" 
                        element={<Navigate to="/dashboard" replace />}
                      />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
        ) : currentUser?.tipo === 'user' ? (
          <Route
            path="/*"
            element={
              <div className="min-h-screen bg-gray-100">
                <Header currentUser={currentUser} onLogout={handleLogout} isUserView={true} />
                <main className="mt-16 p-6">
                  <Routes>
                    <Route 
                      path="/usuario/documentos" 
                      element={
                        <UserRoute>
                          <UsuarioDocumentos 
                            user={currentUser}
                            documents={documents}
                            mockDocuments={mockDocuments}
                          />
                        </UserRoute>
                      } 
                    />
                    <Route 
                      path="/usuario/evaluacion/:evaluacionId/:respuestaId" 
                      element={
                        <UserRoute>
                          <ResponderEvaluacionPage user={currentUser} />
                        </UserRoute>
                      } 
                    />
                    <Route 
                      path="/*" 
                      element={<Navigate to="/usuario/documentos" replace />}
                    />
                  </Routes>
                </main>
              </div>
            }
          />
        ) : (
          <Route path="/*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

