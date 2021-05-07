/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import {IReceivedDataAtServer_recordDetail} from './IReceivedDataAtServer_recordDetail';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":true});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {IReceivedDataAtServer_recordDetail};
export const IReceivedDataAtServer_recordDetailSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "defaultProperties": [
  ],
  "definitions": {
    "IGameSystemEnvironment": {
      "defaultProperties": [
      ],
      "properties": {
        "gameDifficultyID": {
          "type": "string"
        },
        "gameModeID": {
          "type": "string"
        },
        "gameSystemID": {
          "type": "string"
        }
      },
      "required": [
        "gameDifficultyID",
        "gameModeID",
        "gameSystemID"
      ],
      "type": "object"
    },
    "IRegulation": {
      "defaultProperties": [
      ],
      "properties": {
        "abilityIDs": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "gameSystemEnvironment": {
          "$ref": "#/definitions/IGameSystemEnvironment"
        },
        "targetID": {
          "type": "string"
        }
      },
      "required": [
        "abilityIDs",
        "gameSystemEnvironment",
        "targetID"
      ],
      "type": "object"
    },
    "ISentRecordOffer": {
      "defaultProperties": [
      ],
      "properties": {
        "languageOfTagName": {
          "$ref": "#/definitions/LanguageInApplication"
        },
        "link": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "note": {
          "type": "string"
        },
        "regulation": {
          "$ref": "#/definitions/IRegulation"
        },
        "score": {
          "type": "number"
        },
        "tagName": {
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      },
      "required": [
        "languageOfTagName",
        "link",
        "note",
        "regulation",
        "score",
        "tagName"
      ],
      "type": "object"
    },
    "LanguageInApplication": {
      "enum": [
        "English",
        "Japanese"
      ],
      "type": "string"
    },
    "RecordPropertiesInModifiable": {
      "defaultProperties": [
      ],
      "properties": {
        "link": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "note": {
          "type": "string"
        },
        "regulation": {
          "defaultProperties": [
          ],
          "properties": {
            "abilityIDs": {
              "items": {
                "type": "string"
              },
              "type": "array"
            },
            "gameSystemEnvironment": {
              "defaultProperties": [
              ],
              "properties": {
                "gameDifficultyID": {
                  "type": "string"
                }
              },
              "required": [
                "gameDifficultyID"
              ],
              "type": "object"
            },
            "targetID": {
              "type": "string"
            }
          },
          "required": [
            "abilityIDs",
            "gameSystemEnvironment",
            "targetID"
          ],
          "type": "object"
        },
        "score": {
          "type": "number"
        },
        "tagName": {
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      },
      "required": [
        "link",
        "note",
        "regulation",
        "score",
        "tagName"
      ],
      "type": "object"
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
