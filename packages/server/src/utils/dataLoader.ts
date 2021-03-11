import DataLoader from 'dataloader';
import { EntityTarget, getManager, In } from 'typeorm';

const dataLoader = <T extends object, K extends keyof T, V extends T[K]>(
  entityTarget: EntityTarget<T>,
  key: K,
  relations?: K[]
) =>
  new DataLoader(async (values: readonly V[]) => {
    const manager = getManager();

    const entities = await manager.find(entityTarget, {
      where: { [key]: In(values as V[]) },
      relations: relations as string[],
    });

    const map = new Map<V, T>();
    entities.forEach((entity) => map.set(entity[key] as V, entity));

    return values.map((value) => map.get(value));
  });

export default dataLoader;
