export const getBaseUrl = async () => {
  try {
    const value = await AsyncStorage.getItem("BASE_URL");
    return value ? value : "";
  } catch (e) {
    console.log(e);
  }
};
