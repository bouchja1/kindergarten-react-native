// @flow
import React from "react"
import { SafeAreaView, StyleSheet, Text, View, 
  TextInput, Button, ScrollView, FlatList} from "react-native"
import { ErrorMessage, Formik } from "formik"
import connect from "react-redux/es/connect/connect"
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import { Colors } from "../themes"
import { onKindergartenRadiusRequest } from "../redux/KindergartenRedux"
import { Graph, GrButton, Table } from "../components"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },  
  headings: {
    paddingTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

const dataFirst  = [ 70, 85, 90, 65]


let sec2014 = [ 50, 10, 40, 95]
let sec2015 = [ 60, 70, 30, 90]
let sec2016 = [ 90, 90, 90, 90]
let sec2017 = [ 80, 100, 90, 95]

let sum2014 = sec2014.reduce((previous, current) => current += previous);
let avg2014 = sum2014 / sec2014.length;

let sum2015 = sec2015.reduce((previous, current) => current += previous);
let avg2015 = sum2015 / sec2015.length;

let sum2016 = sec2016.reduce((previous, current) => current += previous);
let avg2016 = sum2016 / sec2016.length;

let sum2017 = sec2017.reduce((previous, current) => current += previous);
let avg2017 = sum2017 / sec2017.length;

const dataSecond = [avg2014 , avg2015, avg2016, avg2017]

const buttons = ['1 km', '2 km', '3 km', '5km', '10km']

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
        <Text style={styles.headings}> 
          Naplněnost vybrané školky v porovnání s okolím
        </Text>
        <Graph
          data = {dataFirst}
          data2 = {dataSecond}
        />
        <Text style={styles.headings}> 
          Změň velikost okolí
        </Text>

        <Text style={styles.headings}> 
          Detailní údaje o okolí
        </Text>

      </SafeAreaView>
    )
  }
}
/*
        <GrButton
          buttons = {buttons}
        />
        <Table/>
*/

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
