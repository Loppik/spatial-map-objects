import { COLORS, NAMES_SET_1, NAMES_SET_2 } from './constants';

export const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const capFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
export const getRandName = () =>
  capFirstLetter(NAMES_SET_1[getRandInt(0, NAMES_SET_1.length-1)]) + ' ' + capFirstLetter(NAMES_SET_2[getRandInt(0, NAMES_SET_2.length-1)])

export const getRandColor = () => COLORS[getRandInt(0, COLORS.length-1)];

export const convertCoordinatesToLatLng = (type, coordinates) => {
  if (type === 'Polygon') {
    return coordinates[0].map(c => ({ lat: c[1], lng: c[0] }));
  }
  if (type === 'MultiPolygon') {
    return coordinates.map(polygon => polygon[0].map(c => ({ lat: c[1], lng: c[0] })));
  }
};
