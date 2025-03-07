// importando os módulos necessários
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication"; // Biometria
import { Ionicons } from "@expo/vector-icons"; // Ícones
import { LinearGradient } from "expo-linear-gradient"; // Gradiente

const { width } = Dimensions.get("window"); // Pegando a largura da tela

// Tela de autenticação
export default function AuthScreen() {
  const router = useRouter(); // Navegação
  const [isAuthenticating, setIsAuthenticating] = useState(false); // Autenticação
  const [error, setError] = useState<string | null>(null); // Erro
  const [hasBiometrics, setHasBiometrics] = useState(false); // Biometria

  // Verificação da biometria
  useEffect(() => {
    checkBiometrics();
  }, []);

  // Função para verificar a biometria
  const checkBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setHasBiometrics(hasHardware && isEnrolled);
  };

  // Função para autenticar
  const authenticate = async () => {
    try {
      setIsAuthenticating(true);
      setError(null);

      // Verificação da biometria
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      const hasBiometrics = await LocalAuthentication.isEnrolledAsync();

      // Autenticação
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage:
          hasHardware && hasBiometrics
            ? "Use Face ID ou Touch ID"
            : "Insira seu PIN para acessar o Hora do Remédio",
        fallbackLabel: "Usar PIN",
        cancelLabel: "Cancelar",
        disableDeviceFallback: false,
      });

      // Redirecionamento
      if (auth.success) {
        router.replace("/home");
      } else {
        setError("Falha na autenticação. Tente novamente.");
      }
    } catch (err) {
      setError("Ocorreu um erro. Tente novamente.");
      console.error(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <LinearGradient colors={["#19381F", "#2E7D32"]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.icone}>
          <Ionicons name="medical" size={80} color="white" />
        </View>

        <Text style={styles.title}>Hora do Remédio</Text>
        <Text style={styles.subtitle}>
          Seu Assistente Pessoal de Medicamentos
        </Text>

        <View style={styles.card}>
          <Text style={styles.welcomeText}>Seja Bem Vindo!</Text>
          <Text style={styles.instructionText}>
            {hasBiometrics
              ? "Use Face ID/Touch ID ou PIN para acessar seus medicamentos"
              : "Insira seu PIN para acessar seus medicamentos"}
          </Text>
          <TouchableOpacity
            style={[styles.button, isAuthenticating && styles.buttonDisabled]}
            onPress={authenticate}
            disabled={isAuthenticating}
          >
            <Ionicons
              name={hasBiometrics ? "finger-print-outline" : "keypad-outline"}
              size={24}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {isAuthenticating
                ? "Verificando..."
                : hasBiometrics
                ? "Autenticar"
                : "Digite o PIN"}
            </Text>
          </TouchableOpacity>

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#f44336" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icone: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 40,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FBFBFB",
    borderRadius: 20,
    padding: 30,
    width: width - 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ffebee",
    borderRadius: 8,
  },
  errorText: {
    color: "#f44336",
    marginLeft: 8,
    fontSize: 14,
  },
});
