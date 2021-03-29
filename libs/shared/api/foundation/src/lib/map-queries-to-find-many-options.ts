import { FindManyOptions, Like } from "typeorm"

export function mapQueriesToFindManyOptions<Entity>(query, ...searchColumns: string[]): FindManyOptions<Entity> {
  let options: FindManyOptions<Entity> = {}
  if (!query) {
    return options
  }

  let {offset, limit, orderBy, orderType, search, ...filters} = query

  // paging
  options.skip = offset || 0
  if (limit) {
    options.take = limit
  }

  // ordering
  if (orderBy && orderType) {
    options.order = {}
    options.order[orderBy] = (orderType as string).toUpperCase()
  }

  // filtering
  if (Object.keys(filters).length !== 0) {
    options.where = [{
      ...filters
    }]
  }

  // searching
  if (search && searchColumns?.length) {
    const filters = (options.where as any[])?.length ? (options.where as any[])[0] : {}
    options.where = []
    const likeSearch = '%' + search + '%'

    searchColumns.forEach(column => {
      let condition: any = {}
      condition[column] = Like(likeSearch);
      
      (options.where as any[]).push({...filters, ...condition})
    })
  }

  return options
}