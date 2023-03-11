import { IResource, IIsPressed, IArea, IEffectOptions } from '../types';

// ** Postion ******************************************************************
function getOffset(element: HTMLElement) {
  const bounding = element.getBoundingClientRect();

  return ({
    top: bounding.top,
    left: bounding.left,
  });
}

// with Mouse
function getXY(element: HTMLElement, e: MouseEvent) {
  const offset = getOffset(element);
  const x = e.pageX - offset.left - window.scrollX;
  const y = e.pageY - offset.top - window.scrollY;

  return [x, y];
}


// for Container
function intersectRect(r1: IArea, r2: IArea) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}
function isIntersected(element: HTMLElement, cursorX: number, cursorY: number, gradientSize: number) {
  const cursorArea: IArea = {
    left: cursorX - gradientSize,
    right: cursorX + gradientSize,
    top: cursorY - gradientSize,
    bottom: cursorY + gradientSize,
  };

  const bounding = element.getBoundingClientRect();
  const elArea: IArea = {
    left: bounding.left,
    right: bounding.right,
    top: bounding.top,
    bottom: bounding.bottom,
  };

  const result = intersectRect(cursorArea, elArea);
  return result;
}

// ** CSS Effect ***************************************************************
function lightHoverEffect(gradientSize: number, x: number, y: number, lightColor: string) {
  return `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0))`;
}

function lightClickEffect(gradientSize: number, x: number, y: number, lightColor: string) {
  return `${lightHoverEffect(gradientSize, x, y, lightColor)}, radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
}

// ** Basic Draw Effect ********************************************************
function drawEffect(
  element: HTMLElement,
  x: number,
  y: number,
  lightColor: string,
  gradientSize: number,
  cssLightEffect: string | null = null) {
  const lightBg = cssLightEffect === null
    ? lightHoverEffect(gradientSize, x, y, lightColor)
    : cssLightEffect;

  element.style.backgroundImage = lightBg;
}

// with Mouse
function drawHoverEffect(element: HTMLElement, lightColor: string, gradientSize: number, e: MouseEvent) {
  const [x, y] = getXY(element, e);
  drawEffect(element, x, y, lightColor, gradientSize);
}

function drawClickEffect(element: HTMLElement, lightColor: string, gradientSize: number, e: MouseEvent) {
  const [x, y] = getXY(element, e);

  const cssLightEffect = lightClickEffect(gradientSize, x, y, lightColor);
  drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect);
}

// ** SideEffect Draw Effect ***************************************************
function clearEffect(resource: IResource, isPressed: IIsPressed) {
  isPressed[0] = false;
  resource.el.style.backgroundImage = resource.oriBg;
}

function drawContainerHoverEffect(resource: IResource, lightColor: string, gradientSize: number,
  isPressed: IIsPressed, e: MouseEvent) {
  const element = resource.el;

  if (isIntersected(element, e.clientX, e.clientY, gradientSize)) {
    drawHoverEffect(element, lightColor, gradientSize, e);
  }
  else {
    clearEffect(resource, isPressed);
  }
}

// Wrapper
function enableBackgroundEffects(resource: IResource, lightColor: string, gradientSize: number,
  clickEffect: boolean, isPressed: IIsPressed) {
  const element = resource.el;
  element.addEventListener('mousemove', (e) => {
    if (clickEffect && isPressed[0]) {
      drawClickEffect(element, lightColor, gradientSize, e);
    }
    else {
      drawHoverEffect(element, lightColor, gradientSize, e);
    }
  });

  element.addEventListener('mouseleave', () => {
    clearEffect(resource, isPressed);
  });
}

export function enableBorderEffects(resource: IResource, childrenBorders: IResource[], options: IEffectOptions, isPressed: IIsPressed) {
  const element = resource.el;
  const childrenBorderL = childrenBorders.length;

  element.addEventListener('mousemove', (e) => {
    for (let i = 0; i < childrenBorderL; i++) {
      drawContainerHoverEffect(childrenBorders[i], options.lightColor, options.gradientSize, isPressed, e);
    }
  });

  element.addEventListener('mouseleave', () => {
    for (let i = 0; i < childrenBorderL; i++) {
      clearEffect(childrenBorders[i], isPressed);
    }
  });
}

function enableClickEffects(resource: IResource, lightColor: string, gradientSize: number,
  isPressed: IIsPressed) {
  const element = resource.el;
  element.addEventListener('mousedown', (e) => {
    isPressed[0] = true;
    drawClickEffect(element, lightColor, gradientSize, e);
  });

  element.addEventListener('mouseup', (e) => {
    isPressed[0] = false;
    drawHoverEffect(element, lightColor, gradientSize, e);
  });
}

// Interface
export function enableNormalBackgroundEffetcs(resource: IResource, options: IEffectOptions, isPressed: IIsPressed) {
  enableBackgroundEffects(resource, options.lightColor, options.gradientSize, options.clickEffect, isPressed);
}
export function enableChildrenBackgroundEffetcs(resource: IResource, options: IEffectOptions, isPressed: IIsPressed) {
  enableBackgroundEffects(resource, options.children?.lightColor || '', options.children?.gradientSize || 100, options.clickEffect, isPressed);
}
export function enableNormalClickEffects(resource: IResource, options: IEffectOptions, isPressed: IIsPressed) {
  enableClickEffects(resource, options.lightColor, options.gradientSize, isPressed);
}
export function enableChildrenClickEffects(resource: IResource, options: IEffectOptions, isPressed: IIsPressed) {
  enableClickEffects(resource, options.children?.lightColor || '', options.children?.gradientSize || 100, isPressed);
}

// ** Element Processing *******************************************************
export function preProcessElement(element: HTMLElement): IResource {
  return ({
    oriBg: getComputedStyle(element).backgroundImage,
    el: element,
  });
}

export function preProcessElements(elements: NodeListOf<HTMLElement>) {
  const ressources: IResource[] = [];
  const elementsL = elements.length;
  for (let i = 0; i < elementsL; i++) {
    const element = elements[i];
    ressources.push(preProcessElement(element));
  }

  return ressources;
}

export function preProcessSelector(selector: string) {
  return preProcessElements(document.querySelectorAll(selector));
}
