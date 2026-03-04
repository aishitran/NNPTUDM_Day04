const express = require("express");
const router = express.Router();
const { dataRole, dataUser } = require("../utils/data");


// GET all roles
router.get("/", (req, res) => {
  res.json(dataRole);
});


// GET role by id
router.get("/:id", (req, res) => {
  const role = dataRole.find(r => r.id === req.params.id);

  if (!role) return res.status(404).json({ message: "Role not found" });

  res.json(role);
});


// CREATE role
router.post("/", (req, res) => {

  const newRole = {
    id: "r" + (dataRole.length + 1),
    name: req.body.name,
    description: req.body.description,
    creationAt: new Date(),
    updatedAt: new Date()
  };

  dataRole.push(newRole);

  res.status(201).json(newRole);
});


// UPDATE role
router.put("/:id", (req, res) => {

  const role = dataRole.find(r => r.id === req.params.id);

  if (!role) return res.status(404).json({ message: "Role not found" });

  role.name = req.body.name || role.name;
  role.description = req.body.description || role.description;
  role.updatedAt = new Date();

  res.json(role);
});


// DELETE role
router.delete("/:id", (req, res) => {

  const index = dataRole.findIndex(r => r.id === req.params.id);

  if (index === -1)
    return res.status(404).json({ message: "Role not found" });

  dataRole.splice(index, 1);

  res.json({ message: "Deleted successfully" });
});


//GET USERS BY ROLE
router.get("/:id/users", (req, res) => {

  const roleId = req.params.id;

  const users = dataUser.filter(u => u.role.id === roleId);

  res.json(users);
});


module.exports = router;