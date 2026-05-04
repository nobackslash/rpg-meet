import { ScrollView, Text, View, TouchableOpacity, Pressable, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RPG_TYPES = [
  { id: "dnd5e", label: "D&D 5e" },
  { id: "pathfinder", label: "Pathfinder" },
  { id: "coc", label: "Call of Cthulhu" },
  { id: "wod", label: "World of Darkness" },
  { id: "generic", label: "Genérico" },
];

export default function CreateRoomScreen() {
  const router = useRouter();
  const colors = useColors();
  const [roomName, setRoomName] = useState("");
  const [selectedType, setSelectedType] = useState("dnd5e");
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      Alert.alert("Erro", "Por favor, insira um nome para a sala");
      return;
    }

    setLoading(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      // Gerar um ID único para a sala
      const roomId = `rpg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Armazenar informações da sala
      const roomData = {
        id: roomId,
        name: roomName,
        type: selectedType,
        createdAt: new Date().toISOString(),
        createdBy: "Host",
      };

      await AsyncStorage.setItem(`room-${roomId}`, JSON.stringify(roomData));

      // Adicionar à lista de salas recentes
      const recentRooms = JSON.parse(await AsyncStorage.getItem("recent-rooms") || "[]");
      recentRooms.unshift(roomData);
      if (recentRooms.length > 5) recentRooms.pop();
      await AsyncStorage.setItem("recent-rooms", JSON.stringify(recentRooms));

      // Navegar para a tela de videoconferência
      router.navigate({
        pathname: "/video-room",
        params: { roomId, isHost: "true" },
      });
    } catch (error) {
      console.error("Erro ao criar sala:", error);
      Alert.alert("Erro", "Falha ao criar a sala. Tente novamente.");
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
              <Text className="text-3xl font-bold text-foreground">Criar Sala</Text>
              <Text className="text-base text-muted mt-2">Configure sua sessão de RPG</Text>
            </View>
          </View>

          {/* Form */}
          <View className="gap-6">
            {/* Room Name */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Nome da Sala</Text>
              <TextInput
                placeholder="Ex: Aventura na Floresta Escura"
                placeholderTextColor={colors.muted}
                value={roomName}
                onChangeText={setRoomName}
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

            {/* RPG Type */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Tipo de RPG</Text>
              <View className="gap-2">
                {RPG_TYPES.map((type) => (
                  <Pressable
                    key={type.id}
                    onPress={() => setSelectedType(type.id)}
                    style={({ pressed }) => [
                      {
                        backgroundColor: selectedType === type.id ? colors.primary : colors.surface,
                        borderColor: selectedType === type.id ? colors.primary : colors.border,
                        borderWidth: 2,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                  >
                    <Text
                      className={`text-base font-semibold ${
                        selectedType === type.id ? "text-white" : "text-foreground"
                      }`}
                    >
                      {type.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* Create Button */}
          <View className="gap-3 mt-8">
            <Pressable
              onPress={handleCreateRoom}
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
                {loading ? "Criando..." : "Criar Sala"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
