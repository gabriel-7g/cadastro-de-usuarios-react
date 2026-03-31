import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const usuarios = [
    { id: 1, nome: "Ana Silva", email: "ana.silva@email.com", idade: 25 },
    { id: 2, nome: "Bruno Costa", email: "bruno.c@email.com", idade: 30 },
    { id: 3, nome: "Carla Souza", email: "carla.souza@email.com", idade: 22 },
    { id: 4, nome: "Diego Lima", email: "diego.l@email.com", idade: 28 },
    { id: 5, nome: "Elena Martins", email: "elena.m@email.com", idade: 35 },
    { id: 6, nome: "Fabio Rocha", email: "fabio.r@email.com", idade: 40 },
    { id: 7, nome: "Gisele Oliveira", email: "gisele.o@email.com", idade: 19 },
    { id: 8, nome: "Henrique Melo", email: "henrique.m@email.com", idade: 33 },
    { id: 9, nome: "Isabela Santos", email: "isabela.s@email.com", idade: 27 },
    { id: 10, nome: "João Pereira", email: "joao.p@email.com", idade: 31 }
];


app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});


app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (usuario) {
        res.status(200).json(usuario);
    } else {
        res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
});

app.post('/usuarios', (req, res) => {
    const { nome, email, idade } = req.body;
    const usuarioExiste = usuarios.find(u => u.email === email);
    if (usuarioExiste) {
        return res.status(400).json({ mensagem: "Este e-mail já está cadastrado!" });
    }
    const novoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
    const novoUsuario = {
        id: novoId,
        nome,
        email,
        idade: parseInt(idade) 
    };

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.delete('/usuarios/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
        usuarios.splice(index, 1); 
        res.status(200).json({ mensagem: "Usuário deletado com sucesso!" });
    } else {
        res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});