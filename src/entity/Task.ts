import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Check, In} from "typeorm";
import { Allow, IsArray, IsDateString, IsIn, IsNotEmpty, IS_IN, MinDate } from "class-validator";

import { User } from "./User";
import { STATUS } from "../config/TaskStatus";

@Entity()
@Unique(["id"])
export class Task {
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;
    
    @Column()
    @IsNotEmpty()
    description: string;

    @ManyToOne(type => User, user => user.tasks)
    @JoinColumn({ name: 'userId' })
    user: User;
    
    @Column()
    @IsNotEmpty()
    @CreateDateColumn()
    completeDate: Date;
    
    @Column({ type: 'enum', enum: STATUS })
    @IsNotEmpty()
    status: STATUS;
    
    @Column()
    @IsNotEmpty()
    @CreateDateColumn()
    createdAt: Date;
    
    @Column()
    @IsNotEmpty()
    @UpdateDateColumn()
    updatedAt: Date;
};
