import * as S from "./Avatar.styled";

import React from "react";

function Avatar(props: React.ComponentProps<typeof S.Avatar>) {
  return <S.Avatar {...props} />;
}

export default Avatar;
