// ** Global *******************************************************************
export interface resourceI {
    oriBg: string;
    el: HTMLElement;
}

// ** Mouse ********************************************************************
export type is_pressedI = [boolean]; // For reference variable

export interface AreaI {
    left:   number;
    right:  number;
    top:    number;
    bottom: number;
}

// ** Effect *******************************************************************
export interface effectOptionsI {
    lightColor:   string;
    gradientSize: number;
    clickEffect: boolean;
    isContainer: boolean;
    children: {
        borderSelector:  string,
        elementSelector: string,
        lightColor:      string,
        gradientSize:    number
    };
}
export type userEffectOptionsI = Partial<effectOptionsI>;

export interface enableEffectFuncI {
    (element:    resourceI,
     options:    effectOptionsI,
     is_pressed: is_pressedI    ): void
}
