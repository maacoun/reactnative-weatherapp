import { Dimensions, StyleSheet } from "react-native";

const colors = {
  primary: "#494a6a",
  secondary: "#e5e5f0",
  tertiary: "red",
  accent: "#d3d3da",
  background: "#e5e5f0",
  text: "#494a6a",
  shadow: "#494a6a",
};

const lightTheme = StyleSheet.create({
  // Home Screen
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: colors.text,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: colors.text,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: colors.background,
  },
  inputContainerIcon: {
    color: colors.background,
  },
  gpsButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
  },
  gpsButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.background,
  },

  // Weather Screen
  weatherScreenContainer: {
    backgroundColor: colors.background,
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  centre: {
    //backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  astro: {
    //backgroundColor: 'yellow',
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  airquality: {
    //backgroundColor: 'pink',
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  alerts: {
    //backgroundColor: 'orange',
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  bottom: {
    //backgroundColor: 'green',
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  pictogram: {
    width: 100,
    height: 100,
    alignSelf: "center",
    resizeMode: "contain",
  },
  place: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    color: colors.text,
  },
  description: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.text,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
    borderColor: colors.accent,
    borderWidth: 1,
  },
  time: {
    fontSize: 16,
    alignSelf: "center",
    color: colors.text,
  },
  tempdiv: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  others: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  airqualityvalues: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "75%",
    flexWrap: "wrap",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.background,
  },
  wrappingPanel: {
    width: "95%",
    backgroundColor: colors.secondary,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrappingPanelText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  // Settings Screen
  settingsScreenContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  sectionRow: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: colors.text,
  },
  sectionSmallText: {
    fontSize: 14,
    color: colors.text,
  },
  sectionTextInput: {
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 10,
    width: 100,
    textAlign: "center",
  },

  // Components
  // Alert
  alert: {
    backgroundColor: colors.secondary,
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    color: colors.text,
  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.text,
  },
  alertText: {
    fontSize: 16,
    color: colors.text,
  },

  //Forecast
  card: {
    width: 200,
    height: 200,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.text,
  },

  //TempViewer
  tempdiv: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    color: colors.text,
  },
  temperature: {
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.text,
  },

  //Commons
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    padding: 10,
  },
  ionicon: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
    color: colors.text,
  },
});

export default lightTheme;
