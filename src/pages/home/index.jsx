import { useEffect, useState, useRef } from 'react';
import './style.css'
import Trash from '../../assets/4437007.png';
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function createUsers() {
    await api.get ('/usuarios')

  }

  useEffect( () => {
    getUsers
  }, [])

  return (
    <>
      <div className='container'>
        <form action="">
          <h1>Cadastro de usuários</h1>
          <input placeholder='Nome' name='nome' type='text' ref={inputName}/>
          <input placeholder='Idade' name='idade' type='number' ref={inputAge}/>
          <input placeholder='Email' name='email' type='email' ref={inputEmail}/>
          <button type='button' onClick={createUsers}>Cadastrar</button>
        </form>

        {users.map(user => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button type='button'>
              <img src={Trash} alt="Lixeira" id='trash' />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
