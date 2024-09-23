import request from 'supertest';
import { Pool } from 'pg';
import app from '../src/app';

jest.mock('pg');
const token = '22e69816-4b10-46b2-9b77-6385860deed3';

describe('POST /api/posts', () => {
  let poolQueryMock: jest.Mock;

  beforeEach(() => {
    poolQueryMock = Pool.prototype.query as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Deverá criar um novo post', async () => {
    const newPost = {
      title: 'Novo Post',
      author: 'Autor Teste',
      description: 'Descrição do Post',
      creation: '2024-09-19T00:00:00.000Z',
      idteacher: 1,
    };

    poolQueryMock.mockResolvedValueOnce({ rows: [newPost] });

    const response = await request(app)
      .post('/api/posts')
      .send(newPost)
      .set('Authorization', `${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newPost);
  });
});

describe('GET /api/posts', () => {
  let poolQueryMock: jest.Mock;

  beforeEach(() => {
    poolQueryMock = Pool.prototype.query as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Deverá retornar uma lista de Posts', async () => {
    const mockPosts = [ {
      "id": 1,
      "title": "POST TESTE",
      "author": "TESTE",
      "description": "TESTE POST",
      "creation": "2024-09-19T00:00:00.000Z",
      "update_date": null,
      "idteacher": 1
  },
  {
      "id": 2,
      "title": "POST TESTE II",
      "author": "TESTE II",
      "description": "TESTE POST II",
      "creation": "2024-09-20T00:00:00.000Z",
      "update_date": "2024-09-21T00:00:00.000Z",
      "idteacher": 1
  }];
    poolQueryMock.mockResolvedValueOnce({ rows: mockPosts });
    const response = await request(app)
      .get('/api/posts')
      .set('Authorization', `${token}`);
      
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPosts);
  });
});


describe('GET /api/posts/:id', () => {
  let poolQueryMock: jest.Mock;

  beforeEach(() => {
    poolQueryMock = Pool.prototype.query as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

it('Deverá retornar um post específico', async () => {
    const postId = 1;
    const mockPost = {
      id: postId,
      title: 'Post Específico',
      author: 'Autor Teste',
      description: 'Descrição do Post',
      creation: '2024-09-19T00:00:00.000Z',
      update_date: null,
      idteacher: 1,
    };

    poolQueryMock.mockResolvedValueOnce({ rows: [mockPost] });

    const response = await request(app).get(`/api/posts/${postId}`).set('Authorization', `${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPost);
  });

  it('Deverá retornar 404 se o post não for encontrado', async () => {
    const postId = -1;
    poolQueryMock.mockResolvedValueOnce({ rows: [] });

    const response = await request(app).get(`/api/posts/${postId}`).set('Authorization', `${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Post não encontrado' });
  });
});

describe('PUT /api/posts/:id', () => {
  let poolQueryMock: jest.Mock;

  beforeEach(() => {
    poolQueryMock = Pool.prototype.query as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const updatedPost = {
    title: 'Post Atualizado',
    author: 'Autor Atualizado',
    description: 'Descrição Atualizada',
    creation: '2024-09-19T00:00:00.000Z',
    update_date: '2024-09-21T00:00:00.000Z',
    idteacher: 1
  };

  it('Deverá atualizar um post existente', async () => {
    const postId = 1;
    
    poolQueryMock.mockResolvedValueOnce({ rows: [updatedPost] });

    const response = await request(app).put(`/api/posts/${postId}`).send(updatedPost).set('Authorization', `${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedPost);
  });

  it('Deverá retornar 404 se o post não for encontrado', async () => {
    const _postId = -1;
    poolQueryMock.mockResolvedValueOnce({ rows: [] });

    const response = await request(app).put(`/api/posts/${_postId}`).send(updatedPost).set('Authorization', `${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Post não encontrado' });
  });
});

describe('DELETE /api/posts/:id', () => {
  let poolQueryMock: jest.Mock;

  beforeEach(() => {
    poolQueryMock = Pool.prototype.query as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Deverá excluir um post existente', async () => {
    const postId = 1;
    
    poolQueryMock.mockResolvedValueOnce({ rows: [{ id: postId }] }); // Simula a verificação de existência do post
    poolQueryMock.mockResolvedValueOnce({}); // Simula a deleção bem-sucedida (sem retorno)

    const response = await request(app).delete(`/api/posts/${postId}`).set('Authorization', `${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Post deletado com sucesso!' });
  });

  it('Deverá retornar 404 se o post não for encontrado', async () => {
    const postId = -1;

    poolQueryMock.mockResolvedValueOnce({ rows: [] });

    const response = await request(app).delete(`/api/posts/${postId}`).set('Authorization', `${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Post não encontrado' });
  });
});
