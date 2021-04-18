import React from "react";
import { Flex, View, ProgressCircle, Text } from "@adobe/react-spectrum";

function GenericLoading() {
  return (
    <Flex justifyContent="center" gap="size-150">
      <View>
        <ProgressCircle aria-label="Loading..." isIndeterminate size="L" />
      </View>
      <Text>Loading</Text>
    </Flex>
  );
}

export default GenericLoading;
