import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category.entity";
import { Menus_items } from "./menuItems.entity";

@Entity({ name: "MenuItemsCategories" })
export class MenuItemsCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default:true})
    status: boolean

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date

    @ManyToOne(() => Category,(cate) => cate.menu_items_categories,{nullable:false})
    @JoinColumn({name: 'category_id'})
    category: Category

    @ManyToOne(() => Menus_items,(mi) => mi.menu_items_categories,{nullable:false})
    @JoinColumn({name: 'menu_item_id'})
    menu_item: Menus_items
}