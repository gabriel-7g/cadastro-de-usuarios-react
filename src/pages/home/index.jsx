import './style.css'
import Trash from '../../assets/4437007.png';

function Home() {
  const users = [
    {
      id: '123',
      name: 'rodolfo',
      age: 33,
      email: 'rod@email.com'
    },
    {
      id: '321',
      name: 'arnaldo',
      age: 33,
      email: 'arnaldo@email.com'
    },
    {
      id: '3213',
      name: 'Karol',
      age: 26,
      email: 'karol@email.com'
    }
  ]

  return (
    <>
      <div className='container'>
        <form action="">
          <h1>Cadastro de usuários</h1>
          <input name='nome' type='text' />
          <input name='idade' type='number' />
          <input name='email' type='email' />
          <button type='button'>Cadastrar</button>
        </form>

        {users.map(user => (
          <div key={user.id}>
            <div>
              <p>Nome: {user.name}</p>
              <p>Idade: {user.age}</p>
              <p>Email: {user.email}</p>
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
