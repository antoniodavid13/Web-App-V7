import { useState, useEffect } from 'react';
import '../page.css';
import camiloMeme from './img/perro.gif';
import moneda from './img/moneda.png';
import ajustes from './img/ajustes.png';
import diamante from './img/diamante.png';
import perfil from './img/usuario.png';
import comer from './img/comer2.png';
import bañar from './img/bañar.png';
import pasea from './img/pasear.png';
import dormir from './img/dormir4.png';
import avatar from './img/avatar2.png';
import gifperro from '../assets/camilo.gif';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../service/firebase';  // Asegúrate de que la importación esté correcta
import { useNavigate } from 'react-router-dom';
import Modal from './modal.jsx';
import './modal.css';
import { getDatosUsuario, updateUserDiamantes } from "../service/firebasemetodos.js";







function App() {
  
  const [usuario,setUsuario]=useState(null);
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




  const navigate = useNavigate();
  const cerrarSesion = async (msg) => {
    try {
      // Intentamos cerrar sesión
      await signOut(auth);
       // Esto cerrará la sesión del usuario en Firebase
      setMessage(msg);
         // Redirige al usuario a la página de login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un error al cerrar sesión.");
    }
  };
    const closeModal = () => {
    setModalVisible(false);
  };

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const datos = await getDatosUsuario(user.uid);
        if (datos) {
          setUsuario({ ...datos, uid: user.uid });
          setGemas(datos.diamantes || 0);
        }
      } else {
              setModalVisible(true);

      }
    });

    return () => unsubscribe();
  }, []);

const aumentargemas = async (cantidad) => {
  if (!usuario) return; // Asegúrate de que haya un usuario
    const nuevasgemas = Number(gemas) + Number(cantidad);
  setGemas(nuevasgemas); // Actualiza localmente

  try {
    await updateUserDiamantes(usuario.uid, nuevasgemas); // Actualiza en Firebase
  } catch (error) {
    console.error("Error al actualizar los diamantes:", error);
    alert("Hubo un error al actualizar los diamantes.");
  }

  const imagen = avatarcard;
  setAvatar(gifperro); // Cambia la imagen del avatar
  setTimeout(() => {
    setAvatar(imagen); // Vuelve a la imagen original después de 5 segundos
  }, 5000);
};











  return (
    <div className="app">

      <div className="top-bars">
        <div className="player-info">
          <img className="player-avatar" src={perfil} alt="Avatar" />
          <span className="player-name">{usuario?.nombre}</span>
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
            <img src={avatar} className="boton-img" />
          </button>
        </div>

        <div className="ajustes">
          
          <button className="ajustes-btn" onClick={toggleAjustes}>
            <img src={ajustes} alt="Ajustes" />
          </button>
        </div>
      </div>



      {/* Tarjeta del personaje estilo Clash Royale */}
      <div className="avatar-card">
      <Modal show={modalVisible} message={message} onClose={closeModal} />

        <img src={avatarcard} id="camilo" alt="Camilo Meme" className="camilo-imagen" />
      </div>

      <div className="botones">
        <button onClick={() => aumentargemas(20)} className="boton">
          <img src={comer} className="boton-img" /> Alimentar
          <span className={contador ? "contador-true": "contador-false"}>1</span>
        </button>
        <button onClick={() => aumentargemas(40)} className="boton">
          <img src={bañar} className="boton-img" /> Bañar
          <span className={contador ? "contador-true": "contador-false"}>1</span>

        </button>
        <button onClick={() => aumentargemas(10)} className="boton">
          <img src={pasea} className="boton-img" /> Pasear
          <span className={contador ? "contador-true": "contador-false"}>1</span>

          </button>
                <button onClick={() => aumentargemas(60)} className="boton">
          <img src={dormir} className="boton-img" /> Dormir
          <span className={contador ? "contador-true": "contador-false"}>1</span>

          </button>


      </div>

      {menuAbierto1 && (
        <div className="ajustes-menu-overlay">
          <div className="ajustes-menu">
            <p className="cerrar-menu" onClick={toggleAjustes}>✖</p>

            <h2>⚙️ {idioma === 'es' ? 'Ajustes' : 'Settings'}</h2>
            <ul>

              <li>
                <button onClick={toggleSonido}>
                  {sonidoActivo ? '🔊 Sonido activado' : '🔇 Sonido desactivado'}
                </button>
              </li>
              <li>
                <button onClick={()=>cerrarSesion('Has Cerrado Sesion Correctamente')}>
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
    <button onClick={() => navigate('/')}>
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




