import {ConstructorType} from '@/core/common/types';
import BaseEntity from '@/core/entity/BaseEntity';

export type EntityClass = ConstructorType<BaseEntity> & typeof BaseEntity;
