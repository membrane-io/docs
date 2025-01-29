import styles from "./typeMembers.module.css";
import type { Typed } from "../Type";
import Type from "../Type";

interface Param {
  name: string;
  type: string;
  ofType?: string;
  optional?: boolean;
}

interface Member {
  name: string;
  type: string;
  ofType?: string;
  params?: Param[];
  hints?: Record<string, any>;
  description?: string;
}

type Action = Member;
type Event = Member;
type Field = Member;

export interface SchemaType {
  name: string;
  description?: string;
  fields?: Field[];
  actions?: Action[];
  events?: Event[];
}

export interface Schema {
  types: SchemaType[];
}

export interface Memconfig {
  dependencies: { [key: string]: string };
  schema: Schema;
}

const TypeMembers = ({ type }: { type: SchemaType }) => {
  const fields = type.fields ?? [];
  const actions = type.actions ?? [];
  const events = type.events ?? [];
  return (
    <div className={styles.type}>
      <table className={styles.membersTable}>
        <tbody>
          {fields.map((member) => (
            <MemberRow key={member.name} member={member} kind={"field"} />
          ))}
          {actions.map((member) => (
            <MemberRow key={member.name} member={member} kind={"action"} />
          ))}
          {events.map((member) => (
            <MemberRow key={member.name} member={member} kind={"event"} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

type MemberKind = "field" | "action" | "event";

const MemberRow = ({ member, kind }: { member: Field; kind: MemberKind }) => {
  const params = member.params ?? [];
  return (
    <tr className={styles.memberRow}>
      <td className={styles.member}>
        <span className={`${styles[kind]} ${styles.member}`}>
          {member.name}
        </span>
        {params.length > 0 && (
          <span className={styles.params}>
            (
            {params.map((param, i) => (
              <span key={param.name}>
                <span className={styles.param}>{param.name}</span>
                {i < (params?.length ?? 0) - 1 && ", "}
              </span>
            ))}
            )
          </span>
        )}
      </td>
      <td>
        <Type type={member as Typed} onClick={() => {}} />
      </td>
    </tr>
  );
};

export default TypeMembers;
