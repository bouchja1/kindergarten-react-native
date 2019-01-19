// @flow
import React from "react"
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from "react-native"
import { ErrorMessage, Formik } from "formik"
import connect from "react-redux/es/connect/connect"
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import { Colors } from "../themes"
import { onKindergartenRadiusRequest } from "../redux/KindergartenRedux"
import { Graph } from "../components"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },  
})

const dataFirst  = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
const dataSecond = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ].reverse()

type Props = {
  onKindergartenRadiusRequest: typeof onKindergartenRadiusRequest,
  navigation: any,
  kindergartensInRadius: Array<*>,
}

class KindergartenDetailScreenGraph extends React.PureComponent<Props> {

  static navigationOptions = { title: "Kindergarten detail graph" }
   
  render() {
    return(
      <SafeAreaView>
      <Graph
        data = {dataFirst}
        data2 = {dataSecond}
      />
     </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => ({
  kindergartensInRadius: state.kindergarten.schools,
})

const mapDispatchToProps = {
  onKindergartenRadiusRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KindergartenDetailScreenGraph)
