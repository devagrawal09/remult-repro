import { Entity, Fields } from "remult";

@Entity("challenges", { allowApiCrud: false })
export class Challenge {
  @Fields.date({ allowNull: true })
  created!: Date;

  @Fields.date({ allowNull: true })
  updated!: Date;
}
