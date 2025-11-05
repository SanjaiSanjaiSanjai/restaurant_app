import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { MenuItemsCategory } from "./menu_items.category.entity";

@Entity({name: "menu_items"})
export class Menus_items {
    @PrimaryGeneratedColumn()
    id : number

    @Column( { type: 'varchar', length: 100, nullable: false })
    name: string

    @Column( { type: 'text', nullable: false })
    description: string | null

    @Column( { type: 'boolean', default: true })
    status: boolean

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date

    @OneToMany(() => MenuItemsCategory,(menuitemcategory) => menuitemcategory.menu_item)
    menu_items_categories: MenuItemsCategory[]
}