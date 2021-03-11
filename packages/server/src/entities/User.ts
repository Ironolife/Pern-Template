import { Field, ObjectType, registerEnumType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

enum Role {
  'ADMIN' = 'ADMIN',
  'BASE' = 'BASE',
}
registerEnumType(Role, { name: 'Role' });

@ObjectType()
@Entity()
class User extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn({ unique: true })
  @Index({ unique: true })
  id!: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at!: Date;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Field(() => Role)
  @Column({ type: 'enum', enum: Role, default: Role.BASE })
  role!: Role;
}

export default User;
