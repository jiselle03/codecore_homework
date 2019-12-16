const express = require("express");
const router = express.Router();

const queries = require("../db/queries");

// Home where is edit ?
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

router.post("/cohorts", (req, res, next) => {
  queries.add({
    name: req.body.name,
    members: req.body.members,
    logoUrl: req.body.logoUrl
  }).then(cohort => {
    res.redirect('/cohorts');
  });
});

// Delete // but where you are passing id to delete, neither in payload, nor in query string ????
router.delete("/cohorts/:id", (req, res) => {
  queries.delete(req.params.id).then(() => {
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

// Edit //pls tell where is the problem ?
router.get("/cohorts/:id/edit", (req, res) => {
  queries.getOne(req.params.id).then(cohort => {
    res.render('edit', { cohort });
  });
});
// It looks like it is running now but it doesn't save the edit
//where is edit in querirs ? how to delete ?
router.patch('/cohorts/:id', (req, res) => {
  console.log("IN PATCH")
  queries.edit(req.params.id, {
    name: req.body.name,
    members: req.body.members,
    logoUrl: req.body.logoUrl
  }).then(() => {
     res.redirect('/cohorts');
    console.log("PATCH DONE")
    //res.redirect('/'); // where is the get , but that has edit at end ??,
  });
});
// do we need 2 gets for edit page?, no
module.exports = router;