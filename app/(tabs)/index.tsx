import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();

  const handleCreateRoom = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.navigate("/create-room");
  };

  const handleJoinRoom = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.navigate("/join-room");
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center gap-8">
          {/* Hero Section */}
          <View className="items-center gap-4">
            <View className="w-20 h-20 bg-primary rounded-full items-center justify-center">
              <Text className="text-4xl">🎲</Text>
            </View>
            <View className="items-center gap-2">
              <Text className="text-4xl font-bold text-foreground">RPG Meet</Text>
              <Text className="text-base text-muted text-center">
                Videoconferência para Sessões de RPG de Mesa
              </Text>
            </View>
          </View>

          {/* Features */}
          <View className="gap-3">
            <FeatureCard icon="🎬" title="Videoconferência" description="Conecte-se com seus amigos via Jitsi Meet" />
            <FeatureCard icon="🎲" title="Rolagem de Dados" description="Role dados integrados na chamada" />
            <FeatureCard icon="👥" title="Multiplayer" description="Compartilhe resultados com todos" />
          </View>

          {/* Action Buttons */}
          <View className="gap-4">
            <Pressable
              onPress={handleCreateRoom}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.primary,
                  paddingVertical: 16,
                  borderRadius: 12,
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Text className="text-center text-lg font-semibold text-white">Criar Sala</Text>
            </Pressable>

            <Pressable
              onPress={handleJoinRoom}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  paddingVertical: 16,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: colors.primary,
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Text className="text-center text-lg font-semibold text-primary">Entrar em Sala</Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="items-center gap-1">
            <Text className="text-xs text-muted">Versão 1.0.0</Text>
            <Text className="text-xs text-muted">Powered by Jitsi Meet</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <View className="bg-surface rounded-xl p-4 border border-border flex-row gap-3">
      <Text className="text-3xl">{icon}</Text>
      <View className="flex-1 justify-center">
        <Text className="text-base font-semibold text-foreground">{title}</Text>
        <Text className="text-sm text-muted">{description}</Text>
      </View>
    </View>
  );
}
