import styled, { css } from "styled-components";
import { Card, Avatar } from "antd";

export const ProfileWrapper = styled.div`
  margin: 0 auto;
  padding: 16px;
  max-width: 1232px;
`;

export const ProfileMenuWrapper = styled(Card)`
  & .ant-card-body {
    padding: 0;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const AvatarUpload = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const AvatarEdit = styled.div`
  position: absolute;
  right: 4px;
  bottom: 4px;
  z-index: 1;

  & > input {
    display: none;
  }

  & > label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    margin-bottom: 0;
    border-radius: 100%;
    background: #ffffff;
    border: 1px solid #e3e4e6;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      background: #f1f1f1;
      border-color: #d6d6d6;
    }
  }
`;

export const AvatarPreview = styled.img`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  padding: 3px;
  border: 3px solid #d2d6de;
  border-radius: 50%;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  object-fit: cover;
`;

export const AvatarDefaultWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  padding: 3px;
  border: 3px solid #d2d6de;
  border-radius: 50%;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
`;

export const AvatarDefaultContainer = styled(Avatar)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #87d068;
`;

export const ProfileMenuContainer = styled.div`
  padding-bottom: 24px;
`;

export const ProfileMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  color: #414141

  transition: all 0.2s;

  &:hover {
    background-color: #b0ffff;
  }

  ${({ active }) =>
    active &&
    css`
      border-right: 5px solid #008b8b;
      background-color: #00e6e6;

      &:hover {
        background-color: #00e6e6;
      }
    `}
`;
