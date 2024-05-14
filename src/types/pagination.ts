export class PageDto<T> {
  limit: number
  offset: number
  total: number
  data: T[]

  constructor(limit: number, offset: number, total: number, data: T[]) {
    this.limit = limit
    this.offset = offset
    this.total = total
    this.data = data
  }

  // Retourne une nouvelle instance de PageDto avec des valeurs par défaut
  static empty<T>(): PageDto<T> {
    return new PageDto<T>(0, 0, 0, [])
  }

  // Retourne une nouvelle instance vide de PageDto<T>
  empty(): PageDto<T> {
    return PageDto.empty<T>()
  }

  // Concatène les données de deux instances de PageDto
  static concat<T>(page1: PageDto<T>, page2: PageDto<T>): PageDto<T> {
    return new PageDto<T>(
      page1.limit,
      page1.offset,
      page1.total + page2.total,
      [...page1.data, ...page2.data]
    )
  }

  // Concatène l'instance actuelle avec une autre instance de PageDto
  concat(page: PageDto<T>): PageDto<T> {
    return PageDto.concat(this, page)
  }

  // Applique une fonction de callback sur chaque élément de data et retourne une nouvelle instance de PageDto avec le résultat
  static map<T, R>(page: PageDto<T>, callback: (item: T) => R): PageDto<R> {
    return new PageDto<R>(
      page.limit,
      page.offset,
      page.total,
      page.data.map(callback)
    )
  }

  // Applique une fonction de callback sur chaque élément de l'instance actuelle
  map<R>(callback: (item: T) => R): PageDto<R> {
    return PageDto.map(this, callback)
  }

  // Filtre les éléments de data en utilisant une fonction de callback et retourne une nouvelle instance de PageDto avec les éléments filtrés
  static filter<T>(
    page: PageDto<T>,
    callback: (item: T) => boolean
  ): PageDto<T> {
    return new PageDto<T>(
      page.limit,
      page.offset,
      page.total,
      page.data.filter(callback)
    )
  }

  // Filtre les éléments de l'instance actuelle en utilisant une fonction de callback
  filter(callback: (item: T) => boolean): PageDto<T> {
    return PageDto.filter(this, callback)
  }
}
