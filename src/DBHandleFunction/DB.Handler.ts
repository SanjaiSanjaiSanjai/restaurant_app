import { DataSource, ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../data-source";
import { ALLOWED_TABLES, ALLOWED_TABLES_TYPE, allRepo } from "../types/types";
import { MenuItemsCategory } from "../entity/menu_items.category.entity";
import { Menus_items } from "../entity/menuItems.entity";




/**
 * Finds a single record in the specified table that matches the provided condition.
 * @param {DataSource} dataSource - The data source to use for the search.
 * @param {new() : T} entity - The entity class to use for searching the table.
 * @param {ObjectLiteral} condition - The condition to match the record against.
 * @return {Promise<ObjectLiteral | null>} A Promise that resolves to the matching record, or null if no match is found.
 */
export async function findOneByCondition<T>(dataSource: DataSource, entity: { new(): T }, condition: ObjectLiteral): Promise<ObjectLiteral | null> {
    const entityDataSource = dataSource.manager.getRepository(entity)
    const fetchSingleRecord = await entityDataSource.findOne({ where: condition })
    return fetchSingleRecord
}



/**
 * Inserts a new record into the specified table using the provided data source and entity.
 *
 * @param {DataSource} dataSource - The data source to use for the insertion.
 * @param {new() : T} entity - The entity class to use for creating the new record.
 * @param {ObjectLiteral} entityData - The data to insert into the new record.
 * @return {Promise<ObjectLiteral>} A Promise that resolves to the saved entity data.
 */
export async function insertDataByDb<T>(dataSource: DataSource, entity: { new(): T }, entityData: ObjectLiteral): Promise<ObjectLiteral> {
    const entityDataSource = dataSource.manager.getRepository(entity)
    const entityNewDataCreate = entityDataSource.create(entityData)
    const savedEntityData = await entityDataSource.save(entityNewDataCreate)
    return savedEntityData
}

/**
 * @type {columnCondition} condition - column condition type
 * @param {table} table - Given only {ALLOWED_TABLES_TYPE} table
 * @param {condition} condition - take condition array by columnCondition type
 */


/**
 * Finds all records in the specified table that match the provided condition.
 *
 * @param {DataSource} dataSource - The data source to use for the search.
 * @param {new() : T} entity - The entity class to use for searching the table.
 * @param {ObjectLiteral} condition - The condition to match the records against.
 * @return {Promise<ObjectLiteral[]>} A Promise that resolves to an array of matching records.
 */
export async function findallwithCondition<T>(dataSource: DataSource, entity: { new(): T }, condition: ObjectLiteral): Promise<ObjectLiteral[]> {
    const entityDataSource = dataSource.manager.getRepository(entity)
    const fetchSingleRecord = await entityDataSource.find({ where: condition })
    return fetchSingleRecord
}

export async function updateAndOp(table: ALLOWED_TABLES_TYPE, data: any, condition: {}) {
    const keys = Object.keys(condition)
    const whereClause = keys.map((k) => `${k} = :${k}`)
    const whereClauseString = whereClause.join(" AND ")
    let query = AppDataSource.createQueryBuilder()
        .update(table)
        .set(data)
        .where(whereClauseString, condition)
    await query.execute()
}

// export async function menuItemsCategoryInnerJoin(id: number): Promise<MenuItemsCategory[]> {
//     const menuitemsRepo = AppDataSource.manager.getRepository(MenuItemsCategory)
//     const data = await menuitemsRepo.createQueryBuilder("MenuItemsCategories")
//         .innerJoinAndSelect("MenuItemsCategories.menu_item", "menu_items")
//         .where("MenuItemsCategories.category_id = :category_id", { category_id: id })
//         .getMany()
//     return data
// }

export async function innerJoin<T>(dataSource: DataSource, entity: { new(): T }, mainTable: string, joinTable: { foriegnKeyTable: string, joinAliasTableName: string }, id: number,whereCondition: any,moreTables?: {  joinTableColumn: string, joinTableColumnAlias: string }[]) {
    const entityDataSource = dataSource.manager.getRepository(entity)
    let queryBuilder = entityDataSource.createQueryBuilder(mainTable)
    .innerJoinAndSelect(`${mainTable}.${joinTable.foriegnKeyTable}`,`${joinTable.joinAliasTableName}`)

    if (moreTables && moreTables.length > 0) {
        moreTables.forEach((d) => {
            queryBuilder = queryBuilder.innerJoinAndSelect(`${mainTable}.${d.joinTableColumn}`,`${d.joinTableColumnAlias}`)
        })
    }

    queryBuilder = queryBuilder.where(`${mainTable}.${whereCondition} = :condition`,{condition: id})
    const data = await queryBuilder.getMany()
    return data
}