import { colors } from "../constants/Constants";

export const generateRandomGradient = () => {
  const halfLength = Math.floor(colors.length / 2);
  const color1 = colors[Math.floor(Math.random() * halfLength)];
  let color2;
  do {
    color2 = colors[Math.floor(Math.random() * halfLength) + halfLength];
  } while (color2 === color1);
  return `linear-gradient(45deg, ${color1}, ${color2})`;
};
