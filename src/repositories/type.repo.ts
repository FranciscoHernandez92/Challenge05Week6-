export type Repo<T, C> = {
  readAll(): Promise<T[]>;
  readById(id: string): Promise<T>;
  create(data: C): Promise<T>;
  update(id: string, data: Partial<C>): Promise<T>;
  delete(id: string): Promise<T>;
};

// ESTO ES UN TIPO DE REPO GENERICO QUE VAMOS A USAR EN LOS REPOSITORIOS DE CADA ENDPOINT
// LOS DOS PARAMETOS SON GENERICOS
// T = TIPO
// C = CREATE

// export type RepoLogin<T, C> = Repo<T, C> & {
//   find(data:C)
// }

export type WithLoginRepo<T, C> = Repo<T, C> & {
  searchForLogin(key: 'email' | 'name', value: string): Promise<Partial<T>>;
};

// CREAMOS UN TIPO GENERICO PARA IMPLEMENTARLO DONDE VAYAMOS A USAR ESE METODO MAS LOS ANTERIORES
