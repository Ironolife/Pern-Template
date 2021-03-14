import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTables1615697479066 implements MigrationInterface {
    name = 'UpdateTables1615697479066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "user_role_enum" AS ENUM('ADMIN', 'BASE')
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "email" character varying NOT NULL,
                "role" "user_role_enum" NOT NULL DEFAULT 'BASE',
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_cace4a159ff9f2512dd4237376" ON "user" ("id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_cace4a159ff9f2512dd4237376"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TYPE "user_role_enum"
        `);
    }

}
