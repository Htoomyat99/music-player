import { View, Text } from "react-native";
import React, { PropsWithChildren } from "react";

const StopPropagation = ({ children }: PropsWithChildren) => {
  return (
    <View
      onStartShouldSetResponder={() => true}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      {children}
    </View>
  );
};

export default StopPropagation;
