import { getBaseUrl } from "../../storage/requests";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBaseUrl } from "../../app/slice";
import { getBaseUrlSelector } from "../../app/selectors";

export const Url = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  const reduxUrl = useSelector(getBaseUrlSelector);

  const onChangeText = useCallback(
    (text) => {
      setUrl(text);
    },
    [setUrl]
  );
  const onPress = useCallback(() => {
    const storeBaseUrl = async () => {
      await AsyncStorage.setItem("BASE_URL", url);
    };
    dispatch(updateBaseUrl(url));
    storeBaseUrl();
  }, [url, dispatch]);

  useEffect(() => {
    const getUrl = async () => {
      setUrl(await getBaseUrl());
    };
    getUrl();
  }, [setUrl]);

  console.log(url, "the url", reduxUrl, "the reduxd url");

  return (
    <View style={{ display: "flex", justifyContent: "space-around" }}>
      <TextInput
        style={{
          // flex: 1,
          height: 20,
          margin: 12,
          padding: 10,
          width: 100,
          borderWidth: 1,
        }}
        value={url}
        onChangeText={onChangeText}
      />
      <Pressable onPress={onPress}>
        <Text>Set Base Url</Text>
      </Pressable>
    </View>
  );
};
