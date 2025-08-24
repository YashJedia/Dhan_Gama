import { View, Text, ScrollView, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GameCard from "@/components/GameCard";
import { fetchGames } from "@/store/thunk/gamesThunk";
import { useDispatch, useSelector } from "react-redux";
const GameScreen = ({ navigation, route }) => {
  const { gameTypeId, gameTypeName, gameTypeMinPrice, gameTypeRate } =
    route.params;
  const dispatch = useDispatch();
  const { gamesData } = useSelector((state) => state.games);
  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        await dispatch(fetchGames(gameTypeId));
      } catch (error) {
        console.log(error);
      }
    };
    fetchGamesData();
  }, []);

  const currentDate = new Date();

  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  const currentTime = `${hours}:${minutes}:${seconds}`;
  // "id": "16",
  // "title": "MILAN MORNING",
  // "day": "1",
  // "open": "10:05:00",
  // "close": "11:05:00",
  // "status": "1"

  return (
    <SafeAreaView className="bg-[#e0f5ff]">
      <ScrollView className="h-full">
        <View className="bg-[#BBE9FF] min-h-[20vh] justify-center px-4 py-6 mx-6 my-6 rounded-lg">
          <View className="flex flex-row bg-blue-400 rounded-lg py-2 mb-4 justify-center items-center space-x-1">
            <Text className="text-white font-pbold text-xl">
              {gameTypeName}
            </Text>
            {/* <Text className="text-white font-pbold text-xs">
              (Minimum Price: {gameMinPrice})
            </Text> */}
          </View>
          <View className="flex flex-wrap flex-row justify-evenly items-center">
            {gamesData?.map((item) => (
              <GameCard
                key={item?.id}
                gameName={item?.title}
                gameType={"Open"}
                gameTypeId={gameTypeId}
                gameTime={item?.open}
                status={item?.status}
                isDisabled={currentTime > item?.open || item?.open == null}
                handlePress={() => {
                  if (gameTypeId == 1)
                    navigation.navigate("Single Game", {
                      gameTypeId: gameTypeId,
                      gameId: item?.id,
                      gameName: item?.title,
                      bidType: "open",
                    });
                  if (gameTypeId == 2)
                    navigation.navigate("Jodi Game", {
                      gameTypeId: gameTypeId,
                      gameId: item?.id,
                      gameName: item?.title,
                      bidType: "open",
                    });
                  if (gameTypeId == 3)
                    navigation.navigate("Single Panel Game", {
                      gameTypeId: gameTypeId,
                      gameId: item?.id,
                      gameName: item?.title,
                      bidType: "open",
                    });
                  if (gameTypeId == 4)
                    navigation.navigate("Double Panel Game", {
                      gameTypeId: gameTypeId,
                      gameId: item?.id,
                      gameName: item?.title,
                      bidType: "open",
                    });
                  if (gameTypeId == 5)
                    navigation.navigate("Triple Panel Game", {
                      gameTypeId: gameTypeId,
                      gameId: item?.id,
                      gameName: item?.title,
                      bidType: "open",
                    });
                  if (gameTypeId == 6)
                    navigation.navigate("Half Sangam Game", {
                      gameTypeId: gameTypeId,
                      gameId: item?.id,
                      gameName: item?.title,
                      bidType: "open",
                    });
                  if (gameTypeId == 7)
                    navigation.navigate("Full Sangam Game", {
                      gameTypeId: gameTypeId,
                      gameId: item?.id,
                      gameName: item?.title,
                      bidType: "open",
                    });
                }}
              />
            ))}
          </View>
          <View className="border-t border-gray-400 w-full my-3"></View>
          {(gameTypeId == 1 ||
            gameTypeId == 3 ||
            gameTypeId == 4 ||
            gameTypeId == 5) && (
            <View className="flex flex-wrap flex-row justify-evenly items-center">
              {gamesData?.map((item) => (
                <GameCard
                  key={item?.id}
                  gameName={item?.title}
                  gameType={"Close"}
                  gameTypeId={gameTypeId}
                  gameTime={item?.close}
                  status={item?.status}
                  isDisabled={
                    currentTime > item?.close ||
                    item?.close == null ||
                    gameTypeId == 2 ||
                    gameTypeId == 6 ||
                    gameTypeId == 7
                  }
                  handlePress={() => {
                    if (gameTypeId == 1)
                      navigation.navigate("Single Game", {
                        gameTypeId: gameTypeId,
                        gameId: item?.id,
                        gameName: item?.title,
                        bidType: "close",
                      });
                    if (gameTypeId == 3)
                      navigation.navigate("Single Panel Game", {
                        gameTypeId: gameTypeId,
                        gameId: item?.id,
                        gameName: item?.title,
                        bidType: "close",
                      });
                    if (gameTypeId == 4)
                      navigation.navigate("Double Panel Game", {
                        gameTypeId: gameTypeId,
                        gameId: item?.id,
                        gameName: item?.title,
                        bidType: "close",
                      });
                    if (gameTypeId == 5)
                      navigation.navigate("Triple Panel Game", {
                        gameTypeId: gameTypeId,
                        gameId: item?.id,
                        gameName: item?.title,
                        bidType: "close",
                      });
                  }}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default GameScreen;
