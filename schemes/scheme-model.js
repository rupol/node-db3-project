const db = require("../utils/db");

function find() {
  return db("schemes").select();
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db("schemes")
    .join("steps", "schemes.id", "steps.scheme_id")
    .where({ scheme_id: id })
    .orderBy("step_number")
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    );
}

async function add(scheme) {
  const [id] = await db("schemes").insert(scheme);
  return db("schemes")
    .where({ id })
    .first();
}

async function update(changes, id) {
  await db("schemes")
    .where({ id })
    .update(changes);
  return findById(id);
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};
