import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { menuMenuItems } from "./menu.menuItems.entity";

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

    @OneToMany(() => menuMenuItems,(mmI) => mmI.menus_id)
    menus_id : menuMenuItems[]
}