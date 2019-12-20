import { registerEnumType } from 'type-graphql';

export enum ProfileColorsEnum {
  red = 'red',
  orange = 'orange',
  cyan = 'cyan',
  blue = 'blue',
  lime = 'lime',
  volcano = 'volcano',
  green = 'green',
}

registerEnumType(ProfileColorsEnum, {
  name: 'ProfileColorsEnum',
});
