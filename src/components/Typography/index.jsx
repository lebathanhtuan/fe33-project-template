import * as S from "./styles";

const Text = ({ children, ...rest }) => <S.Text {...rest}>{children}</S.Text>;

const Label = ({ children, ...rest }) => (
  <S.Label {...rest}>{children}</S.Label>
);

const Title = ({ children, level, ...rest }) => {
  switch (level) {
    case 1: {
      return <S.H1 {...rest}>{children}</S.H1>;
    }
    case 2: {
      return <S.H2 {...rest}>{children}</S.H2>;
    }
    case 4: {
      return <S.H4 {...rest}>{children}</S.H4>;
    }
    case 5: {
      return <S.H5 {...rest}>{children}</S.H5>;
    }
    case 6: {
      return <S.H6 {...rest}>{children}</S.H6>;
    }
    case 3:
    default: {
      return <S.H3 {...rest}>{children}</S.H3>;
    }
  }
};

const Typography = () => {};

Typography.Text = Text;
Typography.Label = Label;
Typography.Title = Title;

export default Typography;
