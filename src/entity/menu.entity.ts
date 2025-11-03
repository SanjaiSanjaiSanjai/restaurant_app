import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "menus"})
export class Menus {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name: string

    @Column({type: "time"})
    open_time: string

    @Column({type: "time"})
    close_time: string

    @Column({default: true})
    status: boolean

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date
}