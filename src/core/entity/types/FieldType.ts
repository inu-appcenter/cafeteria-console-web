export type FieldType = 'boolean' | 'int' | 'string' | 'text' | 'date';

export function toEntityFieldType(typeConstructorName: string): FieldType {
  const defaultConversion = {
    Boolean: 'boolean',
    Number: 'int',
    String: 'string',
    Date: 'date',
  };

  return defaultConversion[typeConstructorName] || typeConstructorName;
}
