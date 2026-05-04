import { View, Text, Pressable, ScrollView, Alert, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";
import WebView from "react-native-webview";

const DICE_TYPES = [
  { id: "d4", label: "d4", sides: 4 },
  { id: "d6", label: "d6", sides: 6 },
  { id: "d8", label: "d8", sides: 8 },
  { id: "d10", label: "d10", sides: 10 },
  { id: "d12", label: "d12", sides: 12 },
  { id: "d20", label: "d20", sides: 20 },
  { id: "d100", label: "d100", sides: 100 },
];

interface DiceRoll {
  type: string;
  quantity: number;
  result: number;
  timestamp: number;
}

export default function VideoRoomScreen() {
  const router = useRouter();
  const colors = useColors();
  const { roomId, playerName, isHost } = useLocalSearchParams<{
    roomId: string;
    playerName?: string;
    isHost?: string;
  }>();

  const [selectedDice, setSelectedDice] = useState("d20");
  const [quantity, setQuantity] = useState(1);
  const [lastRoll, setLastRoll] = useState<DiceRoll | null>(null);
  const [rolls, setRolls] = useState<DiceRoll[]>([]);
  const [showDicePanel, setShowDicePanel] = useState(true);

  const jitsiUrl = `https://meet.jitsi/${roomId}`;

  const rollDice = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const diceType = DICE_TYPES.find((d) => d.id === selectedDice);
    if (!diceType) return;

    let total = 0;
    for (let i = 0; i < quantity; i++) {
      total += Math.floor(Math.random() * diceType.sides) + 1;
    }

    const roll: DiceRoll = {
      type: selectedDice,
      quantity,
      result: total,
      timestamp: Date.now(),
    };

    setLastRoll(roll);
    setRolls((prev) => [roll, ...prev.slice(0, 9)]);

    // Sucesso haptic
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Sair", "Tem certeza que deseja sair da sala?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => router.back(),
      },
    ]);
  };

  const increaseQuantity = async () => {
    if (quantity < 10) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = async () => {
    if (quantity > 1) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setQuantity(quantity - 1);
    }
  };

  return (
    <ScreenContainer className="p-0" edges={["top", "left", "right", "bottom"]}>
      <View className="flex-1">
        {/* Jitsi Meet WebView */}
        {Platform.OS !== "web" ? (
          <View className="flex-1 bg-black">
            <WebView
              source={{ uri: jitsiUrl }}
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
            />
          </View>
        ) : (
          <View className="flex-1 bg-surface items-center justify-center">
            <Text className="text-foreground text-center">
              Jitsi Meet será carregado aqui{"\n"}
              {roomId}
            </Text>
          </View>
        )}

        {/* Dice Panel */}
        {showDicePanel && (
          <View className="bg-surface border-t border-border p-4">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-foreground">🎲 Dados</Text>
              <Pressable
                onPress={() => setShowDicePanel(false)}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <Text className="text-xl text-muted">✕</Text>
              </Pressable>
            </View>

            {/* Last Roll Result */}
            {lastRoll && (
              <View className="bg-primary rounded-lg p-3 mb-4">
                <Text className="text-white text-center text-sm">Último resultado:</Text>
                <Text className="text-white text-center text-3xl font-bold">
                  {lastRoll.quantity}
                  {lastRoll.type} = {lastRoll.result}
                </Text>
              </View>
            )}

            {/* Dice Type Selection */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row gap-2">
                {DICE_TYPES.map((dice) => (
                  <Pressable
                    key={dice.id}
                    onPress={() => setSelectedDice(dice.id)}
                    style={({ pressed }) => [
                      {
                        backgroundColor: selectedDice === dice.id ? colors.primary : colors.border,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 6,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                  >
                    <Text
                      className={`font-semibold ${
                        selectedDice === dice.id ? "text-white" : "text-foreground"
                      }`}
                    >
                      {dice.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>

            {/* Quantity Controls */}
            <View className="flex-row items-center justify-center gap-4 mb-4">
              <Pressable
                onPress={decreaseQuantity}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.border,
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text className="text-xl font-bold text-foreground">−</Text>
              </Pressable>

              <View className="bg-border rounded-lg px-4 py-2">
                <Text className="text-lg font-bold text-foreground">{quantity}</Text>
              </View>

              <Pressable
                onPress={increaseQuantity}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.border,
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text className="text-xl font-bold text-foreground">+</Text>
              </Pressable>
            </View>

            {/* Roll Button */}
            <Pressable
              onPress={rollDice}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.primary,
                  paddingVertical: 12,
                  borderRadius: 8,
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Text className="text-center text-lg font-bold text-white">Rolar Dados</Text>
            </Pressable>

            {/* Recent Rolls */}
            {rolls.length > 0 && (
              <View className="mt-4 pt-4 border-t border-border">
                <Text className="text-xs font-semibold text-muted mb-2">Histórico:</Text>
                <View className="gap-1">
                  {rolls.slice(0, 5).map((roll, idx) => (
                    <View key={idx} className="flex-row justify-between items-center">
                      <Text className="text-sm text-muted">
                        {roll.quantity}
                        {roll.type}
                      </Text>
                      <Text className="text-sm font-semibold text-foreground">{roll.result}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Toggle Dice Panel Button */}
        {!showDicePanel && (
          <Pressable
            onPress={() => setShowDicePanel(true)}
            style={({ pressed }) => [
              {
                position: "absolute",
                bottom: 20,
                right: 20,
                backgroundColor: colors.primary,
                width: 56,
                height: 56,
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-2xl">🎲</Text>
          </Pressable>
        )}

        {/* Back Button */}
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [
            {
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: colors.surface,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 6,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text className="text-lg font-semibold text-primary">← Sair</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
