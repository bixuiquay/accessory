import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableClientChangeColumnPhoneAddressCity1593003054688 implements MigrationInterface {
    name = 'AlterTableClientChangeColumnPhoneAddressCity1593003054688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."client" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."client" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."client" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."client" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."client" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."client" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."client" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."client" ALTER COLUMN "username" SET NOT NULL`);
    }

}
