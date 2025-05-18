import React, { useState, useEffect } from 'react';
import '../page.css';
import camiloMeme from './img/perro.gif';
import moneda from './img/moneda.png';
import ajustes from './img/ajustes.png';
import diamante from './img/diamante.png';
import perfil from './img/usuario.png';
import alimento from './img/alimentra.png';
import comer2 from './img/comer2.png';
import bañar from './img/bañar.png';
import pasea from './img/pasear.png';
import dormir from './img/dormir.png';
import dormir2 from './img/dormir2.png';
import dormir3 from './img/dormir3.png';
import dormir4 from './img/dormir4.png';
import avatar from './img/avatar.png';
import avatar2 from './img/avatar2.png';
import gifperro from '../assets/camilo.gif';
import { signOut } from 'firebase/auth';
import { auth } from '../service/firebase';  // Asegúrate de que la importación esté correcta
import { useNavigate } from 'react-router-dom';
import Modal from './modal.jsx';
import './modal.css';




function App() {
  
  const [nombre,setNombre]=useState("Player");
  const[avatarcard,setAvatar]=useState(camiloMeme);
  const [contador,setContador]=useState(true);
  const [menuAbierto1, setMenuAbierto1] = useState(false);
  const [menuAbierto2, setMenuAbierto2] = useState(false);
  const [gemas, setGemas] = useState(0); // inicial, editable
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  
  const toggleAjustes = () => {
    setMenuAbierto1(prev => !prev);
  };
  const toggleAvatar=()=>{
    setMenuAbierto2(prev=>!prev);
  };


  const [sonidoActivo, setSonidoActivo] = useState(true);
  const [idioma, setIdioma] = useState('es'); // 'es' para español, 'en' para inglés

  const reiniciarJuego = () => {
    setSalud(50);
    setFelicidad(50);
    setMonedas(0);
  };
  const toggleSonido = () => {
    setSonidoActivo(prev => !prev);
  };

  const toggleIdioma = () => {
    setIdioma(prev => (prev === 'es' ? 'en' : 'es'));
  };


  const verAvatar = () => {
    alert("🧍 Este es Camilo Meme, tu mascota virtual 🐶");
  };
  const usuario = {
    nombre: {nombre},
    perfil: {perfil},
  };

  const aumentargemas=()=>{
    setGemas(gemas + 20);
    const imagen=avatarcard;
    setAvatar(gifperro);
    setTimeout(()=>{
      setAvatar(imagen);
    },5000);
  };


  const navigate = useNavigate();
  const cerrarSesion = async (msg) => {
    try {
      // Intentamos cerrar sesión
      await signOut(auth);  // Esto cerrará la sesión del usuario en Firebase
      setMessage(msg);
      setModalVisible(true);
         // Redirige al usuario a la página de login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un error al cerrar sesión.");
    }
  };
    const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="app">

      <div className="top-bars">
        <div className="player-info">
          <img className="player-avatar" src={perfil} alt="Avatar" />
          <span className="player-name">{nombre}</span>
        </div>


        <div className="resources">
          <div className="resource">
            <img src={diamante} alt="Gemas" />
            <span>{gemas}</span>

          </div>
          <div className="resource">
            <img src={moneda} alt="Monedas" />
            <span>0</span>
          </div>
        </div>
        <div className='ajustes'>
          <button onClick={toggleAvatar} className="ajustes-btn">
            <img src={avatar2} className="boton-img" style={{ width: '64px', height: '64px' }} />

          </button>
        </div>

        <div className="ajustes">
          
          <button className="ajustes-btn" onClick={toggleAjustes}>
            <img src={ajustes} alt="Ajustes" style={{ width: '40px', height: '40px' }}/>
          </button>
        </div>
      </div>



      {/* Tarjeta del personaje estilo Clash Royale */}
      <div className="avatar-card">
              <Modal show={modalVisible} message={message} onClose={closeModal} />

        <img src={avatarcard} id="camilo" alt="Camilo Meme" className="camilo-imagen" />
      </div>

      <div className="botones">
        <button onClick={aumentargemas} className="boton">
          <img src={comer2} className="boton-img" /> Alimentar
          <span className={contador ? "contador-true": "contador-false"}>1</span>
        </button>
        <button onClick={aumentargemas} className="boton">
          <img src={bañar} className="boton-img" /> Bañar
          <span className={contador ? "contador-true": "contador-false"}>1</span>

        </button>
        <button onClick={aumentargemas} className="boton">
          <img src={pasea} className="boton-img" /> Pasear
          <span className={contador ? "contador-true": "contador-false"}>1</span>

          </button>

        <button onClick={aumentargemas} className="boton">
         <img src={dormir4} className="boton-img" /> Dormir
         <span className={contador ? "contador-true": "contador-false"}>1</span>
        </button>


      </div>

      {menuAbierto1 && (
  <div className="ajustes-menu-overlay">
    <div className="ajustes-menu">
      <p className="cerrar-menu" onClick={toggleAjustes}>✖</p>
      <h2>⚙️ Ajustes</h2>
      <ul>
        <li>
          <button onClick={toggleSonido}>
            {sonidoActivo ? '🔊 Sonido activado' : '🔇 Sonido desactivado'}
          </button>
        </li>
        <li>
          <button onClick={() => cerrarSesion('Has Cerrado Sesión Correctamente')}>
            🚪 Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  </div>
)}

      {menuAbierto2 && (
        <div className="ajustes-menu-overlay">
          <div className="ajustes-menu">
            <p className="cerrar-menu" onClick={toggleAvatar}>✖</p>
            <h2>Personalizar Usuario</h2>
            <ul>
  <li>
    <button onClick={() => alert('Aquí puedes cambiar el nombre')}>
      ✏️ Cambiar Nombre
    </button>
  </li>
  <li>
    <button onClick={() => navigate('/tienda')}>
      🛍️ Tienda
    </button>
              </li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
