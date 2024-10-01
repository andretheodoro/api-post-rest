import request from 'supertest';
import app from '../src/app'; 
import dotenv from 'dotenv'; 

dotenv.config(); 
const token = '22e69816-4b10-46b2-9b77-6385860deed3';

const postModel = {
  id: expect.any(Number),
  title: expect.any(String),
  author: expect.any(String),
  description: expect.any(String),
  creation: expect.any(String), 
  update_date: null,
  idteacher: expect.any(Number),
};

let lastIdPost = 0;

//GET /posts - Lista de Posts:
describe('GET /api/posts', () => {
  it('Deverá retornar uma lista de Posts', async () => {
    const expectedPosts = [postModel];

    const response = await request(app)
      .get('/api/posts')
      .set('Authorization', `${token}`);
      
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining(expectedPosts));
  });
});

//GET /posts - Listagem de Todas as Postagens:
describe('GET /api/posts/professor/:id', () => {
  it('Deverá retornar uma lista de Posts do Professor', async () => {
      const expectedPosts = [postModel];
      const response = await request(app).get(`/api/posts/professor/1`).set('Authorization', `${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining(expectedPosts));
    });

    it('Deverá retornar 404 se não for encontrado Posts para o Professor', async () => {
      const response = await request(app).get(`/api/posts/professor/0`).set('Authorization', `${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Professor(a) não possui Posts criados.' });
    });
});

//POST /posts - Criação de postagens:
describe('POST /api/posts', () => {
  it('Deverá criar um novo post', async () => {
    const insertPost = {
      title: "Introdução ao Node.js",
      author: "ANDRE/TIAGO",
      description: "Node.js® é um ambiente de execução de JavaScript em nível de back-end e front-end. Neste tutorial, veremos uma breve introdução ao desenvolvimento de aplicações web usando Node.js. Requisitos básicos: node e npm. Para verificar se estão instalados, digite no terminal: node -v, npm -v. Você pode fazer o download do Node.js neste endereço: https://nodejs.org/pt-br/",
      idteacher: 1,
    };

    const response = await request(app)
      .post('/api/posts')
      .send(insertPost)
      .set('Authorization', `${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(insertPost));
  });
});

describe('GET /api/posts/lastPost', () => {
  it('Deverá retornar o último post criado', async () => {
    const response = await request(app)
      .get('/api/posts/lastPost')
      .set('Authorization', `${token}`);
      
      expect(response.status).toBe(200);
      lastIdPost = response.body.id;
    });
});

//GET /posts/:id - Leitura de Posts:
describe('GET /api/posts/:id', () => {
  it('Deverá retornar um post específico', async () => {
      const postId = lastIdPost;
      const response = await request(app).get(`/api/posts/${postId}`).set('Authorization', `${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(postModel));
    });

    it('Deverá retornar 404 se o post não for encontrado', async () => {
      const postId = -1;
      const response = await request(app).get(`/api/posts/${postId}`).set('Authorization', `${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Post não encontrado' });
    });
});

//PUT /posts/:id - Edição de postagens:
describe('PUT /api/posts/:id', () => {
  it('Deverá atualizar um post existente', async () => {
    const postId = lastIdPost;

    const updatePost = {
      title: "Introdução ao Node.js - FIAP",
      author: "ANDRE/TIAGO - FIAP",
      description: "Node.js® é um ambiente de execução de JavaScript em nível de back-end e front-end. Neste tutorial, veremos uma breve introdução ao desenvolvimento de aplicações web usando Node.js. Requisitos básicos: node e npm. Para verificar se estão instalados, digite no terminal: node -v, npm -v. Você pode fazer o download do Node.js neste endereço: https://nodejs.org/pt-br/",
      idteacher: 1,
    };

    const response = await request(app).put(`/api/posts/${postId}`).send(updatePost).set('Authorization', `${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(updatePost));
  });

  it('Deverá retornar 404 se o post não for encontrado', async () => {
    const _postId = -1;
    const response = await request(app).put(`/api/posts/${_postId}`).send(postModel).set('Authorization', `${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Post não encontrado' });
  });
});

//DELETE /posts/:id - Exclusão de Postagens:
describe('DELETE /api/posts/:id', () => {
  it('Deverá excluir um post existente', async () => {
    const postId = lastIdPost;
    const response = await request(app).delete(`/api/posts/${postId}`).set('Authorization', `${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Post deletado com sucesso!' });
  });

  it('Deverá retornar 404 se o post não for encontrado', async () => {
    const postId = -1;
    const response = await request(app).delete(`/api/posts/${postId}`).set('Authorization', `${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Post não encontrado' });
  });
});

//GET /posts/search - Busca de Posts por Palavras-Chaves:
describe('GET /api/posts/search', () => {
  it('deve retornar 400 se a palavra chave não for fornecida', async () => {
    const response = await request(app).get('/api/posts/search').set('Authorization', `${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Palavra chave é obrigatória' });
  });

  it('deve retornar 404 se não encontrar posts', async () => {
    const response = await request(app).get('/api/posts/search?keyword=jest').set('Authorization', `${token}`); // ajuste conforme a lógica do seu banco
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Nenhum Post encontrado para a palavra chave informada.' });
  });

  it('deve retornar 200 e os posts encontrados', async () => {
    const expectedPosts = [postModel];
    const response = await request(app).get('/api/posts/search?keyword=teste').set('Authorization', `${token}`); // substitua pelo valor correto
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining(expectedPosts));
  });
});