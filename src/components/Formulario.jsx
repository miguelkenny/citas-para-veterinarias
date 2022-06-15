import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if( Object.keys(paciente).length > 0 ) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validación del Formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true);
      return;
    } 
    setError(false);
    
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas
    }
    
    if(paciente.id){
      //Editando Registro
      objetoPaciente.id = paciente.id

      const pacienteActualizado = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )
      
      setPacientes(pacienteActualizado)
      setPaciente({})
      
    } else {
      //Nuevo Registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }

    //Reinicia el Formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
        <h1 className="font-black text-3xl text-center">Seguimiento de Pacientes</h1>
        <p className="text-xl mt-6 text-center mb-5">
          Añadir Pacientes y <span className="text-indigo-600 font-bold">Administrarlos</span>
        </p>
        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-md py-10 px-5 border-2 rounded-lg mb-10 mx-5">
          { error && <Error><p>Todos los campos son obligatorios</p></Error> }
          <div className="mb-5">
            <label htmlFor="nombre_mascota" className="block text-gray-500 uppercase font-bold">Nombre de Mascota:{` ${nombre}`}</label>
            <input
              id="nombre_mascota"
              type="text"
              placeholder="Nombre de la mascota..."
              className="border-2 w-full p-2 mt-2 placeholder-cyan-900 rounded-md"
              value={nombre}
              onChange={ (e)=> setNombre(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-500 uppercase font-bold">Nombre del propietario:</label>
            <input
              id="propietario"
              type="text"
              placeholder="Nombre del propietario..."
              className="border-2 w-full p-2 mt-2 placeholder-cyan-900 rounded-md"
              value={propietario}
              onChange={ (e)=> setPropietario(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-500 uppercase font-bold">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Email de contacto del propietario..."
              className="border-2 w-full p-2 mt-2 placeholder-cyan-900 rounded-md"
              value={email}
              onChange={ (e)=> setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-500 uppercase font-bold">Fecha de alta:</label>
            <input
              id="alta"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-cyan-900 rounded-md"
              value={fecha}
              onChange={ (e)=> setFecha(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="sintomas" className="block text-gray-500 uppercase font-bold">Sintomas:</label>
            <textarea 
              id="sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-cyan-900 rounded-md"
              placeholder="Describir los síntomas"
              value={sintomas}
              onChange={ (e)=> setSintomas(e.target.value)}
            />
          </div>

          <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white rounded-md shadow uppercase font-bold
            hover:bg-indigo-700 hover:shadow-lg cursor-pointer transition-opacity"
            value= { paciente.id ? "Editar Paciente" : "Agregar Paciente" }
          />
        </form>
    </div>
  )
}

export default Formulario