import { IResource, IIsPressed, IEffectOptions } from '../types';
export declare function enableBorderEffects(resource: IResource, childrenBorders: IResource[], options: IEffectOptions, isPressed: IIsPressed): void;
export declare function enableNormalBackgroundEffetcs(resource: IResource, options: IEffectOptions, isPressed: IIsPressed): void;
export declare function enableChildrenBackgroundEffetcs(resource: IResource, options: IEffectOptions, isPressed: IIsPressed): void;
export declare function enableNormalClickEffects(resource: IResource, options: IEffectOptions, isPressed: IIsPressed): void;
export declare function enableChildrenClickEffects(resource: IResource, options: IEffectOptions, isPressed: IIsPressed): void;
export declare function preProcessElement(element: HTMLElement): IResource;
export declare function preProcessElements(elements: NodeListOf<HTMLElement>): IResource[];
export declare function preProcessSelector(selector: string): IResource[];
