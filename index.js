const express = require('express');
const server = express();
server.use(express.json());

const projects = [
  {
    "id": "c",
    "title": "Bravo",
    "tasks": []
  },
  {
    "id": "a",
    "title": "Bravo",
    "tasks": []
  },
  {
    "id": "z",
    "title": "Bravo",
    "tasks": []
  }

];

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