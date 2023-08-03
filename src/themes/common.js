import { css } from "styled-components";

export const breakpoint = {
  sm: "576px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

export const colors = {
  light: "#fff",
  dark1: "#2e2e2e",
  dark2: "#414141",
  primary1: "#ffcc21",
  primary2: "#ff963c",
  primary3: "#ea6c00",
  primaryGradient: "linear-gradient(180deg, #FFCC21 0%, #FF963C 100%)",
  secondary1: "#8fe9d0",
  gray1: "#777777",
  gray2: "#2e2e2e",
};

export const fontSizes = {
  xxs: "8px",
  xs: "10px",
  sm: "12px",
  md: "14px",
  lg: "16px",
  xl: "18px",
  xxl: "20px",
  xxxl: "22px",
};

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

export const fontFamily = {
  jp: "Noto Sans JP",
  en: "Inter",
};

export const borderRadius = {
  sm: "3px",
  md: "5px",
  lg: "8px",
  rounded: "999px",
};

export const boxShadow = {
  md: "0px 3px 6px rgba(0, 0, 0, 0.160784)",
};

export const container = {
  md: "960px",
};

export const truncateMultipleLine = (linesToShow) => css`
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: ${linesToShow};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
