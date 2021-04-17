import React from "react";

import { Button, Flex, Header, Heading, View } from "@adobe/react-spectrum";
import { SiFacebook, SiGoogle, SiGithub } from "react-icons/si";
import { useAuth } from "../lib/odinAuth";

const LoginPage = () => {
  const { facebookLogin, githubLogin, googleLogin } = useAuth();

  return (
    <View padding="size-150" margin="auto" maxWidth="static-size-6000">
      <Header>
        <Flex justifyContent="center">
          <Heading level={1}>Login</Heading>
        </Flex>
      </Header>

      <Flex direction="column" gap="size-200" justifyContent="center">
        <Button
          variant="overBackground"
          onPress={() => facebookLogin()}
          UNSAFE_style={{ background: "#DB4437" }}
        >
          <SiGoogle size={24} style={{ paddingRight: "8px" }} /> Continue with
          Google
        </Button>
        <Button variant="overBackground" onPress={() => githubLogin()}>
          <SiGithub size={24} style={{ paddingRight: "8px" }} /> Continue with
          Github
        </Button>
        <Button
          variant="overBackground"
          onPress={() => googleLogin()}
          UNSAFE_style={{ background: "#4267B2" }}
        >
          <SiFacebook size={24} style={{ paddingRight: "8px" }} /> Continue with
          Facebook
        </Button>
      </Flex>
    </View>
  );
};

export default LoginPage;
