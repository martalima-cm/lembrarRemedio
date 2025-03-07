import React from "react";
import { Stack } from "expo-router";

export default function CalendarLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#FBFBFB" },
        animation: "slide_from_right",
      }}
    />
  );
}
