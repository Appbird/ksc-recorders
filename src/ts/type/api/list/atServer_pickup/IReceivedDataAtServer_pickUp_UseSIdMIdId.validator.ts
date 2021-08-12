/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import {IReceivedDataAtServer_pickUp_UseSIdMIdId} from './IReceivedDataAtServer_pickUp_UseSIdMIdId';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"useDefaults":false});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {IReceivedDataAtServer_pickUp_UseSIdMIdId};
export const IReceivedDataAtServer_pickUp_UseSIdMIdIdSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
    "gameSystemEnv": {
      "properties": {
        "gameModeID": {
          "type": "string"
        },
        "gameSystemID": {
          "type": "string"
        }
      },
      "required": [
        "gameModeID",
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
export const isIReceivedDataAtServer_pickUp_UseSIdMIdId = ajv.compile(IReceivedDataAtServer_pickUp_UseSIdMIdIdSchema) as ValidateFunction<IReceivedDataAtServer_pickUp_UseSIdMIdId>;
export default function validate(value: unknown): IReceivedDataAtServer_pickUp_UseSIdMIdId {
  if (isIReceivedDataAtServer_pickUp_UseSIdMIdId(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isIReceivedDataAtServer_pickUp_UseSIdMIdId.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'IReceivedDataAtServer_pickUp_UseSIdMIdId'}) +
      '\n\n' +
      inspect(value),
    );
  }
}
