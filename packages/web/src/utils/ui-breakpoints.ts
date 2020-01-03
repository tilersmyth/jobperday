import { BreakpointEnum } from '../apollo';

export enum Breakpoints {
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600,
}

export const uiBreakpoint = (width: number) => {
  switch (true) {
    case width <= Breakpoints.XS:
      return BreakpointEnum.Xs;
    case width > Breakpoints.XS && width <= Breakpoints.SM:
      return BreakpointEnum.Sm;
    case width > Breakpoints.SM && width <= Breakpoints.MD:
      return BreakpointEnum.Md;
    case width > Breakpoints.MD && width <= Breakpoints.LG:
      return BreakpointEnum.Lg;
    case width > Breakpoints.LG && width <= Breakpoints.XL:
      return BreakpointEnum.Xl;
    default:
      return BreakpointEnum.Xxl;
  }
};
