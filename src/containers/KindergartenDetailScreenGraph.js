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
    paddingBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ListKindergartens: {
    textAlign: 'center',
  },
  text: {
    paddingTop: 10,
  }
})





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

_keyExtractor = item => `item-${item.red_izo}`

_renderItem = ({ item }) => (
  <Text style={styles.ListKindergartens}>{item.red_nazev}</Text>)


  render() {
    const { graphData} = this.state
    if(!graphData){return <Text> Načítám pičo </Text>} 
    
    const dataKindergartenOne = []

    let sec2014 = [70, 80, 90, 70]
    let sec2015 = [7, 80, 90, 70]
    let sec2016 = [70, 8, 90, 70]
    let sec2017 = [70, 80, 9, 70]

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

        <Graph
          data = {dataKindergartenOne}
          data2 = {dataRadius}
        />

        <Text style={styles.headings}> 
          Změň velikost okolí
        </Text>
            
        <GrButton/>


        <Text style={styles.headings}> 
          Detaily
        </Text>
        
        <DescTable/>

        <Text style={styles.headings}> 
          Seznam školek ve zvoleném okolí
        </Text>

        <FlatList
          data={graphData.dataRadius}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />

      </SafeAreaView>
        ) 
  }
}
/*
,
          graphData.dataRadius.map((value)=>{
          value.counts.map((hodnota)=>{
                if (hodnota.year === 2017) {
                sec2017.push(parseFloat(hodnota.avg_count))
                }
                else if (hodnota.year === 2016) {
                sec2016.push(parseFloat(hodnota.avg_count))
                }
                else if (hodnota.year === 2016) {
                sec2015.push(parseFloat(hodnota.avg_count))
                }
                else {
                sec2014.push(parseFloat(hodnota.avg_count))  
                }
              }
        )}]


              

        {graphData.dataKindergarten.counts.map((value)=>{
             return  <SafeAreaView 
              key={value.year}>
              <Text style={styles.text}>
                {parseFloat(value.avg_count)}
              </Text>
            </SafeAreaView>
        })}
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
