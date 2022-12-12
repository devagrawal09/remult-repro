import knex from "knex";
import { Remult } from "remult";
import { KnexDataProvider, KnexSchemaBuilder } from "remult/remult-knex";

export const db = knex({
  client: "sqlite3",
  connection: { filename: "./db.sqlite" },
});

export const knexProvider = new KnexDataProvider(db);

new KnexSchemaBuilder(db)
  .verifyStructureOfAllEntities(new Remult(knexProvider))
  .then(() => {
    console.log("Database schema verified");
  });
