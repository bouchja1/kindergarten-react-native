import { createStackNavigator, createAppContainer } from "react-navigation"
import Map from "./Map"
import RootContainer from "./RootContainer"
import Detail from "./Detail"

export default createAppContainer(
  createStackNavigator({
    Map: { screen: Map },
    Root: { screen: RootContainer },
    Detail: { screen: Detail },
  }),
)
