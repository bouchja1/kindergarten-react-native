import { createStackNavigator, createAppContainer } from "react-navigation"
import RegionScreen from "./RegionScreen"
import TerritoriesScreen from "./TerritoriesScreen"
import KindergartenDetailScreen from "./KindergartenDetailScreen"
import Map from "./Map"
import RootContainer from "./RootContainer"
import Detail from "./Detail"

export default createAppContainer(
  createStackNavigator({
    RegionScreen: { screen: RegionScreen },
    TerritoriesScreen: { screen: TerritoriesScreen },
    Map: { screen: Map },
    KindergartenDetail: { screen: KindergartenDetailScreen },
    Root: { screen: RootContainer },
    Detail: { screen: Detail },
  }),
)
