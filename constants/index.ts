import { Dimensions } from 'react-native';


export * from './errors';
export * from './itemsMenuAdmin';
export * from './itemsPaymentMethods';
export * from './itemsTab';
export * from './keys';
export * from './months';


export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;

export const isTablet = deviceWidth >= 768 && deviceHeight >= 1024;