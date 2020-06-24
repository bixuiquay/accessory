import {MigrationInterface, QueryRunner} from "typeorm";

export class AlertTableProductAddColumnIsfeatureSalepriceIslastminuteIswishlistIsflashsale1592924162661 implements MigrationInterface {
    name = 'AlertTableProductAddColumnIsfeatureSalepriceIslastminuteIswishlistIsflashsale1592924162661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "pricesale" numeric`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "isfeature" boolean`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "islastminute" boolean`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "isflashsale" boolean`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "iswishlist" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "iswishlist"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "isflashsale"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "islastminute"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "isfeature"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "pricesale"`);
    }

}
