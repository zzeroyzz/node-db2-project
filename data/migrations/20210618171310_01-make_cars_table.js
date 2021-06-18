
exports.up = function(knex) {
  return knex.schema.createTable("cars", table =>{
    table.increments()//default id
    table.text("vin",128).unique().notNullable()//vin column vin needs to be unique and require(notnullable)
    table.text("make",128).notNullable()
    table.text("model",128).notNullable()
    table.integer("mileage").notNullable()
    table.text("title",128)
    table.text("transmission",128)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars")
};
