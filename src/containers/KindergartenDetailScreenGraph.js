// @flow
import React from "react"
import {
  SafeAreaView, StyleSheet, Text, View,
  TextInput, Button, ScrollView, FlatList, ListItem,
} from "react-native"
import { ErrorMessage, Formik } from "formik"
import connect from "react-redux/es/connect/connect"
import * as shape from "d3-shape"


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
    fontWeight: "bold",
    textAlign: "center",
  },
  ListKindergartens: {
    textAlign: "center",
  },
  text: {
    paddingTop: 10,
  },
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

  _renderItem = ({ item }) => {
    const school2017Data = item.counts[0]
    if (parseFloat(school2017Data.avg_count) > 0) {
      return <Text style={styles.ListKindergartens}>{item.red_nazev}: {parseFloat(school2017Data.avg_count)}</Text>
    }
    return null;
  }

  showDifferentRadius = (radiusKm) => {
    const { navigation } = this.props
    const radiusKmArray = radiusKm.split(' ');
    console.log("ZAVOLAL JSEM HO: ", radiusKmArray[0])
    loadKindergartenCounts(navigation.state.params.kindergarten.id, Number(radiusKmArray[0]))
      .then(response => {
        this.setState(() => ({
            graphData: response.data.data,
          }),
        )
      })
  }

  render() {
    const { graphData } = this.state
    if (!graphData) {
      return <Text> Načítám pičo </Text>
    }

    const dataKindergartenOne = []

    const sec2014 = []
    const sec2015 = []
    const sec2016 = []
    const sec2017 = []

    const kindergartenCounts = graphData.dataKindergarten.counts
    for (let i = 0; i < kindergartenCounts.length; i++) {
      dataKindergartenOne.push(parseFloat(kindergartenCounts[i].avg_count))
    }

    console.log("ORIGINAL: ", dataKindergartenOne)

    let radiusMax = 0;
    let radiusMin = 0;

    for (let i = 0; i < graphData.dataRadius.length; i++) {
      const schoolInRadius = graphData.dataRadius[i]
      console.log("RADIUS: ", schoolInRadius)
      for (let j = 0; j < schoolInRadius.counts.length; j++) {
        const schoolInRadiusCounts = schoolInRadius.counts[j];
        if (schoolInRadiusCounts.year === 2017 && parseFloat(schoolInRadiusCounts.avg_count) > 0) {

          sec2017.push(parseFloat(schoolInRadiusCounts.avg_count))
        }
        else if (schoolInRadiusCounts.year === 2016 && parseFloat(schoolInRadiusCounts.avg_count) > 0) {
          sec2016.push(parseFloat(schoolInRadiusCounts.avg_count))
        }
        else if (schoolInRadiusCounts.year === 2015 && parseFloat(schoolInRadiusCounts.avg_count) > 0) {
          sec2015.push(parseFloat(schoolInRadiusCounts.avg_count))
        }
        else if (parseFloat(schoolInRadiusCounts.avg_count) > 0) {
          sec2014.push(parseFloat(schoolInRadiusCounts.avg_count))
        }
      }
    }

    let avg2014 = 0;
    let avg2015 = 0;
    let avg2016 = 0;
    let avg2017 = 0;

    if (sec2014.length) {
      const sum2014 = sec2014.reduce((previous, current) => current += previous)
      avg2014 = sum2014 / sec2014.length
    }

    if (sec2015.length) {
      const sum2015 = sec2015.reduce((previous, current) => current += previous)
      avg2015 = sum2015 / sec2015.length
    }

    if (sec2016.length) {
      const sum2016 = sec2016.reduce((previous, current) => current += previous)
      avg2016 = sum2016 / sec2016.length
    }

    if (sec2017.length) {
      const sum2017 = sec2017.reduce((previous, current) => current += previous)
      avg2017 = sum2017 / sec2017.length
    }

    const dataRadius = [avg2014, avg2015, avg2016, avg2017]

    // max value from array and min value from array
    radiusMax = (sec2017.length) ? Math.max(...sec2017) : 0;
    radiusMin = (sec2017.length) ? Math.min(...sec2017) : 0;

    return (
      <ScrollView>
        <Text>{graphData.dataKindergarten.red_nazev}</Text>

        <Text style={styles.headings}>
          Naplněnost vybrané školky v porovnání s okolím
        </Text>

        <Graph
          data={dataKindergartenOne}
          data2={dataRadius}
        />

        <Text style={styles.headings}>
          Změň velikost okolí
        </Text>

        <GrButton
          showDifferentRadius={this.showDifferentRadius}
        />


        <Text style={styles.headings}>
          Detaily
        </Text>

        <DescTable
          radiusCount={sec2017.length}
          radiusMax={radiusMax}
          radiusMin={radiusMin}
        />

        <Text style={styles.headings}>
          Seznam školek ve zvoleném okolí
        </Text>

        <FlatList
          data={graphData.dataRadius}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />

      </ScrollView>
    )
  }
}

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
