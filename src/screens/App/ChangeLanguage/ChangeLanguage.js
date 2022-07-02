import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapLibreGL from "@react-native-mapbox-gl/maps";
import SelectDropdown from "react-native-select-dropdown";

// import { accessToken } from "./config";

const ChangeLanguage = () => {
  const languages = {
    English: "en",
    French: "fr",
    Italian: "it",
    Spanish: "es",
    German: "de",
    Dutch: "nl",
    Chinese: "zh",
  };

  const [language, setLanguage] = useState(languages.English);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <SelectDropdown
          buttonStyle={styles.menu}
          data={Object.keys(languages)}
          defaultValueByIndex={0}
          rowStyle={{
            height: 40,
          }}
          onSelect={(selectedItem, _) => setLanguage(languages[selectedItem])}
        />
        <MapLibreGL.MapView
          style={styles.map}
          logoEnabled={false}
          attributionEnabled={true}
          attributionPosition={{ bottom: 8, left: 8 }}
          //   styleURL={`https://api.jawg.io/styles/jawg-dark.json?lang=${language}&access-token=${accessToken}`}
        >
          <MapLibreGL.Camera
            defaultSettings={{
              centerCoordinate: [2.3210938, 48.7965913],
              zoomLevel: 2,
            }}
          />
        </MapLibreGL.MapView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  map: {
    flex: 1,
  },
  menu: {
    height: 40,
    width: "100%",
  },
});
export default ChangeLanguage;
