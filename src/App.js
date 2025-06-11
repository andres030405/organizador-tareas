// Importamos hooks de React
import { useState, useEffect } from "react";

function App() {
  // Estados para la lista de tareas, nombre del responsable, descripción y reloj
  const [tareas, setTareas] = useState([]);
  const [responsable, setResponsable] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [reloj, setReloj] = useState(new Date());

  // useEffect para actualizar el reloj cada segundo
  useEffect(() => {
    const timer = setInterval(() => setReloj(new Date()), 1000);
    return () => clearInterval(timer); // Limpiar el intervalo al desmontar
  }, []);

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    // Verifica que los campos no estén vacíos
    if (responsable.trim() === "" || descripcion.trim() === "") return;

    // Crear el objeto tarea
    const nuevaTarea = {
      responsable,
      texto: descripcion,
      completada: false,
      fecha: new Date().toLocaleString(), // Fecha y hora actual
    };

    // Agregarla al estado de tareas
    setTareas([...tareas, nuevaTarea]);
    setResponsable(""); // Limpiar inputs
    setDescripcion("");
  };

  // Cambiar el estado de completada/no completada
  const toggleCompleta = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setTareas(nuevasTareas);
  };

  // Eliminar una tarea del listado
  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  // Separar las tareas según su estado
  const tareasPendientes = tareas.filter((t) => !t.completada);
  const tareasCompletadas = tareas.filter((t) => t.completada);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/fondo.jpg')" }} // Fondo de la app
    >
      <div className="bg-black bg-opacity-70 min-h-screen px-4 py-8">
        {/* Encabezado con título y reloj */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            GESTOR DE TAREAS DOMÉSTICAS
          </h1>
          <p className="text-sm text-gray-300">{reloj.toLocaleString()}</p>
        </header>

        {/* Formulario para ingresar nueva tarea */}
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Registrar nueva tarea
          </h2>
          <input
            type="text"
            placeholder="Nombre del responsable"
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="text"
            placeholder="Descripción de la tarea"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
          />
          <button
            onClick={agregarTarea}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Agregar tarea
          </button>
        </div>

        {/* Lista de tareas pendientes */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">Tareas Pendientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tareasPendientes.length === 0 ? (
              <p className="text-gray-300 col-span-full text-center">No hay tareas pendientes</p>
            ) : (
              tareasPendientes.map((t, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg shadow flex flex-col justify-between"
                >
                  <div>
                    <p className="text-lg mb-2">{t.texto}</p>
                    <p className="text-sm text-gray-600 mb-1">
                      Responsable: <strong>{t.responsable}</strong>
                    </p>
                    <span className="text-xs text-gray-400">{t.fecha}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => toggleCompleta(i)}
                      className="px-2 py-1 rounded bg-green-500 text-white text-sm w-full"
                    >
                      Completar
                    </button>
                    <button
                      onClick={() => eliminarTarea(i)}
                      className="px-2 py-1 rounded bg-red-500 text-white text-sm w-full"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Lista de tareas completadas */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Tareas Completadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tareasCompletadas.length === 0 ? (
              <p className="text-gray-300 col-span-full text-center">No hay tareas completadas</p>
            ) : (
              tareasCompletadas.map((t, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg shadow flex flex-col justify-between"
                >
                  <div>
                    <p className="text-lg mb-2 line-through text-gray-500">{t.texto}</p>
                    <p className="text-sm text-gray-600 mb-1">
                      Responsable: <strong>{t.responsable}</strong>
                    </p>
                    <span className="text-xs text-gray-400">{t.fecha}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => toggleCompleta(i)}
                      className="px-2 py-1 rounded bg-yellow-500 text-white text-sm w-full"
                    >
                      Desmarcar
                    </button>
                    <button
                      onClick={() => eliminarTarea(i)}
                      className="px-2 py-1 rounded bg-red-500 text-white text-sm w-full"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
