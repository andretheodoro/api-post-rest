# API REST de Gerenciamento de Posts

Esta API REST permite o gerenciamento de posts, oferecendo funcionalidades para alunos e professores. Desenvolvida com Node.js, ela facilita a criação, leitura, visualização, atualização e exclusão de posts de forma eficiente e centralizada.

## Descrição

Atualmente, a maioria dos professores e professoras da rede pública de educação não possuem plataformas onde postar suas aulas e transmitir conhecimento para alunos e alunas de forma prática, centralizada e tecnológica. 
Para solucionar esse problema, nós utilizamos os conhecimentos adquiridos na última fase para auxiliar a nossa comunidade com a criação de uma aplicação de blogging dinâmico, utilizando a plataforma OutSystems. A plataforma foi um sucesso e, agora, nossa aplicação escalará para um panorama nacional. Portanto, precisaremos refatorar nosso Back-end, utilizando a plataforma de desenvolvimento node.js, e precisaremos persistir esses dados em um banco de dados.
Com o objetivo de resolver o problema acima proposto desenvolvemos uma API simples para que professores possam criar, listar, atualizar e excluir posts e alunos possam visualizar e ler esses posts. Desenvolvida com Node.js, Express, PostgreSQL, Jest e Docker, esta API é automatizada com GitHub Actions para CI/CD.

## Arquitetura da Aplicação

A aplicação é estruturada de forma modular, com rotas dedicadas para gerenciar posts utilizando o framework Express, middleware para validação da autenticação de usuários, gerenciamento de erros e garantindo a persistência de dados através do banco relacional PostgreSQL.
Além disso, a API conta com a utilização de contêiners Docker para garantir a consistência entre ambientes de desenvolvimento e produção.

A aplicação em sua essência é estruturada da seguinte forma:

