import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn} from "typeorm";
import { IsNotEmpty, IsDate, IsHash } from "class-validator";
import * as bcrypt from "bcryptjs";

import { Task } from "./Task";

@Entity()
@Unique(["username"])
export class User {
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    username: string;
    
    @Column()
    @IsNotEmpty()
    password: string;
    
    @OneToMany(type => Task, task => task.user)
    tasks: Task[];
    
    @Column()
    @IsNotEmpty()
    @CreateDateColumn()
    createdAt: Date;
    
    @Column()
    @IsNotEmpty()
    @UpdateDateColumn()
    updatedAt: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    };

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    };
};
