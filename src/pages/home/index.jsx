import { useEffect, useState, useRef } from 'react';
import './style.css'
import Trash from '../../assets/4437007.png';
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])
  const [aviso, setAviso] = useState('')
  const [status, setStatus] = useState('')

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    if (!inputName.current.value || !inputAge.current.value || !inputEmail.current.value) {
      setAviso("⚠️ Por favor, preencha todos os campos!");
      setStatus("erro");
      return; 
    }

    try {
      await api.post('/usuarios', {
        nome: inputName.current.value,
        idade: inputAge.current.value,
        email: inputEmail.current.value
      });

      setAviso("✅ Usuário cadastrado com sucesso!");
      setStatus("sucesso");
      
      inputName.current.value = '';
      inputAge.current.value = '';
      inputEmail.current.value = '';

      getUsers();

    } catch (error) {
      if (error.response && error.response.data.mensagem) {
        setAviso(`❌ ${error.response.data.mensagem}`);
      } else {
        setAviso("❌ Ocorreu um erro ao cadastrar.");
      }
      setStatus("erro");
    }
  }

  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className='container'>
        <form action="">
          <h1>Cadastro de usuários</h1>
          <input placeholder='Nome' name='nome' type='text' ref={inputName} />
          <input placeholder='Idade' name='idade' type='number' ref={inputAge} />
          <input placeholder='Email' name='email' type='email' ref={inputEmail} />
          <button type='button' onClick={createUsers}>Cadastrar</button>
        </form>
        {aviso && (
          <p className={status === 'sucesso' ? 'msg-sucesso' : 'msg-erro'}>
            {aviso}
          </p>
        )}

        {users.map(user => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome: <span>{user.nome}</span></p>
              <p>Idade: <span>{user.idade}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button type='button' onClick={() => deleteUser(user.id)}>
              <img src={Trash} alt="Lixeira" id='trash' />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
