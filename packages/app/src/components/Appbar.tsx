import React from "react";
import { Flex } from "@react-spectrum/layout";
import { View } from "@react-spectrum/view";
import { Button } from "@adobe/react-spectrum";
import { useReactiveVar } from "@apollo/client";
import Light from "@spectrum-icons/workflow/Light";
import LogOut from "@spectrum-icons/workflow/LogOut";

import { colorSchemeVar } from "../App";
import { useAuth } from "../lib/odinAuth";

function Appbar() {
  const colorScheme = useReactiveVar(colorSchemeVar);
  const { logout } = useAuth();

  return (
    <View backgroundColor="gray-200" height="size-600">
      <Flex alignItems="center" height="size-600" gap="size-150">
        <Button
          variant="secondary"
          onPress={() =>
            colorSchemeVar(colorScheme === "dark" ? "light" : "dark")
          }
        >
          <Light />
        </Button>
        <Button variant="negative" onPress={logout}>
          <LogOut />
        </Button>
      </Flex>
    </View>
  );
}

export default Appbar;
