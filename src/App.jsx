import { useState, useRef, useEffect } from 'react';
import './App.css';

const planes = {
  standard: [
    { id: 1, servicio: 'Creación de logotipos' },
    { id: 2, servicio: 'Creación de tarjetas de presentación' },
    { id: 3, servicio: 'Creación de shortcuts para RRSS' }
  ]
};

function App() {
  const [servicios, setServicios] = useState(planes.standard);
  const [editando, setEditando] = useState(-1);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoServicio, setNuevoServicio] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (editando !== -1) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(nuevoNombre.length, nuevoNombre.length);
    }
  }, [editando, nuevoNombre]);

  const handleEditar = (index) => {
    setEditando(index);
    setNuevoNombre(servicios[index].servicio);
  };

  const handleGuardar = (index) => {
    const nuevosServicios = servicios.map((item, i) => {
      if (i === index) {
        return { ...item, servicio: nuevoNombre };
      }
      return item;
    });
    setServicios(nuevosServicios);
    setEditando(-1);
  };

  const handleEliminar = (index) => {
    const nuevosServicios = servicios.filter((_, i) => i !== index);
    setServicios(nuevosServicios);
    setEditando(-1);
  };

  const handleAgregar = () => {
    if (nuevoServicio.trim() !== '') {
      const nuevoServicioObj = { id: servicios.length + 1, servicio: nuevoServicio };
      setServicios([...servicios, nuevoServicioObj]);
      setNuevoServicio('');
    }
  };

  return (
    <>
      <section className='principal'>
        <h1>Servicios</h1>
        {servicios.map((item, index) => (
          <div className='servicios' key={index}>
            {editando === index ? (
              <>
                <input
                  type="text"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  ref={inputRef}
                />
                <button onClick={() => handleGuardar(index)}>Guardar</button>
              </>
            ) : (
              <>
                <p>{item.servicio}</p>
                <button onClick={() => handleEditar(index)}>Editar</button>
              </>
            )}
            <button onClick={() => handleEliminar(index)}>Eliminar</button>
          </div>
        ))}
        <div>
          <input
            type="text"
            placeholder="Nuevo servicio"
            value={nuevoServicio}
            onChange={(e) => setNuevoServicio(e.target.value)}
          />
          <button type='submit' className='agregar' onClick={handleAgregar}>Agregar Nuevo Servicio</button>
        </div>
      </section>
    </>
  );
}

export default App;
