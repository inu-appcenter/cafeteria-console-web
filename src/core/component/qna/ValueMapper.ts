import {EntityFieldMetadata} from '@/core/entity/types/EntityFieldMetadata';
import BaseEntity from '@/core/entity/BaseEntity';

export type MappedValues = {
  question: Record<string, any>;
  questionFields: Array<EntityFieldMetadata>;
  questionBody: string;
  askedAt: Date;
  askedBy: string;
  answer?: Record<string, any>;
  answeredAt?: Date;
  answerRead?: boolean;
  answerReadAt?: Date;
};

export type ValueMapper<T extends BaseEntity> = (question: T) => MappedValues;
