import { NextApiRequest, NextApiResponse } from "next";
import { createRemultServer } from "remult/server";
import { Challenge } from "../../../server/entities";
import { createKnexDataProvider } from "remult/remult-knex";

export const api = createRemultServer({
  entities: [Challenge],
  dataProvider: createKnexDataProvider(
    {
      client: "sqlite3",
      connection: { filename: "./db.sqlite" },
    },
    true
  ),
});

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  await api.handle(_req, res);
};

export default handler;
