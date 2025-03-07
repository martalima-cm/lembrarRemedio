import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function SplashScreen() {
  const router = useRouter(); // Navegação
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacidade
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Escala
  // Animação de entrada
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();

    // Redirecionamento
    const timer = setTimeout(() => {
      router.replace("/auth");
    }, 2000);

    // Limpeza
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.icone,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Ionicons name="medkit" size={100} color="white" />
        <Text style={styles.title}>Hora do Remédio</Text>
      </Animated.View>
    </View>
  ); //Fim do returno
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19231A",
    alignItems: "center",
    justifyContent: "center",
  },
  icone: {
    alignItems: "center",
  },
  title: {
    color: "#FBFBFB",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    letterSpacing: 1,
  },
});
