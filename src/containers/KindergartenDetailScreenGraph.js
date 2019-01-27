// @flow
import React from "react"
import { SafeAreaView, StyleSheet, Text, View, 
  TextInput, Button, ScrollView, FlatList, ListItem} from "react-native"
import { ErrorMessage, Formik } from "formik"
import connect from "react-redux/es/connect/connect"
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
        graphData: response.data.data,
      }),
      )
    })
}


  render() {
    const { graphData} = this.state
    if(!graphData){return <Text> Načítám pičo </Text>} 
    
    const dataKindergartenOne = []

    let sec2014 = [70, 70, 70, 70]
    let sec2015 = [70, 90, 70, 70]
    let sec2016 = [70, 70, 100, 70]
    let sec2017 = [7, 70, 100, 70]

    let sum2014 = sec2014.reduce((previous, current) => current += previous);
    let avg2014 = sum2014 / sec2014.length;

    let sum2015 = sec2015.reduce((previous, current) => current += previous);
    let avg2015 = sum2015 / sec2015.length;

    let sum2016 = sec2016.reduce((previous, current) => current += previous);
    let avg2016 = sum2016 / sec2016.length;

    let sum2017 = sec2017.reduce((previous, current) => current += previous);
    let avg2017 = sum2017 / sec2017.length;

    const dataRadius = [avg2014 , avg2015, avg2016, avg2017]

    return (       
      <SafeAreaView>
        {graphData.dataKindergarten.counts.map((value)=>{
          dataKindergartenOne.push(parseFloat(value.avg_count))
          })}
        <Text style={styles.headings}> 
          Naplněnost vybrané školky v porovnání s okolím
        </Text>

        {graphData.dataRadius.map((value)=>{
          value.counts.map((hodnota)=>{
                if (hodnota.year == 2017) {
                sec2017.push(parseFloat(hodnota.counts.avg_count))
                }
              }
        )}}


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

        {graphData.dataKindergarten.counts.map((value)=>{
             return  <SafeAreaView 
              key={value.year}>
              <Text>
                {parseFloat(value.avg_count)}
              </Text>
            </SafeAreaView>
        })}

        <Text style={styles.headings}> 
          Seznam školek ve zvoleném okolí
        </Text>
        {graphData.dataRadius.map((value)=>{
             return <SafeAreaView key={value.red_izo}><Text>{value.red_nazev}</Text></SafeAreaView>
        })}


      </SafeAreaView>
        ) 
  }
}
/*



                <GrButton
         buttons = {buttons}
        />

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
