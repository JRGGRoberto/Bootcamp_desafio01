const express = require('express');
const server = express();
server.use(express.json());

const projects = [];

function checkDataJsonExists(req, res, next){

  if(!req.body.id) {
    return res.status(400).json({error: 'Id is required'})
  }
  if(!req.body.title) {
    return res.status(400).json({error: 'Title is required'});
  }
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

/*
server.post('/projects/:id/task', (req, res) => {
  const {id, tasks} = req.body;

})
*/


server.listen(3000);