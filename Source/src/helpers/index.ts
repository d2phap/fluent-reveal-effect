import { resourceI, is_pressedI, AreaI, effectOptionsI } from  "../types";

// ** Postion ******************************************************************
function getOffset (element: HTMLElement) {
    const bounding = element.getBoundingClientRect();

    return ({
        top:  bounding.top,
        left: bounding.left
    });
}

// with Mouse
function getXY(element: HTMLElement, e: MouseEvent) {
    const offset = getOffset(element);
    const x = e.pageX - offset.left - window.scrollX;
    const y = e.pageY - offset.top  - window.scrollY;

    return [x, y];
}


// for Container
function intersectRect(r1: AreaI, r2: AreaI) {
    return !(
        r2.left   > r1.right  ||
            r2.right  < r1.left   ||
            r2.top    > r1.bottom ||
            r2.bottom < r1.top
    );
}
function isIntersected(element: HTMLElement, cursor_x: number, cursor_y: number, gradientSize: number) {
    const cursor_area: AreaI = {
        left:   cursor_x - gradientSize,
        right:  cursor_x + gradientSize,
        top:    cursor_y - gradientSize,
        bottom: cursor_y + gradientSize
    };

    const bounding = element.getBoundingClientRect();
    const el_area: AreaI = {
        left:   bounding.left,
        right:  bounding.right,
        top:    bounding.top,
        bottom: bounding.bottom
    };

    const result = intersectRect(cursor_area, el_area);
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
    cssLightEffect: string | null = null ) {
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
function clearEffect(resource: resourceI, is_pressed: is_pressedI) {
    is_pressed[0] = false;
    resource.el.style.backgroundImage = resource.oriBg;
}

function drawContainerHoverEffect(resource: resourceI, lightColor: string, gradientSize: number,
                                  is_pressed: is_pressedI, e: MouseEvent) {
    const element = resource.el;

    if (isIntersected(element, e.clientX, e.clientY, gradientSize)) {
        drawHoverEffect(element, lightColor, gradientSize, e);
    }
    else {
        clearEffect(resource, is_pressed);
    }
}

// Wrapper
function enableBackgroundEffects(resource: resourceI, lightColor: string, gradientSize: number,
                                 clickEffect: boolean, is_pressed: is_pressedI) {
    const element = resource.el;
    element.addEventListener("mousemove", (e) => {
        if (clickEffect && is_pressed[0]) {
            drawClickEffect(element, lightColor, gradientSize, e);
        }
        else {
            drawHoverEffect(element, lightColor, gradientSize, e);
        }
    });

    element.addEventListener("mouseleave", (e) => {
        clearEffect(resource, is_pressed);
    });
}

export function enableBorderEffects(resource: resourceI, childrenBorders: resourceI[], options: effectOptionsI, is_pressed: is_pressedI) {
    const element = resource.el;
    const childrenBorderL = childrenBorders.length;

    element.addEventListener("mousemove", (e) => {
        for (let i = 0; i < childrenBorderL; i++) {
            drawContainerHoverEffect(childrenBorders[i], options.lightColor, options.gradientSize, is_pressed, e);
        }
    });

    element.addEventListener("mouseleave", (e) => {
        for (let i = 0; i < childrenBorderL; i++) {
            clearEffect(childrenBorders[i], is_pressed);
        }
    });
}

function enableClickEffects(resource: resourceI, lightColor: string, gradientSize: number,
                            is_pressed: is_pressedI) {
    const element = resource.el;
    element.addEventListener("mousedown", (e) => {
        is_pressed[0] = true;
        drawClickEffect(element, lightColor, gradientSize, e);
    });

    element.addEventListener("mouseup", (e) => {
        is_pressed[0] = false;
        drawHoverEffect(element, lightColor, gradientSize, e);
    });
}

// Interface
export function enableNormalBackgroundEffetcs(resource: resourceI, options: effectOptionsI, is_pressed: is_pressedI) {
    enableBackgroundEffects(resource, options.lightColor, options.gradientSize, options.clickEffect, is_pressed);
}
export function enableChildrenBackgroundEffetcs(resource: resourceI, options: effectOptionsI, is_pressed: is_pressedI) {
    enableBackgroundEffects(resource, options.children.lightColor, options.children.gradientSize, options.clickEffect, is_pressed);
}
export function enableNormalClickEffects(resource: resourceI, options: effectOptionsI, is_pressed: is_pressedI) {
    enableClickEffects(resource, options.lightColor, options.gradientSize, is_pressed);
}
export function enableChildrenClickEffects(resource: resourceI, options: effectOptionsI, is_pressed: is_pressedI) {
    enableClickEffects(resource, options.children.lightColor, options.children.gradientSize, is_pressed);
}

// ** Element Processing *******************************************************
export function preProcessElement(element: HTMLElement): resourceI {
    return ({
        oriBg: getComputedStyle(element).backgroundImage,
        el: element
    });
}

export function preProcessElements(elements: NodeListOf<HTMLElement>) {
    const ressources: resourceI[] = [];
    const elementsL = elements.length;
    for(let i = 0; i < elementsL; i++) {
        const element = elements[i];
        ressources.push(preProcessElement(element));
    }

    return ressources;
}

export function preProcessSelector(selector: string) {
    return preProcessElements(document.querySelectorAll(selector));
}
