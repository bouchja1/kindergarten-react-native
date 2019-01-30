import { createStackNavigator } from "react-navigation"
import RegionScreen from "./RegionScreen"
import TerritoriesScreen from "./TerritoriesScreen"
import KindergartenDetailScreen from "./KindergartenDetailScreen"
import Map from "./Map"
import RootContainer from "./RootContainer"
import ContactContainer from "./Contact"
import Detail from "./Detail"
import KindergartenDetailScreenGraph from "./KindergartenDetailScreenGraph";
import TabNavigator from "./TabNavigator"

const HomeNavigator = createStackNavigator({
  RegionScreen: { screen: RegionScreen },
  TerritoriesScreen: { screen: TerritoriesScreen },
  Map: { screen: Map },
  KindergartenDetail: { screen: KindergartenDetailScreen },
  KindergartenDetailGraph: { screen: KindergartenDetailScreenGraph },
  Root: { screen: RootContainer },
  Detail: { screen: Detail },
})

const AboutNavigator = createStackNavigator({
  Contact: ContactContainer,
})

export default TabNavigator.createAppContainer(
  HomeNavigator,
  AboutNavigator,
)
