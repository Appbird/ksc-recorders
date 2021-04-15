import { PageStates } from "../interface/PageStates";

export interface TransitionInfo<T extends keyof PageStates> {
    to: T;
    requiredObject: PageStates[T];
}
