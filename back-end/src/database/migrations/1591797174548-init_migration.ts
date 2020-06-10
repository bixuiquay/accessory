import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigration1591797174548 implements MigrationInterface {
    name = 'initMigration1591797174548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."product_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying, "createdById" character varying, "updatedBy" character varying, "updatedById" character varying, "name" character varying NOT NULL, CONSTRAINT "PK_74bb5ea024ffab68e4fcba9c9b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying, "createdById" character varying, "updatedBy" character varying, "updatedById" character varying, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, "quantity" integer NOT NULL, "image" character varying, "listImage" jsonb NOT NULL, "typeId" uuid, CONSTRAINT "REL_b6bfb1232ba61272794a694349" UNIQUE ("typeId"), CONSTRAINT "PK_da169ec9c2ae25fb86633d10f9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_b6bfb1232ba61272794a6943495" FOREIGN KEY ("typeId") REFERENCES "public"."product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_b6bfb1232ba61272794a6943495"`);
        await queryRunner.query(`DROP TABLE "public"."product"`);
        await queryRunner.query(`DROP TABLE "public"."product_type"`);
    }

}
