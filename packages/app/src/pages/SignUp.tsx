import React from "react";
import { View } from "@react-spectrum/view";
import { Helmet } from "react-helmet";
import { Button, Flex, Heading, TextField } from "@adobe/react-spectrum";

const SignUpPage = () => {
  return (
    <>
      <Helmet>
        <title>SignUp - Odinbook</title>
      </Helmet>
      <View margin="auto" maxWidth="size-6000" padding="size-150">
        <Heading level={1}>Finish your SignUp</Heading>

        <Flex direction="column" gap="size-150">
          <TextField label="First Name" width="100%" isRequired />
          <TextField label="Last Name" width="100%" isRequired />
          <TextField label="Username" width="100%" isRequired />

          <View paddingTop="size-300">
            <Button variant="cta" width="100%">
              Create
            </Button>
          </View>
        </Flex>
      </View>
    </>
  );
};

export default SignUpPage;
