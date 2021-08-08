import {ConstructorType} from '@/core/common/types';
import BaseEntity from '@/core/entity/BaseEntity';

export type EntityClass<T extends BaseEntity> = ConstructorType<T> & typeof BaseEntity;
