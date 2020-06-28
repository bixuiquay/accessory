import {MigrationInterface, QueryRunner} from "typeorm";

export class AlertTableProductAddColumnIsfeatureSalepriceIslastminuteIswishlistIsflashsale1592924162661 implements MigrationInterface {
    name = 'AlertTableProductAddColumnIsfeatureSalepriceIslastminuteIswishlistIsflashsale1592924162661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "priceSale" numeric`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "isFeatured" boolean`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "isLastMinute" boolean`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "isFlashSale" boolean`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "isWishlist" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "isWishlist"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "isFlashSale"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "isLastMinute"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "isFeatured"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "priceSale"`);
    }

}
