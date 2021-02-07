import React, { useState } from "react";
import { Send } from "@styled-icons/material/Send";

import * as S from "./NewPost.styled";
import Avatar from "../../marvieUI/Avatar";

type PropsType = {
  onSubmit: (content: string) => void;
};

const NewPost = (props: PropsType) => {
  const [content, setContent] = useState("");

  return (
    <S.Container>
      <Avatar src={"https://placekitten.com/40/40"} />
      <S.Input
        type="text"
        onChange={({ target: { value } }) => setContent(value)}
        value={content}
      />
      <S.PostButton>
        <Send
          onClick={() => {
            props.onSubmit(content);
          }}
        />
      </S.PostButton>
    </S.Container>
  );
};

export default NewPost;
