import {
  ActionButton,
  Button,
  Dialog,
  DialogTrigger,
  Divider,
  Content,
  Flex,
  Text,
  View,
  Heading,
  Link,
  Footer,
  ButtonGroup,
  Image,
} from "@adobe/react-spectrum";
import { useReactiveVar } from "@apollo/client";
import { Link as RouterLink, useHistory } from "react-router-dom";

import Light from "@spectrum-icons/workflow/Light";
import LogOut from "@spectrum-icons/workflow/LogOut";
import ShowMenu from "@spectrum-icons/workflow/ShowMenu";
import RealTimeCustomerProfile from "@spectrum-icons/workflow/RealTimeCustomerProfile";
import Settings from "@spectrum-icons/workflow/Settings";
import Branch2 from "@spectrum-icons/workflow/Branch2";

import { colorSchemeVar } from "../../App";
import { useAuth, useRegistration } from "../../lib/odinAuth";
import Avatar from "../Avatar";

function Appbar() {
  const colorScheme = useReactiveVar(colorSchemeVar);
  const { logout } = useAuth();
  const { user } = useRegistration();
  const history = useHistory();

  if (!user) {
    return null;
  }

  return (
    <View backgroundColor="gray-200" height="size-600" paddingX="size-150">
      <Flex alignItems="center" height="size-600">
        <Link UNSAFE_style={{ textDecoration: "none" }}>
          <RouterLink to="/">
            <Flex alignItems="center" gap="size-150">
              <Image
                height="size-350"
                width="size-350"
                alt=""
                src="/logo.svg"
                UNSAFE_style={{
                  color: "--spectrum-global-color-gray-900",
                }}
              />
              <Text
                UNSAFE_style={{
                  fontSize: "2em",
                  color: "var(--spectrum-global-color-gray-900)",
                }}
              >
                Odinbook
              </Text>
            </Flex>
          </RouterLink>
        </Link>

        <ButtonGroup marginStart="auto">
          <ActionButton
            marginStart="auto"
            onPress={() =>
              colorSchemeVar(colorScheme === "dark" ? "light" : "dark")
            }
          >
            <Light />
          </ActionButton>

          <DialogTrigger isDismissable>
            <ActionButton marginStart="size-100">
              <ShowMenu />
            </ActionButton>
            {(close) => (
              <Dialog width="size-4600">
                <Heading>
                  <View>
                    <Flex gap="size-150" alignItems="center">
                      <Avatar src={user.thumb!} />
                      <Heading level={1} margin="0">
                        {`${user.firstname} ${user.surname}`}
                      </Heading>
                    </Flex>
                  </View>
                </Heading>
                <Divider />

                <Content>
                  <Flex
                    direction="column"
                    margin="auto"
                    marginTop="size-300"
                    gap="size-100"
                  >
                    <Button
                      variant="secondary"
                      isQuiet
                      width="100%"
                      onPress={() => {
                        history.push(`/user/${user.username}/`);
                        close();
                      }}
                    >
                      <RealTimeCustomerProfile />
                      <Text>My Profile</Text>
                    </Button>

                    <Button
                      variant="secondary"
                      isQuiet
                      width="100%"
                      onPress={() => {
                        history.push(`/user/${user.username}/connections`);
                        close();
                      }}
                    >
                      <Branch2 />
                      <Text>Connections</Text>
                    </Button>

                    <Button
                      variant="secondary"
                      isQuiet
                      width="100%"
                      onPress={() => {
                        history.push("/settings/");
                        close();
                      }}
                    >
                      <Settings />
                      <Text>Settings</Text>
                    </Button>
                  </Flex>
                </Content>

                <Footer>
                  <Flex justifyContent="end" width="100%">
                    <Button
                      variant="negative"
                      onPress={logout}
                      aria-label="Logout"
                    >
                      <LogOut />
                      <Text>Log out</Text>
                    </Button>
                  </Flex>
                </Footer>
              </Dialog>
            )}
          </DialogTrigger>
        </ButtonGroup>
      </Flex>
    </View>
  );
}

export default Appbar;
