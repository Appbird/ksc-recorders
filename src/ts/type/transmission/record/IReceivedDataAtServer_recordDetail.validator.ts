/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import IReceivedDataAtServer_recordDetail from './IReceivedDataAtServer_recordDetail';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":true});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {IReceivedDataAtServer_recordDetail};
export const IReceivedDataAtServer_recordDetailSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "defaultProperties": [
  ],
  "definitions": {
    "LanguageInApplication": {
      "enum": [
        "English",
        "Japanese"
      ],
      "type": "string"
    }
  },
  "properties": {
    "gameSystemEnv": {
      "defaultProperties": [
      ],
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
    },
    "lang": {
      "$ref": "#/definitions/LanguageInApplication"
    }
  },
  "required": [
    "gameSystemEnv",
    "id",
    "lang"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isIReceivedDataAtServer_recordDetail = ajv.compile(IReceivedDataAtServer_recordDetailSchema) as ValidateFunction<IReceivedDataAtServer_recordDetail>;
export default function validate(value: unknown): IReceivedDataAtServer_recordDetail {
  if (isIReceivedDataAtServer_recordDetail(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isIReceivedDataAtServer_recordDetail.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'IReceivedDataAtServer_recordDetail'}) +
      '\n\n' +
      inspect(value),
    );
  }
}
