import axios from "axios";

export const postToken = async (userId, userToken) => {
  console.log({ userId, userToken });
  if (!userId || !userToken) return;

  try {
    const { data } = await axios.post(
      `api/updatetoken/${userId}`,
      {
        user_id: userId,
        user_token: userToken,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return data;

    // Alert.alert("Message", data.message);
    // navigation.navigate("Home");
  } catch (error) {
    console.log(error);
  }
};
