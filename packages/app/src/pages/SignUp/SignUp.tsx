import { useState } from "react";
import { View } from "@react-spectrum/view";
import { Helmet } from "react-helmet";
import {
  Button,
  Flex,
  Heading,
  ProgressCircle,
  Text,
  TextField,
} from "@adobe/react-spectrum";
import { Redirect } from "react-router-dom";
import { useFinishSignUpMutation } from "../../generated/graphql";

type FormKeys = "firstName" | "lastName" | "username";

type FormField = {
  value: string;
  validation: "valid" | "invalid" | undefined;
};

const SignUpPage = () => {
  const [createUser, result] = useFinishSignUpMutation();

  const [form, setForm] = useState<Record<FormKeys, FormField>>({
    firstName: { value: "", validation: undefined },
    lastName: { value: "", validation: undefined },
    username: { value: "", validation: undefined },
  });

  const ChangeFirstName = (value: string) =>
    setForm((state) => {
      const validation = !value
        ? undefined
        : value.trim().length > 0
        ? "valid"
        : "invalid";

      return {
        ...state,
        firstName: { value, validation },
      };
    });

  const ChangeLastName = (value: string) =>
    setForm((state) => {
      const validation = !value
        ? undefined
        : value.trim().length > 0
        ? "valid"
        : "invalid";

      return {
        ...state,
        lastName: { value, validation },
      };
    });

  const ChangeUsername = (value: string) =>
    setForm((state) => {
      const validation = !value
        ? undefined
        : value.trim().length > 5
        ? "valid"
        : "invalid";

      return {
        ...state,
        username: { value, validation },
      };
    });

  const submit = async () => {
    const isFormValid = Object.values(form).every(
      (field) => field.validation === "valid"
    );
    if (!isFormValid) {
      setForm((state) => {
        for (const stateKey in state) {
          if (state[stateKey as FormKeys].validation === undefined) {
            state[stateKey as FormKeys].validation = "invalid";
          }
        }

        return { ...state };
      });
      return;
    }

    try {
      await createUser({
        variables: {
          input: {
            firstname: form.firstName.value,
            surname: form.lastName.value,
            username: form.username.value,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validSubmission = Object.values(form).every(
    (field) => field.validation !== "invalid"
  );

  if (!result.loading && result.data) {
    return <Redirect to={`/user/${result.data.createUser.username}/`} />;
  }

  return (
    <>
      <Helmet>
        <title>SignUp - Odinbook</title>
      </Helmet>
      <View margin="auto" maxWidth="size-6000" padding="size-150">
        <Heading level={1}>Finish your SignUp</Heading>

        {result.loading ? (
          <Flex justifyContent="center" gap="size-150">
            <View>
              <ProgressCircle
                aria-label="Loading..."
                isIndeterminate
                size="L"
              />
            </View>
            <Text>Loading...</Text>
          </Flex>
        ) : (
          <Flex direction="column" gap="size-150">
            <TextField
              value={form.firstName.value}
              label="First Name"
              width="100%"
              validationState={form.firstName.validation}
              onChange={ChangeFirstName}
              isRequired
            />
            <TextField
              value={form.lastName.value}
              label="Last Name"
              width="100%"
              validationState={form.lastName.validation}
              onChange={ChangeLastName}
              isRequired
            />
            <TextField
              value={form.username.value}
              label="Username"
              width="100%"
              validationState={form.username.validation}
              onChange={ChangeUsername}
              isRequired
            />

            <View paddingTop="size-300">
              <Button
                variant="cta"
                width="100%"
                isDisabled={!validSubmission || result.loading}
                onPress={submit}
              >
                Create
              </Button>
            </View>
          </Flex>
        )}
      </View>
    </>
  );
};

export default SignUpPage;
