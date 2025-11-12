import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Menus } from "./menu.entity";
import { Menus_items } from "./menuItems.entity";

@Entity({name: "menu_menu_items"})
export class menuMenuItems {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(() => Menus,(menu) => menu.menus_id)
    @JoinColumn({name: "menus_id"})
    menus_id: Menus

    @ManyToOne(() => Menus_items,(mi) => mi.menu_items_id)
    @JoinColumn({name: "menu_items_id"})
    menu_items_id: Menus_items

    @Column({type: "boolean",default:true})
    status: boolean

    @CreateDateColumn({type: "timestamp"})
    created_at: Date

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date
}