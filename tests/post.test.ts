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

describe('POST /api/posts', () => {
  it('Deverá criar um novo post', async () => {
    const insertPost = {
      title: "POST DE PORTUGUÊS",
      author: "ANDRÉ",
      description: "OIII",
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

describe('GET /api/posts/professor', () => {
  it('Deverá retornar o último post criado', async () => {
    const response = await request(app)
      .get('/api/posts/professor')
      .set('Authorization', `${token}`);
      
      expect(response.status).toBe(200);
      lastIdPost = response.body.id;
    });
});

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

describe('PUT /api/posts/:id', () => {
  it('Deverá atualizar um post existente', async () => {
    const postId = lastIdPost;
    const updatePost = {
      title: "POST DE PORTUGUÊS",
      author: "ANDRÉ",
      description: "TESTE POST",
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
