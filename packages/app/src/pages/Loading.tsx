import { Flex, View, ProgressCircle } from "@adobe/react-spectrum";

function LoadingPage() {
  return (
    <Flex justifyContent="center" gap="size-150">
      <View padding="size-300">
        <ProgressCircle aria-label="Loading..." isIndeterminate size="L" />
      </View>
    </Flex>
  );
}

export default LoadingPage;
