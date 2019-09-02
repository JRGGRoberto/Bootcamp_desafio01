/**
 * Este é um programa atendendo o desafio 01 
 * Boot Camp GoStak Rocketseat
 * JRRGGRoberto
 * Roberto Góes
 * jrggroberto@gmail.com
 * 
 * https://github.com/Rocketseat/bootcamp-gostack-desafio-01/blob/master/README.md#desafio-01-conceitos-do-nodejs
 * 
 */

const express = require('express');
const server = express();
server.use(express.json());

let counter = 0;
// Iniciei com com alguns exemplos para dinamizar os testes
const projects = [
  {
    "id": "SDU",
    "title": "Santos Dumont",
    "tasks": []
  },
  {
    "id": "GIG",
    "title": "Galegão",
    "tasks": []
  },
  {
    "id": "CGH",
    "title": "Congonhas",
    "tasks": []
  },
  {
    "id": "LIS",
    "title": "Portela",
    "tasks": []
  }
];
/*Crie um middleware global chamado em todas requisições que imprime 
(console.log) uma contagem de quantas requisições foram feitas na aplicação até então;
==>Ficou mais incrementado  */
server.use((req, res,next)=>{
  console.time('Time');
  counter++;
  console.log(`Request number: ${counter} | method url:${req.method} ${req.url}`);
  next();
  console.timeEnd('Time')
});

//Middleware 2
function checkDataJsonExists (req, res, next) {
/*
  if(!req.body.id) {
    return res.status(400).json({error: 'Id is required'})
  }*/

  if(!req.body.title) {
    return res.status(400).json({error: 'Title is required'});
  }
  return next();
}

//Middleware 3
function checkIdInArray (req, res, next){
  const index  = projects.findIndex( (projects) => projects.id === req.params.id);
  if(index == -1){
    return res.status(404).json({error: 'Id not found'});
  }
  res.index = index;
  return next();
}

/*POST /projects: A rota deve receber id e title dentro corpo de cadastrar um 
novo projeto dentro de um array no seguinte formato: 
{ id: "1", title: 'Novo projeto', tasks: [] };
Certifique-se de enviar tanto o ID quanto o título do projeto no formato 
string com àspas duplas.*/
server.post('/projects', checkDataJsonExists, (req, res) => {
  const { id, title } = req.body;
  const project = {
      id: id,
      title: title,
      tasks: []
    };
  projects.push(project);
  return res.json(projects);
});

//GET /projects: Rota que lista todos projetos e suas tarefas;
server.get('/projects', (req, res) =>{
  return res.json(projects);
});
// - plus JRGG Listar um expecífico projeto
server.get('/projects/:id', checkIdInArray, (req, res) =>{
  return res.json(projects[res.index]);
});

//DELETE /projects/:id: A rota deve deletar o projeto com o id presente nos parâmetros da rota;
server.delete('/projects/:id', checkIdInArray, (req, res) => {
  projects.splice(res.index, 1);
  return res.send();
});

//PUT /projects/:id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;
server.put('/projects/:id', checkIdInArray, checkDataJsonExists, (req, res) => {
  /*const index = res.index;
  const  title = req.body.title;
  projects[index].title = title; */
  projects[res.index].title = req.body.title;
  return res.json(projects);
});

server.post('/projects/:id/tasks', checkIdInArray, checkDataJsonExists, (req, res) => {
  const index = res.index;
  projects[index].tasks.push(req.body.title);
  return res.json(projects);
});


server.listen(3000);