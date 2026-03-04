var express = require('express');
var router = express.Router();

// DATA
let { dataUser, dataRole } = require('../utils/data'); 


/* GET all users */
// localhost:3000/api/v1/users
router.get('/', function(req, res, next) {
  res.json(dataUser);
});


/* GET user by username */
// localhost:3000/api/v1/users/nguyenvana
router.get('/:username', function(req, res, next) {

  const user = dataUser.find(u => u.username === req.params.username);

  if(!user){
    return res.status(404).json({message: "User not found"});
  }

  res.json(user);
});


/* CREATE user */
// POST localhost:3000/api/v1/users
router.post('/', function(req, res){

  const role = dataRole.find(r => r.id === req.body.roleId);

  if(!role){
    return res.status(404).json({message:"Role not found"});
  }

  const newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    status: true,
    loginCount: 0,
    role: role,
    creationAt: new Date(),
    updatedAt: new Date()
  };

  dataUser.push(newUser);

  res.status(201).json(newUser);
});


/* UPDATE user */
// PUT localhost:3000/api/v1/users/nguyenvana
router.put('/:username', function(req,res){

  const user = dataUser.find(u => u.username === req.params.username);

  if(!user){
    return res.status(404).json({message:"User not found"});
  }

  user.email = req.body.email || user.email;
  user.fullName = req.body.fullName || user.fullName;
  user.updatedAt = new Date();

  res.json(user);
});


/* DELETE user */
// DELETE localhost:3000/api/v1/users/nguyenvana
router.delete('/:username', function(req,res){

  const index = dataUser.findIndex(u => u.username === req.params.username);

  if(index === -1){
    return res.status(404).json({message:"User not found"});
  }

  dataUser.splice(index,1);

  res.json({message:"Deleted successfully"});
});

module.exports = router;