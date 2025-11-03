import { AppDataSource } from "../data-source";
import { ALLOWED_TABLES, ALLOWED_TABLES_TYPE, allRepo } from "../types/types";



/**
 * Fetches a record from the specified repository based on the provided condition.
 *
 * @param {ALLOWED_TABLES_TYPE} table - Verify to tables
 * @param {string} condition - The condition to match.
 * @return {Promise<any>} A Promise that resolves to the found record, or null if none is found.
 */
export async function findOneByCondition(table: ALLOWED_TABLES_TYPE, condition: string, data: any): Promise<any> {
    const repo = allRepo[table]
    return await repo.findOne({ where: { [condition]: data } });
}


/**
 * Inserts multiple records into the specified repository.
 *
 * @param {ALLOWED_TABLES_TYPE} table - The table to insert into.
 * @param {string[]} column - An array of column names.
 * @param {any[]} value - An array of values corresponding to the column names.
 * @throws {Error} If the number of columns and values do not match.
 */
export async function insertDataByDb(table: ALLOWED_TABLES_TYPE, column: string[], value: any[]): Promise<any> {
    if (column.length !== value.length) {
        throw new Error('Mismatch between the number of columns and values');
    }

    const repo = allRepo[table] 

    let record: any = {};
    for (let i = 0; i < column.length; i++) {
        record[column[i]]  = value[i];
    }
    const savedRecord = await repo.insert(record)
    return savedRecord.raw[0]
}

/**
 * @type {columnCondition} condition - column condition type
 * @param {table} table - Given only {ALLOWED_TABLES_TYPE} table
 * @param {condition} condition - take condition array by columnCondition type
 */

type columnCondition = {column: string, value: any}
export async function findallwithCondition(table: ALLOWED_TABLES_TYPE,condition: columnCondition[]) {
    if (!ALLOWED_TABLES.includes(table)) throw new Error('Table is not found!')
    
    const repo = allRepo[table]
    let record: any = {}

    for(let i = 0; i < condition.length; i++){
        record[condition[i].column] = condition[i].value;
    }
   return repo.find({where: record})
}

export async function updateAndOp(table: ALLOWED_TABLES_TYPE,data: any,condition:{}) {
    const keys = Object.keys(condition)
    const whereClause = keys.map((k) => `${k} = :${k}`)
    const whereClauseString = whereClause.join(" AND ")
    let query = AppDataSource.createQueryBuilder()
                .update(table)
                .set(data)
                .where(whereClauseString,condition)
    await query.execute()
}