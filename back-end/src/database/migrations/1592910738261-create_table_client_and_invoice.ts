import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableClientAndInvoice1592910738261 implements MigrationInterface {
    name = 'createTableClientAndInvoice1592910738261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."cart" RENAME COLUMN "userId" TO "clientId"`);
        await queryRunner.query(`CREATE TABLE "public"."client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "username" character varying NOT NULL, "email" character varying NOT NULL, "lastName" character varying, "firstName" character varying, "passwordHash" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_27bd4bfdcf16d1d9e6e4a5ad756" UNIQUE ("username"), CONSTRAINT "UQ_c5ef5a7d6eff9587fd8732a9a58" UNIQUE ("email"), CONSTRAINT "PK_1d7f977dce904d4ffd68ce226bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."invoice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "username" character varying NOT NULL, "email" character varying NOT NULL, "lastName" character varying, "firstName" character varying, "address" character varying NOT NULL, "city" character varying NOT NULL, "phone" integer NOT NULL, "statuspayment" character varying NOT NULL, "statusship" character varying NOT NULL, "payment" numeric NOT NULL, "clientId" uuid, CONSTRAINT "UQ_98e909bc00b31f8865ee05821f8" UNIQUE ("username"), CONSTRAINT "UQ_bf15f9c29aebec87e469ef15239" UNIQUE ("email"), CONSTRAINT "PK_0de9dfe31be1fbd6e48410f5229" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."cart" ADD CONSTRAINT "FK_9781fe137c9560208a97d3d108d" FOREIGN KEY ("clientId") REFERENCES "public"."client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD CONSTRAINT "FK_587ea27db356ed97a5aa2fd834f" FOREIGN KEY ("clientId") REFERENCES "public"."client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."invoice"`);
        await queryRunner.query(`DROP TABLE "public"."client" CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."cart" RENAME COLUMN "clientId" TO "userId"`);
    }

}
