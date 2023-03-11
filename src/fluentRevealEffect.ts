import {
  IResource,
  IIsPressed,
  IEffectOptions,
  IUserEffectOptions,
  IEnableEffectFunc,
} from './types';
import {
  preProcessElement,
  preProcessElements,
  preProcessSelector,
  enableNormalBackgroundEffetcs,
  enableChildrenBackgroundEffetcs,
  enableNormalClickEffects,
  enableChildrenClickEffects,
  enableBorderEffects,
} from './helpers';

// ** Option *******************************************************************
function applyEffectOption(userOptions: IUserEffectOptions): IEffectOptions {
  const defaultOptions: IEffectOptions = {
    lightColor: 'rgba(255,255,255,0.25)',
    gradientSize: 150,
    clickEffect: false,
    isContainer: false,
    children: {
      borderSelector: '.eff-reveal-border',
      elementSelector: '.eff-reveal',
      lightColor: 'rgba(255,255,255,0.25)',
      gradientSize: 150,
    },
  };

  return Object.assign(defaultOptions, userOptions);
}

// ** Children Effect **********************************************************
function applyChildrenElementEffect(
  resource: IResource,
  options: IEffectOptions,
  isPressed: IIsPressed,
  enableBackgroundEffectsFunc: IEnableEffectFunc,
  enableClickEffectsFunc: IEnableEffectFunc,
) {
  enableBackgroundEffectsFunc(resource, options, isPressed);

  if (options.clickEffect) {
    enableClickEffectsFunc(resource, options, isPressed);
  }
}

function applyChildrenEffect(
  resources: IResource[],
  options: IEffectOptions,
  isPressed: IIsPressed,
  enableBackgroundEffectsFunc: IEnableEffectFunc,
  enableClickEffectsFunc: IEnableEffectFunc,
) {
  const resourceL = resources.length;

  for (let i = 0; i < resourceL; i++) {
    const resource = resources[i];
    applyChildrenElementEffect(resource, options, isPressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
  }
}

// ** Container Effect *********************************************************
function applyContainerElementEffect(
  resource: IResource,
  options: IEffectOptions,
  isPressed: IIsPressed,
  enableBackgroundEffectsFunc: IEnableEffectFunc,
  enableClickEffectsFunc: IEnableEffectFunc,
) {
  // Container
  const childrenBorders = preProcessSelector(options.children?.borderSelector || '');
  enableBorderEffects(resource, childrenBorders, options, isPressed);

  // Children
  const childrens = preProcessSelector(options.children?.elementSelector || '');
  applyChildrenEffect(childrens, options, isPressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
}

function applyContainerEffect(
  resources: IResource[],
  options: IEffectOptions,
  isPressed: IIsPressed,
  enableBackgroundEffectsFunc: IEnableEffectFunc,
  enableClickEffectsFunc: IEnableEffectFunc,
) {
  const resourceL = resources.length;

  for (let i = 0; i < resourceL; i++) {
    const resource = resources[i];
    applyContainerElementEffect(resource, options, isPressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
  }
}

// ** Apply Effect *************************************************************
export const applyElementEffect = (element: HTMLElement, userOptions: IUserEffectOptions = {}) => {
  const isPressed: IIsPressed = [false];
  const options = applyEffectOption(userOptions);
  const resource = preProcessElement(element);

  if (!options.isContainer) {
    const enableBackgroundEffectsFunc = enableNormalBackgroundEffetcs;
    const enableClickEffectsFunc = enableNormalClickEffects;
    applyChildrenElementEffect(resource, options, isPressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
  }
  else {
    const enableBackgroundEffectsFunc = enableChildrenBackgroundEffetcs;
    const enableClickEffectsFunc = enableChildrenClickEffects;
    applyContainerElementEffect(resource, options, isPressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
  }
};

export const applyElementsEffect = (elements: NodeListOf<HTMLElement>, userOptions: IUserEffectOptions = {}) => {
  const isPressed: IIsPressed = [false];
  const options = applyEffectOption(userOptions);
  const resources = preProcessElements(elements);

  if (!options.isContainer) {
    const enableBackgroundEffectsFunc = enableNormalBackgroundEffetcs;
    const enableClickEffectsFunc = enableNormalClickEffects;
    applyChildrenEffect(resources, options, isPressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
  }
  else {
    const enableBackgroundEffectsFunc = enableChildrenBackgroundEffetcs;
    const enableClickEffectsFunc = enableChildrenClickEffects;
    applyContainerEffect(resources, options, isPressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
  }
};

export const applyEffect = (selector: string, userOptions: IUserEffectOptions = {}) => {
  const isPressed: IIsPressed = [false];
  const options = applyEffectOption(userOptions);
  const resoures = preProcessSelector(selector);

  if (!options.isContainer) {
    const enableBackgroundEffectsFunc = enableNormalBackgroundEffetcs;
    const enableClickEffectsFunc = enableNormalClickEffects;
    applyChildrenEffect(resoures, options, isPressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
  }
  else {
    const enableBackgroundEffectsFunc = enableChildrenBackgroundEffetcs;
    const enableClickEffectsFunc = enableChildrenClickEffects;
    applyContainerEffect(resoures, options, isPressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
  }
};
