import { ScrollView, Text, View, TouchableOpacity, Pressable, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function JoinRoomScreen() {
  const router = useRouter();
  const colors = useColors();
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoinRoom = async () => {
    if (!roomCode.trim()) {
      Alert.alert("Erro", "Por favor, insira o código da sala");
      return;
    }

    if (!playerName.trim()) {
      Alert.alert("Erro", "Por favor, insira seu nome");
      return;
    }

    setLoading(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      // Validar se a sala existe
      const roomData = await AsyncStorage.getItem(`room-${roomCode}`);
      if (!roomData) {
        Alert.alert("Erro", "Sala não encontrada. Verifique o código.");
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setLoading(false);
        return;
      }

      // Navegar para a tela de videoconferência
      router.navigate({
        pathname: "/video-room",
        params: { roomId: roomCode, playerName, isHost: "false" },
      });
    } catch (error) {
      console.error("Erro ao entrar na sala:", error);
      Alert.alert("Erro", "Falha ao entrar na sala. Tente novamente.");
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between">
          {/* Header */}
          <View className="gap-4 mb-8">
            <Pressable onPress={handleBack} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
              <Text className="text-lg font-semibold text-primary">← Voltar</Text>
            </Pressable>
            <View>
              <Text className="text-3xl font-bold text-foreground">Entrar em Sala</Text>
              <Text className="text-base text-muted mt-2">Conecte-se a uma sessão existente</Text>
            </View>
          </View>

          {/* Form */}
          <View className="gap-6">
            {/* Room Code */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Código da Sala</Text>
              <TextInput
                placeholder="Ex: rpg-1234567890-abc123def"
                placeholderTextColor={colors.muted}
                value={roomCode}
                onChangeText={setRoomCode}
                autoCapitalize="none"
                style={{
                  backgroundColor: colors.surface,
                  color: colors.foreground,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  fontSize: 14,
                  fontFamily: "monospace",
                }}
              />
              <Text className="text-xs text-muted">Peça o código ao mestre da sessão</Text>
            </View>

            {/* Player Name */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Seu Nome</Text>
              <TextInput
                placeholder="Ex: Aragorn, Gandalf, Legolas"
                placeholderTextColor={colors.muted}
                value={playerName}
                onChangeText={setPlayerName}
                style={{
                  backgroundColor: colors.surface,
                  color: colors.foreground,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  fontSize: 16,
                }}
              />
            </View>
          </View>

          {/* Join Button */}
          <View className="gap-3 mt-8">
            <Pressable
              onPress={handleJoinRoom}
              disabled={loading}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.primary,
                  paddingVertical: 16,
                  borderRadius: 12,
                  opacity: loading ? 0.6 : pressed ? 0.9 : 1,
                  transform: [{ scale: pressed && !loading ? 0.97 : 1 }],
                },
              ]}
            >
              <Text className="text-center text-lg font-semibold text-white">
                {loading ? "Conectando..." : "Entrar"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
