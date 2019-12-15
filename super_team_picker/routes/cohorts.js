const express = require("express");
const router = express.Router();

const queries = require("../db/queries");

// Home
router.get("/", (req, res) => {
  res.render('home');
});

// List All
router.get("/cohorts", (req, res) => {
  queries.getAll().then(cohorts => {
    res.render('cohorts', { cohorts });
  });
});

// Add
router.get("/cohorts/new", (req, res) => {
  res.render("new");
});

router.post("/cohorts", (req, res) => {
  queries.add({
    name: req.body.name,
    members: req.body.members,
    logoUrl: req.body.logoUrl
  }).then(cohort => {
    res.redirect('/cohorts');
  });
});

// Show One
router.get("/cohorts/:id", (req, res) => {
  const method = req.query.method;
  const quantity = req.query.quantity;
  const { id } = req.params;
  queries.getOne(id).then(cohort => {
    res.render('show', { cohort, method, quantity });
  });
});

// Edit
router.get("/cohorts/:id/edit", (req, res) => {
  const { id } = req.params;
  queries.getOne(id).then(cohort => {
    res.render('edit', { cohort });
  });
});

router.patch('/cohorts', (req, res) => {
  queries.edit({
    name: req.body.name,
    members: req.body.members,
    logoUrl: req.body.logoUrl
  }).then(cohort => {
    res.redirect('/cohorts');
  });
});

// Delete
router.delete("/cohorts/:id", (req, res) => {
  queries.delete(req.params.id).then(() => {
  });
  res.redirect('/cohorts');
});

module.exports = router;