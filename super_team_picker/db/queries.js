const knex = require("./client");

module.exports = {
  // get all cohorts
  getAll() {
    return knex("cohorts").select("*");
  },
  // get one cohort
  getOne(id) {
    return knex("cohorts")
      .where("id", id)
      .first();
  },
  // create new cohort
  add(cohort) {
    return knex("cohorts").insert(cohort, "*");
  },
  // edit cohort
  edit(id, cohort) {
    console.log(id,":",cohort);
    return knex("cohorts")
      .where("id", id)
      .update(cohort, "*");
  },
  // delete cohort
  delete(id) {
    return knex("cohorts")
      .where("id", id)
      .del();
  }
};