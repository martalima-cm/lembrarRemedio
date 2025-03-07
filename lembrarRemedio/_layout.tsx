// Importando os componentes necessários
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack // Navegação em pilha
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
          animation: "slide_from_right",
          header: () => null, // Ocultando o cabeçalho
          navigationBarHidden: true,
        }}
      >
        <Stack.Screen // Ocultando o cabeçalho
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen // Ocultando o cabeçalho
          name="medications/add"
          options={{
            headerShown: false,
            headerBackTitle: "",
            title: "",
          }}
        />
        <Stack.Screen // Ocultando o cabeçalho
          name="refills/index"
          options={{
            headerShown: false,
            headerBackTitle: "",
            title: "",
          }}
        />
        <Stack.Screen // Ocultando o cabeçalho
          name="calendar/index"
          options={{
            headerShown: false,
            headerBackTitle: "",
            title: "",
          }}
        />
        <Stack.Screen // Ocultando o cabeçalho
          name="history/index"
          options={{
            headerShown: false,
            headerBackTitle: "",
            title: "",
          }}
        />
      </Stack>
    </>
  );
}
