const express = require('express');
const server = express();
server.use(express.json());

let counter = 0;

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

server.use((req, res,next)=>{
  console.time('Time');
  counter++;
  console.log(`Request number: ${counter} | method url:${req.method} ${req.url} | ${res.finished}`);
  next();
  console.timeEnd('Time')
});

function checkDataJsonExists (req, res, next) {

  if(!req.body.id) {
    return res.status(400).json({error: 'Id is required'})
  }
  if(!req.body.title) {
    return res.status(400).json({error: 'Title is required'});
  }
  return next();
}

function checkIdInArray (req, res, next){
  const index  = projects.findIndex( (projects) => projects.id === req.params.id);
  if(index == -1){
    return res.status(404).json({error: 'Id not found'});
  }
  res.index = index;
  return next();
}


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

server.get('/projects', (req, res) =>{
  return res.json(projects);
});

server.get('/projects/:id', checkIdInArray, (req, res) =>{
  return res.json(projects[res.index]);
});

server.delete('/projects/:id', checkIdInArray, (req, res) => {
   projects.splice(res.index, 1);
   return res.send();
});

/*
server.post('/projects/:id/task', (req, res) => {
  const {id, tasks} = req.body;

})
*/


server.listen(3000);