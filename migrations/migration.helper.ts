import { TableColumnOptions } from "typeorm/schema-builder/options/TableColumnOptions"

export const DB_ENGINE = {
    // for table that handle more insert, update operations
    INNODB: "InnoDB", 
    // for table that handle more read operations
    MYISAM: "MyISAM"
}

export const ID_COLUMN: TableColumnOptions = {
    name: 'id',
    type: 'varchar',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'uuid',
    isUnique: true
}
export const CREATED_DATE_COLUMN: TableColumnOptions = {
    name: 'createdDate',
    type: 'timestamp',
    default: 'current_timestamp'
}
export const UPDATED_DATE_COLUMN: TableColumnOptions = {
    name: 'updatedDate',
    type: 'timestamp',
    isNullable: true
}
export const DELETED_DATE_COLUMN: TableColumnOptions = {
    name: 'deletedDate',
    type: 'timestamp',
    isNullable: true
}
export const IS_ENABLED_COLUMN: TableColumnOptions = {
    name: 'isEnabled',
    type: 'boolean',
    default: 1
}

export const DEFAULT_COLUMNS = [
    ID_COLUMN,
    CREATED_DATE_COLUMN,
    UPDATED_DATE_COLUMN,
    DELETED_DATE_COLUMN,
    IS_ENABLED_COLUMN,
]