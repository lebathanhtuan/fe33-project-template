import { Button } from "antd";
import { useDispatch } from "react-redux";

import { setTheme } from "redux/slicers/common.slice";

import * as S from "./styles";

function UserFooter() {
  const dispatch = useDispatch();

  return (
    <S.FooterWrapper>
      <h2>Footer</h2>
      <Button onClick={() => dispatch(setTheme({ theme: "light" }))}>
        Light
      </Button>
      <Button onClick={() => dispatch(setTheme({ theme: "dark" }))}>
        Dark
      </Button>
    </S.FooterWrapper>
  );
}

export default UserFooter;
