// @flow
import React from "react"
import { SafeAreaView, StyleSheet, Text, View, 
  TextInput, Button, ScrollView, FlatList, ListItem} from "react-native"
import { ErrorMessage, Formik } from "formik"
import connect from "react-redux/es/connect/connect"
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


import { Colors } from "../themes"
import { Graph, GrButton, DescTable } from "../components"


import { loadKindergartenCounts } from "../services/api"


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

const dataKindergartenOne  = [ 70, 85, 90, 65]


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

const dataRadius = [avg2014 , avg2015, avg2016, avg2017]

const buttons = ['1 km', '2 km', '3 km', '5km', '10km']

type Props = {
  navigation: any,
  graphData: any,
 }


class KindergartenDetailScreenGraph extends React.PureComponent<Props> {
  static navigationOptions = { title: "Kindergarten detail graph" }

  state = {
    graphData: null,
  }

  componentDidMount() {
    const { navigation } = this.props
    loadKindergartenCounts(navigation.state.params.kindergarten.id)
      .then(response => {
        this.setState(() => ({
        graphData: response.data.data.dataKindergarten,
      }),
      )
    })
}


  render() {
    const { graphData } = this.state
    return(
      <SafeAreaView>
        <Text style={styles.headings}> 
          Naplněnost vybrané školky v porovnání s okolím
        </Text>
        <Graph
          data = {dataKindergartenOne}
          data2 = {dataRadius}
        />

        <Text style={styles.headings}> 
          Změň velikost okolí
        </Text>

        <Text style={styles.headings}> 
          {console.log("graphData: ", graphData)}
        </Text> 

        <GrButton
         buttons = {buttons}
        />


      </SafeAreaView>
    )
  }
}
/*
        {data.dataKindergarten.count.map((value)=>{
             return <View key={value.year}><Text>{value.avg_count}</Text></View>
        })}

        <Text>
          {graphData.red_nazev}
        </Text>

<GrButton
          buttons = {buttons}
        />
        <Table/>

        
*/

const mapStateToProps = (state) => ({
  kindergartensInRadius: state.kindergarten.schools,
  kindergarten: state.map.kindergarten,
 })

// const mapDispatchToProps = {
//  onKindergartenRadiusRequest,
// }

export default connect(
  mapStateToProps,
 // mapDispatchToProps,
)(KindergartenDetailScreenGraph)
