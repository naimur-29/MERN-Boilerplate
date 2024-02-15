const express = require("express");

// local:
const todoController = require("../controllers/todo.controller");

const router = express.Router();

// POST ROUTES:
router.post("/", todoController.add);

// DELETE ROUTES:
router.delete("/", todoController.deleteAll);
router.delete("/:id", todoController.deleteAllByProperty);

// PUT ROUTES:
router.put("/:id", todoController.updateByProperty);

// GET ROUTES:
router.get("/", todoController.getAll);
// GET.SEARCH ROUTES:
router.get("/search", todoController.searchByProperties);
router.get("/contains", todoController.containsInProperty);
router.get("/:id", todoController.getAllByProperty);

module.exports = router;
