export type Repo<T, C> = {
  readAll(): Promise<T[]>;
  readById(id: string): Promise<T>;
  create(data: C): Promise<T>;
  update(id: string, data: Partial<C>): Promise<T>;
  delete(id: string): Promise<T>;
};

// ESTO ES UN TIPO GENERICO QUE VAMOS A USAR EN LOS REPOSITORIOS DE CADA ENDPOINT
// LOS DOS PARAMETOS SON GENERICOS
// T = TIPO
// C = CREATE
