// ** Global *******************************************************************
export interface IResource {
  oriBg: string;
  el: HTMLElement;
}

// ** Mouse ********************************************************************
export type IIs_Pressed = [boolean]; // For reference variable

export interface IArea {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

// ** Effect *******************************************************************
export interface IEffectOptions {
  lightColor: string;
  gradientSize: number;
  clickEffect: boolean;
  isContainer: boolean;
  children: {
    borderSelector: string,
    elementSelector: string,
    lightColor: string,
    gradientSize: number
  };
}
export type IUserEffectOptions = Partial<IEffectOptions>;

export interface IEnableEffectFunc {
  (element: IResource,
    options: IEffectOptions,
    is_pressed: IIs_Pressed): void
}