- **src/**: Contém a lógica da aplicação.
- **controllers/**: Controladores que gerenciam a lógica de cada rota.
- **env/**: Armazenar variáveis de ambiente que configuram aspectos sensíveis ou específicos da aplicação.
- **lib/**: Conexão com o banco de dados / migration.
- **middleware/**: Middleware para validação e autenticação.
- **models/**: Modelos que representam a estrutura dos dados e interagem com o banco de dados.
- **routes/**: Definições das rotas da API.
- **tests/**: Testes automatizados usando Jest/Supertest.

## Tecnologias/Framework Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor (Vide abaixo pré-requisito).
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados dos posts e professores (Vide abaixo pré-requisito).
- [**Express**](https://expressjs.com/): Framework para gerenciamento de rotas na API REST.
- [**Docker**](https://docs.docker.com/): Containerização da aplicação para facilitar o desenvolvimento e a implantação.
- [**Jest**](https://jestjs.io/docs/getting-started): Framework de testes para garantir a qualidade do código.
- [**ZOD**](https://zod.dev/): Biblioteca de validação de esquemas em TypeScript, usada para garantir que os dados de entrada (ex.: parâmetros de requisição) estejam no formato correto, validando tipos, estruturas e restrições antes de processá-los.
- [**Typeorm**](https://typeorm.io/): ORM (Object-Relational Mapping) para TypeScript e JavaScript, que facilita a interação com bancos de dados relacionais, permitindo mapear entidades diretamente para tabelas, realizar consultas, e gerenciar dados de forma mais simples e orientada a objetos.
- [**Swagger**](https://swagger.io/docs/): Ferramenta que facilita a documentação e visualização interativa da API, permitindo testes nos endpoints diretamente pela interface, além de gerar especificações em formato OpenAPI.
- [**JWT**](https://jwt.io/introduction): JSON Web Token é um padrão para autenticação segura na API. Ele cria tokens compactos e assinados.
- [**Postman**](https://www.postman.com/): Ferramenta usada para testar e documentar a API, permitindo enviar requisições HTTP, verificando respostas e facilitando o desenvolvimento e a depuração da API.
  
## Setup Inicial

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started)
- [npm](https://www.npmjs.com/get-npm)
- [PostgreSQL](https://www.postgresql.org/)

### Passo a Passo

**1. Clone o repositório**

   ```bash
   git clone https://github.com/andretheodoro/api-post-rest.git
   cd api-post-rest
   ```
**2. Comandos VSCode**
  ```bash
  npm install
  ```
  ```bash
  npm run build
  ```

**3. Criação Arquivo .env**

Criar um arquivo ".env" baseado no arquivo ".env.example" na raiz do projeto com as seguintes variáveis:
```plaintext
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost/db
DB_NAME=nome_do_banco
DB_PORT=5432 -> porta Banco de Dados
PORT=3000 -> porta Aplicação
NODE_ENV=development -> tipo de ambiente de desenvolvimento
JWT_SECRET=123 -> Chave secreta usada para assinar e verificar os tokens JWT (JSON Web Tokens) na API
```

**4. Configuração com Docker**

Este projeto está totalmente containerizado utilizando o Docker. Para configurar a API e o banco de dados PostgreSQL com Docker:

**4.1. Construa e inicie os contêineres:**
  ```bash
  docker-compose up --build
  ```

**4.2. Para parar os contêineres:**
  ```bash
  docker-compose down
   ```

**5. Modo Desenvolvimento**
  ```bash
  npm run start:dev
   ```
O comando acima pode ser executado para executar a aplicação no modo de desenvolvimento, após startar o banco de dados separadamente.
De acordo com a configuração do arquivo package.json, esse comando executará os seguintes processos:

  ```bash
  npm run migrate
   ```
Este comando executa um script definido no arquivo package.json que realiza a migração do banco de dados. 
Para o caso dessa API demonstramos a utilização através apenas da criação do campo "PASSWORD" na tabela "TEACHER".

```bash
ts-node-dev src/server.ts:
```

Após as migrações serem executadas, este comando inicia o servidor da aplicação a partir do arquivo src/server.ts utilizando o ts-node-dev.
ts-node-dev é uma ferramenta que executa código TypeScript sem a necessidade de transpilar manualmente o código para JavaScript. Ele também reinicia automaticamente o servidor quando alterações no código são detectadas, similar ao nodemon, mas otimizado para TypeScript.

Dessa forma, o comando:

Executa todas as migrações necessárias para garantir que o banco de dados esteja atualizado.

Em seguida, inicia o servidor da API no modo de desenvolvimento, com reinicializações automáticas ao modificar os arquivos.

## Estrutura de Diretórios

Abaixo segue descrito os principais diretórios e arquivos do projeto da API desenvolvida:

```plaintext
/api-post-rest
├── /.github
│   ├── /workflows        # Arquivos de configuração dos workflows do GitHub Actions. Esses arquivos, no formato YAML, definem as automações do ciclo de vida de desenvolvimento (CI/CD)
├── /src
│   ├── /controllers      # Lógica para manipulação de dados
│   ├── /env              # Ponto de carregamento das variáveis definidas em .env
│   ├── /lib              # Bibliotecas de interação da aplicação com o Banco de Dados
|       ├── /pg           # Biblioteca pg responsável por conectar e realizar operações no bancos de dados PostgreSQL
|       ├── /typeorm      # Object-Relational Mapping, facilitando o mapeamento entre as entidades da aplicação e as tabelas do banco de dados através do migration
│   ├── /middleware       # Middleware para validações de autenticação de usuário e controle de erros
│   ├── /models           # Definições de modelos
│   ├── /routes           # Definições de rotas da API
│   ├── /types            # Definição de tipos do TypeScript para o framework Express
│   ├── app               # Configuração principal da aplicação
│   ├── server            # Inicializa o servidor da aplicação
│   ├── swagger           # Configuração da documentação da API usando Swagger, permitindo que desenvolvedores e usuários interajam com a API de forma mais fácil e compreensível através de uma interface gráfica
├── /tests                # Testes automatizados
├── .env                  # Variáveis de ambiente
├── .env.test             # Variáveis de ambiente de execução dos testes
├── docker-compose.yml    # Configurações do Docker
├── package.json          # Dependências e scripts
└── README.md             # Documentação
```

## Uso do Express na API de Posts

O Express é um framework minimalista e flexível para Node.js, que fornece um conjunto robusto de recursos para a construção de aplicações web e APIs. É amplamente utilizado devido à sua simplicidade e capacidade de facilitar o desenvolvimento de servidores.

### Como o Express foi utilizado na API de Posts

Na API de Posts, o Express é utilizado para:

- **Gerenciamento de Roteamento**: O Express permite definir rotas de forma clara e organizada, facilitando o mapeamento de diferentes endpoints (como `/api/posts`, `/api/posts/search`, etc.) e suas respectivas funções de tratamento.

- **Manipulação de Requisições e Respostas**: O Express simplifica o processo de manipulação de requisições HTTP, permitindo acessar facilmente os dados enviados pelo cliente, como parâmetros de URL, cabeçalhos e corpo da requisição.

- **Middleware**: O Express suporta middleware, que são funções que podem ser executadas durante o ciclo de requisição-resposta. Isso é útil para autenticação, validação de dados e manipulação de erros, permitindo uma arquitetura modular e reutilizável, assim como foi utilizado na API.

- **Configuração Simples**: O Express oferece uma configuração rápida e intuitiva, permitindo que a API seja construída e mantida de forma eficiente.

### Por que o Express foi escolhido?

- **Desempenho**: O Express é leve e rápido, adequado para aplicações que exigem alta performance, como APIs RESTful.

- **Flexibilidade**: A estrutura do Express permite a personalização e extensão fácil, adaptando-se às necessidades específicas da API de Posts.

- **Comunidade e Ecossistema**: O Express possui uma grande comunidade de desenvolvedores e uma vasta gama de middleware e bibliotecas disponíveis, o que facilita a integração de novas funcionalidades e a resolução de problemas.

- **Simplicidade**: O Express reduz a complexidade do gerenciamento de servidores, tornando o desenvolvimento mais acessível, especialmente para quem está começando com Node.js.

## Banco de Dados 

## PostgreSQL

Optamos pelo PostgreSQL como banco de dados relacional para a API, pois teremos algumas vantagens significativas:

- **Estrutura de Dados Definida:** Com um esquema rígido, o PostgreSQL garante que os dados dos posts e dos usuários sejam consistentes e bem organizados. Isso é crucial para manter a integridade das informações, especialmente quando diferentes usuários interagem com a mesma base.

- **Relacionamentos Eficientes:** A API pode precisar gerenciar relacionamentos entre posts, autores (alunos e professores) e futuramente outras entidades. O PostgreSQL permite a utilização de chaves estrangeiras, facilitando a modelagem dessas interações e garantindo que os dados permaneçam integrados.

- **Consultas Complexas:** O uso de SQL no PostgreSQL possibilita consultas avançadas, permitindo filtrar e buscar posts de maneira eficiente. Isso é especialmente útil para funcionalidades como pesquisa por palavras-chave ou listagem de posts por autor.

- **Escalabilidade e Performance:** O PostgreSQL é conhecido por sua robustez e capacidade de lidar com grandes volumes de dados. Isso é essencial para uma API de posts, que pode crescer rapidamente à medida que mais usuários e conteúdos são adicionados.

Dessa forma, consideramos que o PostgreSQL seria a escolha ideal para a API de gerenciamento de Posts, proporcionando uma base sólida e confiável para gerenciar os dados de forma eficiente e segura.

## Estrutura do Banco de Dados

O script para criar as tabelas no banco de dados é o seguinte:

```sql
CREATE TABLE TEACHER (
    ID SERIAL,
    NAME VARCHAR(100),
    PRIMARY KEY (ID)
);

CREATE TABLE POSTS (
    ID SERIAL,
    TITLE VARCHAR(255) NOT NULL,
    AUTHOR VARCHAR(100),
    DESCRIPTION TEXT,
    CREATION DATE,
    UPDATE_DATE DATE,
    IDTEACHER INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (IDTEACHER) REFERENCES TEACHER(ID)
);

--Caso Migration não seja executado, será necessário efetuar o seguinte comando no BD para criação da coluna "PASSWORD":
alter table teacher add column password varchar(50);

--Script's para criação de alguns usuários Professores na API
INSERT INTO TEACHER(NAME, PASSWORD) VALUES ('Andre', '12345');
INSERT INTO TEACHER(NAME, PASSWORD) VALUES ('Tiago', '123456');
INSERT INTO TEACHER(NAME, PASSWORD) VALUES ('POS_FIAP', '123456');
INSERT INTO TEACHER(NAME, PASSWORD) VALUES ('TECH CHALLENGE', '123456');
```

## Funcionalidades

### Alunos
 - **Listagem de todos os Posts**
 - **Obter um Post específico para leitura**

### Professores
 - **Login**
 - **Criação de Posts**
 - **Atualização de um Post**
 - **Exclusão de um Post**
 - **Listagem de todos os Posts criados pelo Professor**
 - **Busca de Posts por Palavras-Chave**

## Endpoints da API

| Método | Endpoint                   | Descrição                                                               | Querystring |
|--------|----------------------------|-------------------------------------------------------------------------|-------------|
| POST   | /api/posts                 | Criação de um Post                                                      |             |
| GET    | /api/posts                 | Listagem de todos os Posts                                              |             |
| GET    | /api/posts/:id             | Obter um Post específico por ID                                         |             |
| PUT    | /api/posts/:id             | Atualizar um Post por ID                                                |             |
| DELETE | /api/posts/:id             | Excluir um Post por ID                                                  |             |
| GET    | /api/posts/professor/:id   | Listagem de todos os Posts criados pelo Professor de acordo com o seu ID|             |
| GET    | /api/posts/search          | Busca de Posts por Palavras-Chave                                       |keyword=''   |  
| POST   | /api/professor/login       | Login de Professor no sistema - Geração de Token JWT                    |             |

## Guia de Uso da API

### Autenticação - Header Token

Para os métodos de acesso exclusivo dos professores é necessário enviar como Header o Authorization Bearer gerado no método de login.
Para isso é necessário primeiramente acionar o método de login informando o usuário/senha do professor desejado e posteriormente acionar o método desejado, passando como Header o Bearer Token retornado no método de login.

Exemplo de Header nos métodos que requerem o Authorization Bearer Token de Professor através do Postman:
![image](https://github.com/user-attachments/assets/8b9d111c-a366-4b35-acfe-670f648ef9a5)

### Criar Post
- Método: `POST`
- URL: `/api/posts`
- Header: `Authorization: Bearer token_gerado_login`
- Request Body:

```json
{
  "title": "Título do Post",
  "author": "Autor do Post",
  "description": "Conteúdo/Descrição do Post",
  "idteacher": "ID do Professor que criou o Post"
}
```
- Resposta:
  - 201 Created: Retorna o post criado.
  - 400 Bad Request: Se os dados enviados para a API forem inválidos.

A propriedade CREATION (DATE) será gravado automaticamente o valor de Data/Hora atual, correspondendo a Data/Hora de criação do Post.

Exemplo de requisição via Postman:
![image](https://github.com/user-attachments/assets/e4c576fa-e30d-4994-b051-574696358f5c)

### Listar Posts (Geral)
- Método: `GET`
- URL: `/api/posts`
- Resposta:
  - 200 OK: Retorna uma lista de posts.

Exemplo de requisição via Postman:
![image](https://github.com/user-attachments/assets/0b23b240-014a-4a58-abbf-7d01566eb0ca)

### Atualizar Post
- Método: `PUT`
- URL: `/api/posts/:id`
- Header: `Authorization: Bearer token_gerado_login`
- Parâmetro de Rota: :id é um parâmetro dinâmico que será substituído pelo identificador único de um post específico. Por exemplo, se você desejar atualizar o Post de ID 1, a URL se tornaria /api/posts/1.
- Request Body:

```json
{
  "title": "Título atualizado do Post",
  "author": "Autor atualizado do Post",
  "description": "Conteúdo/Descrição atualizada do Post",
  "idteacher": "ID do Professor que atualizou o Post"
}
```

- Resposta:
  - 200 OK: Retorna o post atualizado.
  - 400 Bad Request: Se os dados enviados para a API forem inválidos.
  - 404 Not Found: Se o post não existir.

A propriedade UPDATE_DATE (DATE) será gravado automaticamente o valor de Data/Hora atual, correspondendo a Data/Hora de atualização dos Dados do Post.

Exemplo de requisição via Postman:
![image](https://github.com/user-attachments/assets/f80b42e7-1646-48f7-ac71-ecc66dd495b0)

### Buscar Post específico por ID
- Método: `GET`
- URL: `/api/posts/:id`
- Parâmetro de Rota: :id é um parâmetro dinâmico que será substituído pelo identificador único de um post específico. Por exemplo, se você desejar buscar o Post de ID 1, a URL se tornaria /api/posts/1.
- Resposta:
  - 200 OK: Retorna o post correspondente.
  - 400 Bad Request: ID enviado está em formato inválido.
  - 404 Not Found: Se o post não existir.

Exemplo de requisição via Postman:
![image](https://github.com/user-attachments/assets/a935780e-2e83-4516-8cf9-ed275a303fc8)

### Deletar Post
- Método: `DELETE`
- URL: `/api/posts/:id`
- Header: `Authorization: Bearer token_gerado_login`
- Parâmetro de Rota: :id é um parâmetro dinâmico que será substituído pelo identificador único de um post específico. Por exemplo, se você desejar excluir o Post de ID 1, a URL se tornaria /api/posts/1.
- Resposta:
  - 204 No Content: Se o post foi deletado com sucesso.
  - 404 Not Found: Se o post não existir.

Exemplo de requisição via Postman:
![image](https://github.com/user-attachments/assets/771ec8a9-0f7c-415d-bff9-31992354c017)

### Listar Posts por Professor
- Método: `GET`
- URL: `/api/posts/professor/:id`
- Header: `Authorization: Bearer token_gerado_login`
- Parâmetro de Rota: :id é um parâmetro dinâmico que será substituído pelo identificador único de um professor específico. Por exemplo, se você desejar todos os Posts criados pelo professor de ID 1, a URL se tornaria /api/posts/professor/1.
- Resposta:
  - 200 OK: Retorna uma lista de posts do professor respectivo.
  - 404 Not Found: Se não existir nenhum post para o professor informado.

Exemplo de requisição via Postman:
![image](https://github.com/user-attachments/assets/ae5d7a07-8b5a-4948-83f0-2f1f9a59d338)

### Buscar Posts

- Método: `GET`
- URL: `/api/posts/search`
- Descrição: Este endpoint permite buscar posts com base em critérios de pesquisa.

#### Parâmetros de Consulta

Você pode usar o seguinte parâmetro de consulta para refinar sua busca:

- **`keyword`**: Filtra os posts pelo título ou conteúdo.

### Exemplo de Requisição

Para buscar posts que contêm o título "software", você pode fazer uma requisição da seguinte forma:

```http
GET /api/posts/search?title=software HTTP/1.1
Host: localhost:3000
```

- Resposta:
  - 200 OK: Retorna uma lista de posts que correspondem aos critérios de pesquisa.
  - 400 Bad Request: Palavra-chave inválida ou enviada com conteúdo vazio.
  - 404 Not Found: Se não existir nenhum post para a palavra-chave informada.

Exemplo de requisição via Postman:
![image](https://github.com/user-attachments/assets/1cbbe44d-e188-4198-a172-c19c0ae9f4d1)

### Login - Professor
- Método: `POST`
- URL: `/api/professor/login`
- Request Body:

```json
{
    "username": "Nome Professor(a)",
    "password": "Senha Professor(a)"
}
```
- Resposta:
  - 200 OK: Retorna um Token gerado através do JWT.
  - 400 Bad Request: Se os dados enviados para a API forem inválidos.
  - 404 Not Found: Se Usuário ou Senha fornecidas forem inválidas.
 
Exemplo de requisição via Postman:
![image](https://github.com/user-attachments/assets/8b5e1eaf-51d2-48f2-9867-75ba58e507a0)

    
## Testes

Na API, o Jest e o Supertest são utilizados para criar e executar testes automatizados, garantindo que os endpoints e a lógica da aplicação funcionem como esperado. 
Aqui está uma explicação detalhada de como o Jest pode ser utilizado na API:

**1. Configuração do Jest**

Primeiro, o Jest é configurado para funcionar com o TypeScript e outras bibliotecas necessárias. Isso é feito por meio da instalação do ts-jest, que permite rodar testes diretamente em arquivos .ts sem a necessidade de transpilar manualmente para JavaScript.
Nesse projeto, o Jest está configurado no ambiente de desenvolvimento (devDependencies) para garantir que os testes sejam executados apenas durante o desenvolvimento e não em produção.

**2. Escrevendo Testes**

O Jest permite escrever testes de unidade e de integração para a API de Posts. Cada teste pode verificar o comportamento de uma parte específica da aplicação, no caso desenvolvido irá ser aplicado como Testes de Unidade: 
- Testes de Unidade: Testam funções ou métodos isolados, como a validação dos dados de entrada.

**3. Benefícios de Usar o Jest/Supertest**

- Detecção de Erros: Testes automatizados ajudam a detectar erros no código antes de chegar à produção.
- Confiança nas Alterações: Como os testes são automatizados, você pode fazer alterações na API e rodar os testes para garantir que nada foi quebrado.
- Testes Reprodutíveis: Eles podem ser rodados várias vezes, o que torna o processo de desenvolvimento mais robusto.

Dessa forma, ao usar o Jest, garantimos que a lógica de negócio, validação de dados e funcionamento dos endpoints estejam sendo validados continuamente. Isso contribui para a estabilidade da aplicação e evita problemas em produção.
Além disso, o Supertest garante a execução dos testes simulando as requisições HTTP da API e validando os endpoints em relação ao status e corpo de resposta. Focado exclusivamente em testes de APIs, o Supertest é usado junto com Jest para validar a interação entre o cliente e o servidor.

Para instalação das dependências utilizadas na execução dos testes em ambiente de desenvolvimento, execute o comando:

```bash
npm install --save-dev jest supertest
```

O comando instalará:

- jest: Um framework de testes em JavaScript que permite escrever e executar testes automatizados. Ele é bastante usado para testar aplicativos Node.js e front-end.
- supertest: Uma biblioteca que facilita o teste de APIs HTTP. Ela permite que você envie requisições a servidores HTTP e faça assertivas sobre as respostas recebidas, sem precisar de um cliente HTTP externo.

```bash
npm install --save-dev ts-jest @types/jest @types/supertest
```

O comando instalará:

- ts-jest: Um pré-processador que permite rodar arquivos TypeScript no Jest. Ele compila os arquivos .ts antes de rodar os testes.
- @types/jest: Tipos TypeScript para o Jest. Isso permite usar o Jest com TypeScript sem problemas de tipagem e obter autocompletar e verificações de tipo adequadas.
- @types/supertest: Tipos TypeScript para Supertest.

Para execução dos testes unitários acessando os endpoints com conexão ao banco, crie um arquivo ".env.test" conforme o ".env.test.example", contendo as seguintes informações:
```plaintext
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_NAME=nome_do_banco
DB_PORT=5432 -> porta Banco de Dados
PORT=3000 -> porta Aplicação
NODE_ENV=development -> Executa testes com conexão ao banco de dados, para não conectar com o BD informar "test"
NODE_ENV_TEST=development -> Executa testes com conexão ao banco de dados, para testes em mock informar "test"
```

Para rodar os testes unitários, execute o seguinte comando:
  ```bash
  npm run test
  ```

O Jest é utilizado para testes unitários. Cada método da API (criação, listagem, obtenção, atualização, exclusão) possuem testes correspondentes que simulam o comportamento da API.

Execução de testes em ambiente local:

![image](https://github.com/user-attachments/assets/6197085f-f458-4923-b82d-365710442415)
![image](https://github.com/user-attachments/assets/cb292964-eb12-463c-97e7-e6aeffc6fd70)

**CI/CD**
O workflow de CI/CD (Continuous Integration/Continuous Deployment) utilizado na API de Posts automatiza o processo de integração e implantação da aplicação, garantindo que cada mudança no código seja testada, validada e implantada de maneira consistente e eficiente.

Principais Funcionalidades:

- **Integração Contínua (CI):**
Cada vez que uma nova alteração é enviada para o repositório (por exemplo, por meio de um pull request ou push), o workflow executa automaticamente uma série de verificações e testes.
Essas verificações incluem a execução de testes unitários com Jest via conexão ao BD e em Mock, e a verificação de que a aplicação pode ser construída sem erros.

- **Deployment Automatizado (CD):**
Após a execução bem-sucedida dos testes, o workflow utiliza Docker para criar uma imagem da aplicação e fazer o push para o Docker Hub, utilizando as credenciais (DOCKER_USERNAME e DOCKER_PASSWORD).
Em ambientes de produção, o workflow pode automatizar o deployment da imagem Docker para servidores ou serviços de nuvem, utilizando a imagem construída durante o processo de integração.

- **Segurança e Autenticação:**
Variáveis como JWT_SECRET garantem que a autenticação da API seja segura e configurada corretamente em todos os ambientes (desenvolvimento, testes e produção).
Outras variáveis de ambiente, como DB_HOST, DB_NAME, e DB_PORT, são utilizadas para configurar o banco de dados PostgreSQL, garantindo que os dados sejam persistidos corretamente.

**Benefícios:**
  
- **Automação:** Elimina a necessidade de processos manuais para testar e implantar a aplicação.
- **Confiabilidade:** Garante que cada alteração no código seja verificada antes de ser mesclada ou implantada, evitando bugs em produção.
- **Rapidez:** A automação do ciclo de desenvolvimento permite feedback rápido e maior eficiência na entrega de novas funcionalidades.

O CI/CD torna o desenvolvimento da API de Posts mais ágil e confiável, facilitando a manutenção e o crescimento contínuo do projeto.

Variáveis a serem configuradas no ambiente do Github:

- **DB_HOST**: O endereço do host onde o banco de dados PostgreSQL está rodando (por exemplo, localhost ou o endereço de um servidor remoto).
- **DB_NAME**: O nome do banco de dados PostgreSQL que a aplicação irá acessar ou usar durante a execução dos testes.
- **DB_PASSWORD**: A senha do usuário do banco de dados PostgreSQL, necessária para autenticação durante a conexão com o banco.
- **DB_PORT**: A porta na qual o banco de dados PostgreSQL está rodando (por padrão, é 5432).
- **DB_USER**: O nome de usuário que será utilizado para se conectar ao banco de dados PostgreSQL.
- **DOCKER_PASSWORD**: A senha do usuário da conta Docker Hub, usada para autenticar o login no Docker Hub durante o processo de build e push de imagens Docker.
- **DOCKER_USERNAME**: O nome de usuário da conta Docker Hub, utilizado para login no Docker Hub.
- **EMAIL_PULLREQUEST**: O e-mail para notificação de atualizações e mudanças nos Pull Requests durante o ciclo de desenvolvimento.
- **JWT_SECRET**: Uma chave secreta utilizada para assinar e verificar tokens JWT (JSON Web Tokens) usados para autenticação segura na API.
- **NODE_ENV**: Define o ambiente em que a aplicação está rodando, como development, production ou test. Controla o comportamento da aplicação com base no ambiente.
- **NODE_ENV_TEST**: Similar ao NODE_ENV, porém é utilizado especificamente para definir que a aplicação está rodando no ambiente de testes.
- **PORT**: A porta na qual o servidor da API será executado. Por exemplo, 3000 se a aplicação estiver rodando localmente.

Essas variáveis são fundamentais para configurar o ambiente de execução da aplicação e garantir que o CI/CD funcione corretamente no GitHub.

A API possui o diretório .github/workflows com o arquivo main.yml que através do workflow do GitHub Actions servirá para configurar o processo de integração contínua (CI/CD).
Nesse arquivo foi configurado para que a branch "develop" realize os processos do workflow de CI/CD (Integração Contínua e Entrega Contínua), automatizando o processo de desenvolvimento, teste e implantação de software. Ele serve para garantir que o código seja integrado regularmente, testado automaticamente, e, em seguida, implantado de forma contínua ou quando uma nova versão estiver pronta, reduzindo o risco de erros e acelerando entregas. Resumidamente, o workflow de CI/CD ajuda a automatizar a entrega de software com mais qualidade, eficiência e rapidez.

Etapas de execução das "Actions" configuradas e executadas com sucesso:
![image](https://github.com/user-attachments/assets/67fbab90-e185-4d12-b248-3dae7c82c1a4)
![image](https://github.com/user-attachments/assets/ab61f0e3-19e5-461a-9dbf-c74d27643f8d)
![image](https://github.com/user-attachments/assets/b0b140c7-e975-4f46-b78e-a378901032f1)

## Validação de Campos com Zod

A API de Posts utiliza o Zod para realizar a validação de dados nos endpoints, garantindo que os campos fornecidos nas requisições atendam às regras esperadas, como obrigatoriedade, tipos de dados e tamanho de campos. 
O Zod oferece uma maneira simples e poderosa de definir schemas de validação para diferentes campos de uma maneira declarativa.
O exemplo abaixo demonstra a utilização do Zod no endpoint de criação de Posts (/api/posts), quando não enviando a propriedade "title", retornando erro "400 - Bad Request" do campo "title" como "Requerido".

![image](https://github.com/user-attachments/assets/fd4fd5b3-6653-4d87-838d-be633a4a0bf1)

A imagem abaixo exibe outro exemplo da utilização do Zod, em que é retornado erro "400 - Bad Request", informando que que o campo "title" é obrigatório e deve conter no mínimo 10 caracteres.
Nesse caso é validado o conteúdo do campo "title", sendo necessário conter no mínimo 10 caracteres no título do Post para realizar a inserção no Banco de Dados.

![image](https://github.com/user-attachments/assets/fcc723aa-1a46-4a8b-ac5f-0f9bae599a68)

## Swagger

O Swagger é utilizado na API de Posts para documentar e facilitar a interação com a API. Ele gera uma interface de usuário interativa que permite aos desenvolvedores e consumidores da API visualizar e testar os endpoints disponíveis.
Com a implementação do Swagger, a API de Posts se torna mais acessível e fácil de usar, contribuindo para uma melhor experiência de desenvolvimento e integração.

As principais funções do Swagger na API incluem:

- **Documentação:** O Swagger gera documentação a partir das definições da API, garantindo que os desenvolvedores tenham acesso a informações atualizadas sobre os endpoints, parâmetros e respostas.
- **Interface Interativa:** A interface do Swagger permite que os usuários testem os endpoints diretamente do navegador, enviando requisições e visualizando as respostas, o que facilita a compreensão de como a API funciona.
- **Padronização:** Ao seguir o padrão OpenAPI, o Swagger ajuda a manter a consistência na documentação da API, tornando mais fácil para novos desenvolvedores entenderem como interagir com ela.
- **Facilidade de Integração:** A documentação gerada pode ser utilizada por ferramentas de automação e outros serviços, facilitando a integração com outras aplicações e sistemas.
- **Aprimoramento da Comunicação:** O Swagger serve como uma forma clara de comunicação entre a equipe de desenvolvimento e os usuários da API, permitindo que todos tenham um entendimento comum sobre as funcionalidades e limitações da API.

Para acessar o Swagger utilize a rota `/api-posts`, exemplo: `http://localhost:3000/api-posts`

![image](https://github.com/user-attachments/assets/963fd8a2-3e8d-4904-985a-675be645cf58)

Exemplo da utilização do Swagger no método de Busca Post por Keyword (/api/posts/search), com retorno 200 e o Post corresponde a palavra que efetuou busca "node":

![image](https://github.com/user-attachments/assets/e70e9bd1-2bb2-4c0b-95e2-e2bb1afd38ff)

Exemplo da utilização do Swagger no método de Busca Post por Keyword (/api/posts/search), com retorno 404 com nenhum Post encontrado para a palavra chave que efetuou a busca "keyword":

![image](https://github.com/user-attachments/assets/c4d349a4-4b07-4b86-be42-5eb6d9f02675)

## Principais Dificuldades Encontradas no Desenvolvimento da API

O desenvolvimento da API apresentou algumas dificuldades, das quais incluem:

**- Configuração do Ambiente:**
A configuração inicial do ambiente de desenvolvimento com Node.js, TypeScript e PostgreSQL demandou atenção para garantir que todas as dependências estivessem corretamente instaladas e configuradas, especialmente ao utilizar Docker.

**- Estruturação do Projeto:**
Definir uma arquitetura modular e organizada para o projeto foi um desafio. Foi necessário decidir como dividir responsabilidades entre os arquivos e pastas, como controllers, models, routes e middlewares, garantindo que o código fosse fácil de manter e escalar.

**- Validação de Dados:**
A implementação de validações eficazes para garantir que os dados recebidos pela API estivessem em conformidade com as regras de negócio exigiu um planejamento cuidadoso. O uso de bibliotecas como Zod foi fundamental, mas também trouxe a necessidade de definir esquemas de validação claros.

**- Testes Automatizados:**
Escrever testes automatizados utilizando Jest e Supertest demandou um entendimento profundo da lógica da aplicação. Criar mocks e simulações adequadas para testes unitários e de integração foi um passo importante, mas exigente.

**- Integração Contínua e Deploy:**
A configuração do pipeline de CI/CD no GitHub para automação de testes e deploy foi uma etapa complexa. Garantir que todas as variáveis de ambiente e segredos estivessem configurados corretamente e que o processo de build funcionasse sem problemas apresentou desafios.

Essas dificuldades foram superadas com pesquisa, testes e ajustes contínuos, resultando em uma API robusta e funcional.
