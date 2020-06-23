import {MigrationInterface, QueryRunner} from "typeorm";

export class AlertTableProductAddColumnIsfeatureSalepriceIslastminuteIswishlistIsflashsale1592924162661 implements MigrationInterface {
    name = 'AlertTableProductAddColumnIsfeatureSalepriceIslastminuteIswishlistIsflashsale1592924162661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "pricesale" numeric`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "isfeature" boolean`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "islastminute" boolean`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "isflashsale" boolean`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "iswishlist" integer`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_ad37bb05ba09d24f719f2ccf1ac" FOREIGN KEY ("categoryId") REFERENCES "public"."child_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_1fb525075e77754322836a78c6b" FOREIGN KEY ("brandId") REFERENCES "public"."brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_1fb525075e77754322836a78c6b"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_ad37bb05ba09d24f719f2ccf1ac"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "iswishlist"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "isflashsale"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "islastminute"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "isfeature"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "pricesale"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "public"."child_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "public"."brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
