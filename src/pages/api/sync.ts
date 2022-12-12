import { NextApiRequest, NextApiResponse } from "next";
import { Challenge } from "../../server/entities";

import { api } from "./remult/[...remult]";

const syncHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const remult = await api.getRemult(req);

    const challengeRepo = remult.repo(Challenge);

    // const challenge = challengeRepo.create({
    //   created: "2022-12-01T17:29:51.811Z",
    //   updated: "2022-12-12T03:38:29.657Z",
    // });

    const challenge = challengeRepo.create({
      created: new Date("2022-12-01T17:29:51.811Z"),
      updated: new Date("2022-12-12T03:38:29.657Z"),
    });

    try {
      console.log({ challenge });

      await challengeRepo.save(challenge);
    } catch (error: any) {
      console.log({ challenge });

      throw {
        message: `Error saving challenge: ${error.message}`,
        error,
        data: challenge,
      };
    }

    res.status(200).json({ message: "Success" });
  } catch (error: any) {
    console.log({ error });

    res.status(500).json({ error });
  }
};

export default syncHandler;
