import { createStackNavigator } from "react-navigation"
import RegionScreen from "../RegionScreen"
import TerritoriesScreen from "../TerritoriesScreen"
import Map from "../Map"
import ContactContainer from "../ContactScreen"
import KindergartenDetailScreenGraph from "../KindergartenDetailScreenGraph";
import TabNavigator from "./TabNavigator"

const HomeNavigator = createStackNavigator({
  RegionScreen: { screen: RegionScreen },
  TerritoriesScreen: { screen: TerritoriesScreen },
  Map: { screen: Map },
  KindergartenDetailGraph: { screen: KindergartenDetailScreenGraph },
})

const AboutNavigator = createStackNavigator({
  Contact: ContactContainer,
})

export default TabNavigator.createAppContainer(
  HomeNavigator,
  AboutNavigator,
)
