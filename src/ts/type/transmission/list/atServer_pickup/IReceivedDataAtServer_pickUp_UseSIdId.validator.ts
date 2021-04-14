/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import IReceivedDataAtServer_pickUp_UseSIdId from './IReceivedDataAtServer_pickUp_UseSIdId';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":true});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {IReceivedDataAtServer_pickUp_UseSIdId};
export const IReceivedDataAtServer_pickUp_UseSIdIdSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "defaultProperties": [
  ],
  "properties": {
    "gameSystemEnv": {
      "defaultProperties": [
      ],
      "properties": {
        "gameSystemID": {
          "type": "string"
        }
      },
      "required": [
        "gameSystemID"
      ],
      "type": "object"
    },
    "id": {
      "type": "string"
    }
  },
  "required": [
    "gameSystemEnv",
    "id"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isIReceivedDataAtServer_pickUp_UseSIdId = ajv.compile(IReceivedDataAtServer_pickUp_UseSIdIdSchema) as ValidateFunction<IReceivedDataAtServer_pickUp_UseSIdId>;
export default function validate(value: unknown): IReceivedDataAtServer_pickUp_UseSIdId {
  if (isIReceivedDataAtServer_pickUp_UseSIdId(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isIReceivedDataAtServer_pickUp_UseSIdId.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'IReceivedDataAtServer_pickUp_UseSIdId'}) +
      '\n\n' +
      inspect(value),
    );
  }
}
