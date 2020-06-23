import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDB1592135498376 implements MigrationInterface {
    name = 'InitDB1592135498376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."brand" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_78c1c9a2f36ac2afebe6c4804cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_a2fd3397138f6f29d0cdad6ba06" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."child_category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_1c707a223c7940ee7464af6f61b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying, "createdById" character varying, "updatedBy" character varying, "updatedById" character varying, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, "quantity" integer NOT NULL, "image" character varying, "listImage" jsonb NOT NULL, "categoryId" integer, "brandId" integer, CONSTRAINT "PK_da169ec9c2ae25fb86633d10f9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."user_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "resources" jsonb, CONSTRAINT "PK_294737c12b5cc236297c8f9f7ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "username" character varying NOT NULL, "email" character varying NOT NULL, "lastName" character varying, "firstName" character varying, "passwordHash" character varying NOT NULL, "roleId" uuid, CONSTRAINT "UQ_b67337b7f8aa8406e936c2ff754" UNIQUE ("username"), CONSTRAINT "UQ_b7a5e4a3b174e954b2dabf2ef9e" UNIQUE ("email"), CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."cart" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" uuid, CONSTRAINT "PK_627875fe2791acc2552d2d4efd1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."cart_product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "quantity" integer NOT NULL, "productId" uuid, "cartId" integer, CONSTRAINT "PK_10d5fba5f0c7c1256b65d71e9ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."child_category" ADD CONSTRAINT "FK_71944b8d318313a1d40a1e7c022" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_ad37bb05ba09d24f719f2ccf1ac" FOREIGN KEY ("categoryId") REFERENCES "public"."child_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_1fb525075e77754322836a78c6b" FOREIGN KEY ("brandId") REFERENCES "public"."brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "FK_2566faf12d9054169205214d8b4" FOREIGN KEY ("roleId") REFERENCES "public"."user_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."cart" ADD CONSTRAINT "FK_69a3a77012134d67438f982d7f9" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."cart_product" ADD CONSTRAINT "FK_39a6a124e9017d90ed2093cf484" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."cart_product" ADD CONSTRAINT "FK_5ecd711e21221e6541562894b18" FOREIGN KEY ("cartId") REFERENCES "public"."cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "public"."cart_product" DROP CONSTRAINT "FK_5ecd711e21221e6541562894b18"`);
        // await queryRunner.query(`ALTER TABLE "public"."cart_product" DROP CONSTRAINT "FK_39a6a124e9017d90ed2093cf484"`);
        // await queryRunner.query(`ALTER TABLE "public"."cart" DROP CONSTRAINT "FK_69a3a77012134d67438f982d7f9"`);
        // await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "FK_2566faf12d9054169205214d8b4"`);
        // await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_1fb525075e77754322836a78c6b"`);
        // await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_ad37bb05ba09d24f719f2ccf1ac"`);
        // await queryRunner.query(`ALTER TABLE "public"."child_category" DROP CONSTRAINT "FK_71944b8d318313a1d40a1e7c022"`);
        await queryRunner.query(`DROP TABLE "public"."cart_product"`);
        await queryRunner.query(`DROP TABLE "public"."cart"`);
        await queryRunner.query(`DROP TABLE "public"."user"`);
        await queryRunner.query(`DROP TABLE "public"."user_role"`);
        await queryRunner.query(`DROP TABLE "public"."product"`);
        await queryRunner.query(`DROP TABLE "public"."child_category"`);
        await queryRunner.query(`DROP TABLE "public"."category"`);
        await queryRunner.query(`DROP TABLE "public"."brand"`);
    }

}
