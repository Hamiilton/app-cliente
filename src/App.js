import { useState } from 'react'
import './App.css'
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from "sweetalert2"

function App() {
  const [usuario,setUsuario] = useState("")
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [nroDocumento, setNroDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [editar ,setEditar] = useState(false)
  const [usuariosList , setUsuariosList] = useState([])

  const listar = () =>{
    Axios.get("http://localhost:3001/usuarios").then(
      (response) => setUsuariosList(response.data)
    )
  }


  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nroDocumento : nroDocumento,
      usuario: usuario,
      nombre:nombre,
      apellido:apellido,
      email:email,
      password:password,
      tipoUsuario:tipoUsuario
    }).then(()=>{
      // listar();
      // clear();
      Swal.fire(
        {
          title:"<strog> Actualizacion exitosa !!!</strong>",
          html:"<i>el usuario<strong>",
          icon:"success",
          timer:3000
        }
      )
    }
    ).catch(function(error){
      Swal.fire(
        {icon:"error",
        title:"Oops...",
        text:JSON.parse(JSON.stringify(error)).message === "Network error" ? "intetne mas tarde" : JSON.parse(JSON.stringify(error)).message
        }
      )
    })
  }
  return (
    <>
      <div className='container'>
        <div className='card text-center'>
          <div className='card-header'>
              GESTION DE USUARIOS
          </div>
          <div className='card-body'>
            <div className='formulario'>
              <h3>Datos de usuarios</h3>
              <div className='info'>
                <label>Nomre de usuario</label>
                <input type='text' onChange={(e) => setUsuario(e.target.value)} className='form-control' value={usuario}/>
              </div>
              <div className='info'>
                <label>Nombre</label>
                <input type='text' onChange={(e) => setNombre(e.target.value)} className='form-control' value={nombre} />
              </div>

              <div className='info'>
                <label>Apellido</label>
                <input type='text' onChange={(e) => setApellido(e.target.value)} className='form-control' value={apellido} />
              </div>

              <div className='info'>
                <label>Email</label>
                <input type='email' onChange={(e) => setEmail(e.target.value)} className='form-control' value={email} />
              </div>

              <div className='info'>
                <label>Número de documento</label>
                <input type='number' onChange={(e) => setNroDocumento(e.target.value)} className='form-control' value={nroDocumento} />
              </div>

              <div className='info'>
                <label>Password</label>
                <input type='password' onChange={(e) => setPassword(e.target.value)} className='form-control' value={password} />
              </div>

              <div className='info'>
                <label>Tipo de usuario</label>
                <select onChange={(e) => setTipoUsuario(e.target.value)} className='form-control' value={tipoUsuario}>
                  <option value=''>Seleccione un tipo</option>
                  <option value='admin'>Administrador</option>
                  <option value='user'>Usuario</option>
                </select>
              </div>
            </div>

            <div className='card-footer text-muted'>
              {
                 editar ?<>
                 <button className='btn btn-warning m-2' onClick={""}>actalizar</button>
                 <button className='btn btn-info m-2' onClick={""}>Cancelar</button>
                 </> 
                 :<button className='btn btn-success' onClick={add}>Registrar</button>
              }
            </div>
                <button className='btn btn-success' onClick={listar}>listar</button>
          </div>
               <div className="usuario-container">
            <div className="usuario-header">
                <span>Documento</span>
                <span>Usuario</span>
                <span>Nombre</span>
                <span>Apellido</span>
                <span>Email</span>
                <span>Password</span>
                <span>Tipo Usuario</span>
            </div>
            {usuariosList.map((usuario, index) => (
                <div key={index} className="usuario-item">
                    <span>{usuario.nroDocumento}</span>
                    <span>{usuario.usuario}</span>
                    <span>{usuario.nombre}</span>
                    <span>{usuario.apellido}</span>
                    <span>{usuario.email}</span>
                    <span>{usuario.password}</span>
                    <span>{usuario.tipoUsuario}</span>
                </div>
            ))}
        </div>
        </div>
      </div>
    </>
  )
}

export default App