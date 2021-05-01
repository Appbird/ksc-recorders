import { TagKind } from "./TagsView";


export interface TagsClickedCallbacks {
    gameSystem?: (tagKind: TagKind, tagName: string) => void;
    target?: (tagKind: TagKind, tagName: string) => void;
    ability?: (tagKind: TagKind, tagName: string) => void;
    hashTag?: (tagKind: TagKind, tagName: string) => void;
}
