import { PageStates, RequiredObjectType } from "../view/state/Base/PageStates";

export interface TransitionInfo<T extends keyof PageStates> {
    to: T;
    requiredObject: RequiredObjectType<PageStates[T]>;
}
