import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { GrLinkedinOption } from "@react-icons/all-files/gr/GrLinkedinOption";
import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub";

const socket = io.connect('https://madmandev-api.onrender.com');

function App() {
  const [message, setMessage] = useState("");
  const [backenddenGelenMesaj, setBackenddenGelenMesaj] = useState("");
  const [back, setBack] = useState(false);
  const [qrup, setQrup] = useState("");
  const [name, setName] = useState("");

  const eventGonder = ()=>{
    socket.emit('backende_mesaj', {message, qrup, name})
    alert("Mesajınız göndərildi");
  }
  
  const join_qrup = ()=>{
    socket.emit('join_qrup', qrup)
  }
  
  useEffect(()=>{
    socket.on("frontende_mesaj",(data)=>{
      setBackenddenGelenMesaj(`${data.name}: ${data.message}`)
      setBack(true)
    })
  }, [socket])
  

  return (
    <>
    {back?<div className='back_message'>{backenddenGelenMesaj}</div>:<div></div>}
    <div id="loginform">
        <h2 id="headerTitle">MadManDev Çat Proqramı</h2>
        <div className="row">
          <label>Adınız</label>
          <input onChange={(e)=>{setName(e.target.value)}} type="text" placeHolder="Adınızı daxil edin"/>
        </div>
        <div className="row">
          <label>Otaq</label>
          <input onChange={(e)=>{setQrup(e.target.value)}} type="password" placeHolder="Otaq kodunu daxil edin"/>
        </div>
        <div id="button" className="row">
          <button onClick={join_qrup}>Otağa daxil ol</button>
        </div>  
        <div className="row">
          <label>Mesaj</label>
          <input onChange={(e)=>{setMessage(e.target.value)}} type="text" placeHolder="Mesajınızı yazın..."/>
        </div>    
        <div id="button" className="row">
          <button onClick={eventGonder}>Mesajı Göndər</button>
        </div>
        <div className='socials'>
          <div className='social-header'>Bizi izləmək üçün:</div>
          <a className="social" href="https://www.instagram.com/nijatmansimov/">Instagram</a>
          <a className="social" href="https://www.linkedin.com/in/nijat-mansimov-9a4b59212/"><GrLinkedinOption/></a>
          <a className="social" href="https://github.com/Nijat-Mansimov"><AiFillGithub/></a>
        </div>
      </div>
      </>
  );
}

export default App;
