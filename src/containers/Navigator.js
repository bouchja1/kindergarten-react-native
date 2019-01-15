import { createStackNavigator, createAppContainer } from "react-navigation"
import RegionScreen from "./RegionScreen"
import Map from "./Map"
import RootContainer from "./RootContainer"
import Detail from "./Detail"

export default createAppContainer(
  createStackNavigator({
    RegionScreen: { screen: RegionScreen },
    Map: { screen: Map },
    Root: { screen: RootContainer },
    Detail: { screen: Detail },
  }),
)
