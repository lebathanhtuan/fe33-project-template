import styled, { css } from "styled-components";

const typographyStyle = css`
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  color: ${({ color, theme }) =>
    color ? theme.colors[color] : theme.colors.dark2};
  font-family: "${({ theme }) => theme.fontFamily.jp}",
    ${({ theme }) => theme.fontFamily.en}, sans-serif;
  white-space: pre-line;
  word-break: break-word;

  ${({ truncate }) =>
    truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}

  ${({ truncateMultiLine, theme }) =>
    truncateMultiLine && theme.truncateMultipleLine(truncateMultiLine)}
    
  ${({ lang }) =>
    lang &&
    css`
      font-family: "${({ theme }) => theme.fontFamily[lang]}", sans-serif;
    `}

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}

  ${({ underline }) =>
    underline &&
    css`
      text-decoration: underline;
    `}

  ${({ uppercase }) =>
    uppercase &&
    css`
      text-transform: uppercase;
    `}

  ${({ pointer }) =>
    pointer &&
    css`
      cursor: pointer;
    `}
`;

const textStyle = css`
  font-size: ${({ size, theme }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.md};
  font-weight: ${({ weight, theme }) =>
    weight ? theme.fontWeights[weight] : theme.fontWeights.regular};
`;

const titleStyle = css`
  font-weight: ${({ weight, theme }) =>
    weight ? theme.fontWeights[weight] : theme.fontWeights.bold};
`;

export const Text = styled.p`
  ${textStyle}
  ${typographyStyle}
`;

export const Label = styled.label`
  ${textStyle}
  ${typographyStyle}
`;

export const H1 = styled.h1`
  font-size: ${({ size, theme }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.xxxl};
  ${titleStyle}
  ${typographyStyle}
`;
export const H2 = styled.h2`
  font-size: ${({ size, theme }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.xxl};
  ${titleStyle}
  ${typographyStyle}
`;
export const H3 = styled.h3`
  font-size: ${({ size, theme }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.xl};
  ${titleStyle}
  ${typographyStyle}
`;
export const H4 = styled.h4`
  font-size: ${({ size, theme }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.lg};
  ${titleStyle}
  ${typographyStyle}
`;
export const H5 = styled.h5`
  font-size: ${({ size, theme }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.md};
  ${titleStyle}
  ${typographyStyle}
`;
export const H6 = styled.h6`
  font-size: ${({ size, theme }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.sm};
  ${titleStyle}
  ${typographyStyle}
`;
