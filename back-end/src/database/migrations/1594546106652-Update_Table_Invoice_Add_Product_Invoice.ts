import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTableInvoiceAddProductInvoice1594546106652 implements MigrationInterface {
    name = 'UpdateTableInvoiceAddProductInvoice1594546106652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."invoice" DROP CONSTRAINT "FK_f18e9b95fe80b1f554d1cb6c23b"`);
        await queryRunner.query(`CREATE TABLE "public"."product_invoice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "quantity" integer NOT NULL, "productId" uuid, "invoiceId" uuid, CONSTRAINT "PK_8c7783b0b8bb9d64253b9fbd67f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" DROP COLUMN "statusship"`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" DROP COLUMN "statuspayment"`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" DROP CONSTRAINT "UQ_98e909bc00b31f8865ee05821f8"`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD "note" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD "statusPayment" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD "statusShip" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" DROP CONSTRAINT "UQ_bf15f9c29aebec87e469ef15239"`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."product_invoice" ADD CONSTRAINT "FK_1ad45d9d157c1a0c7659d17fea1" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."product_invoice" ADD CONSTRAINT "FK_4824a8deca499009a538af359ee" FOREIGN KEY ("invoiceId") REFERENCES "public"."invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD CONSTRAINT "FK_587ea27db356ed97a5aa2fd834f" FOREIGN KEY ("clientId") REFERENCES "public"."client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."invoice" DROP CONSTRAINT "FK_587ea27db356ed97a5aa2fd834f"`);
        await queryRunner.query(`ALTER TABLE "public"."product_invoice" DROP CONSTRAINT "FK_4824a8deca499009a538af359ee"`);
        await queryRunner.query(`ALTER TABLE "public"."product_invoice" DROP CONSTRAINT "FK_1ad45d9d157c1a0c7659d17fea1"`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD "phone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD CONSTRAINT "UQ_bf15f9c29aebec87e469ef15239" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" DROP COLUMN "statusShip"`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" DROP COLUMN "statusPayment"`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD CONSTRAINT "UQ_98e909bc00b31f8865ee05821f8" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD "statuspayment" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD "statusship" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "public"."product_invoice"`);
        await queryRunner.query(`ALTER TABLE "public"."invoice" ADD CONSTRAINT "FK_f18e9b95fe80b1f554d1cb6c23b" FOREIGN KEY ("clientId") REFERENCES "public"."client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
