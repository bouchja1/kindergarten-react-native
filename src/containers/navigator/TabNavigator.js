import { createBottomTabNavigator, createAppContainer } from "react-navigation"
import Ionicons from "react-native-vector-icons/Ionicons"
import React from "react"

/**
 * https://reactnavigation.org/docs/en/tab-based-navigation.html
 */
export default class MainNavigator {
  static createAppContainer = (Home, About) => {
    const TabNavigator = createBottomTabNavigator(
      {
        Kraje: Home,
        Kontakt: About,
      },
      {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ horizontal, tintColor }) => {
            const { routeName } = navigation.state
            let iconName
            if (routeName === "Kraje") {
              iconName = "ios-home"
            } else if (routeName === "Kontakt") {
              iconName = `ios-beer`
            }

            return (
              <Ionicons
                name={iconName}
                size={horizontal ? 20 : 25}
                color={tintColor}
              />
            )
          },
        }),
        tabBarOptions: {
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        },
      },
    )
    return createAppContainer(TabNavigator)
  }
}
