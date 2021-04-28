import DataLoader from 'dataloader';
import { ClassType } from 'type-graphql';
import { BaseEntity, getRepository, In } from 'typeorm';

const createDataLoader = <
  T extends BaseEntity,
  K extends keyof T,
  V extends T[K]
>(
  Entity: ClassType<T>,
  key: K,
  relations?: K[]
) =>
  new DataLoader(async (values: readonly V[]) => {
    const repository = getRepository(Entity);

    const entities = await repository.find({
      where: { [key]: In(values as V[]) },
      relations: relations as string[],
    });

    const map = new Map<V, T>();
    entities.forEach((entity) => map.set(entity[key] as V, entity));

    return values.map((value) => map.get(value));
  });

export default createDataLoader;
