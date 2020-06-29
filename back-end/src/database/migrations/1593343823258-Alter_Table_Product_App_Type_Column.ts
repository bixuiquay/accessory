import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableProductAppTypeColumn1593343823258 implements MigrationInterface {
    name = 'AlterTableProductAppTypeColumn1593343823258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "isWishlist"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "isWishlist" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "isWishlist"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "isWishlist" integer`);
    }

}
