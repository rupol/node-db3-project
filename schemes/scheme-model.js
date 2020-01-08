const db = require("../utils/db");

function find() {
  return db("schemes").select();
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
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

module.exports = {
  find,
  findById,
  add,
  update
};
