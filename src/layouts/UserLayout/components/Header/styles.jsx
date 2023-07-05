import styled from "styled-components";

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  width: 100%;
  height: 56px;
  background-color: darkcyan;
  z-index: 99;
`;

export const NavLinkContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  height: 100%;
  transform: translate(-50%, -50%);
`;

export const NavLinkItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 100%;
  cursor: pointer;

  &:hover {
    background-color: #006969;
    transition: all 0.3s;
  }
`;
