import { Entity, Fields, Field } from "remult";
export type ChallengeId = string & { _challengeId: never };
export type GroupId = string & { _groupId: never };
export type GroupLangId = string & { _groupLangId: never };

@Entity("guilds", { allowApiCrud: false })
export class Group {
  @Fields.string()
  id!: GroupId;

  @Fields.string()
  name!: string;

  @Fields.boolean()
  langAll!: boolean;

  @Fields.string()
  classification?: string;

  @Fields.string()
  subclassification?: string;

  @Fields.string()
  memberColor!: string;

  @Fields.object<GroupLang>((o, remult) => {
    o.serverExpression = (group) =>
      remult.repo(GroupLang).find({ where: { groupId: group.id } });
  })
  langs!: GroupLang[];
}

@Entity("guild_langs", { allowApiCrud: false })
export class GroupLang {
  @Fields.string()
  id!: GroupLangId;

  @Fields.string()
  groupId!: string;

  @Fields.string()
  lang!: string;

  @Fields.boolean()
  primary!: boolean;

  @Field(() => Group)
  group!: Group;
}

@Entity("challenges", { allowApiCrud: false })
export class Challenge {
  @Fields.string()
  id!: ChallengeId;

  @Fields.string()
  name!: string;

  @Fields.string()
  summary!: string;

  @Fields.string()
  description?: string;

  @Fields.number()
  prize!: number;

  @Fields.boolean()
  official!: boolean;

  @Fields.number()
  memberCount!: number;

  @Fields.date({ allowNull: true })
  created!: string;

  @Fields.date({ allowNull: true })
  updated!: string;

  @Fields.boolean()
  noOwner!: boolean;

  @Fields.object()
  taskCount!: {
    total: number;
    habit: number;
    daily: number;
    todo: number;
    reward: number;
  };

  @Field(() => Group)
  group!: Group;

  @Fields.string()
  groupId!: string;
}
