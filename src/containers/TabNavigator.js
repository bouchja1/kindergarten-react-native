import { createBottomTabNavigator, createAppContainer } from "react-navigation"
import Ionicons from "react-native-vector-icons/Ionicons"
import React from "react"

export default class MainNavigator {
  static createAppContainer = (Home, About) => {
    /**
     * https://reactnavigation.org/docs/en/tab-based-navigation.html
     */
    const TabNavigator = createBottomTabNavigator(
      {
        Kraje: Home,
        Kontakt: About,
      },
      {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state
            let iconName
            if (routeName === "Kraje") {
              // iconName = `ios-home${focused ? "" : "-outline"}`
              iconName = "ios-home"
            } else if (routeName === "Kontakt") {
              // iconName = `ios-beer${focused ? "" : "-outline"}`
              iconName = `ios-beer`
            }

            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
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
