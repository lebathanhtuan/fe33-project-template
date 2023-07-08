import styled, { css } from "styled-components";
import { Button } from "antd";

export const HomeWrapper = styled.div`
  padding: 16px;
  background-color: red;

  & .ahihi button {
    background-color: green;
  }
`;

export const HomeButton = styled.button`
  padding: 4px 10px;
  border: 1px solid gray;
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  background-color: white;
  color: black;

  &:hover {
    opacity: 0.5;
  }

  &:active {
    opacity: 0.8;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: black;
      color: white;
    `}
`;

export const AhihiButton = styled(HomeButton)`
  background-color: green;
`;

export const CustomButton = styled(Button)`
  padding: 8px 16px;
  height: 56px;
`;
