import {MigrationInterface, QueryRunner} from "typeorm";
import * as bcrypt from "bcryptjs";

export class User1624496062791 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO user VALUES (1, "username1", "${bcrypt.hashSync("Aa@123456", 8)}", "2021/11/21", "2021/11/21")`);
        await queryRunner.query(`INSERT INTO user VALUES (2, "username2", "${bcrypt.hashSync("Aa@123456", 8)}", "2021/11/21", "2021/11/21")`);

        await queryRunner.query(`INSERT INTO task VALUES (1, "name1", "description1", "2021/12/21", "NEW", "2021/11/21", "2021/11/21", 1)`);
        await queryRunner.query(`INSERT INTO task VALUES (2, "name2", "description2", "2021/12/22", "NEW", "2021/11/22", "2021/11/22", 2)`);
        await queryRunner.query(`INSERT INTO task VALUES (3, "name3", "description3", "2021/12/23", "NEW", "2021/11/23", "2021/11/23", 2)`);
        await queryRunner.query(`INSERT INTO task VALUES (4, "name4", "description4", "2021/12/24", "NEW", "2021/11/24", "2021/11/24", 1)`);
        await queryRunner.query(`INSERT INTO task VALUES (5, "name5", "description5", "2021/12/25", "NEW", "2021/11/25", "2021/11/25", 1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
