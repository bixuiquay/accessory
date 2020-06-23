import {MigrationInterface, QueryRunner} from "typeorm";

export class AlertTableCategoryAddColumnShortname1592880959372 implements MigrationInterface {
    name = 'AlertTableCategoryAddColumnShortname1592880959372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "public"."category" ADD "shortName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.query(`ALTER TABLE "public"."category" DROP COLUMN "shortName"`);
    }

}
