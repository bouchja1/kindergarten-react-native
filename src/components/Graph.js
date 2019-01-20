// @flow
import React from "react"
import { StyleSheet, View, SafeAreaView, Text} from "react-native"
import { LineChart, YAxis , XAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'

// theme
import { Metrics } from "../themes"

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',

  },
})

type Props = {|
|}

export default class Graph extends React.PureComponent<Props> {
    render() {
      const { data, data2 } = this.props
      const maxData = data.concat(data2)
      const verticalContentInset = { top: 20, bottom: 10 }
      const axesSvg = { fontSize: 10, fill: 'grey' };
      const xAxisHeight = 30
      const xAxis = [2014, 2015, 2016, 2017]

      return (
        <SafeAreaView>
          <SafeAreaView style={ { 
          height: 200, 
          flexDirection: 'row', 
          paddingRight: 20,
          paddingLeft: 20,
          } }>
              <YAxis
                  data={ maxData }
                  contentInset={ verticalContentInset }
                  svg={axesSvg}
                  style = {{ marginBottom: xAxisHeight }}
                  formatLabel={ value => `${value}%` }
                />
              <SafeAreaView style={{ flex: 1, marginLeft: 10 }}>
              <LineChart
                  style={ { flex: 1 } }
                  data={ data }
                  svg={{ stroke: 'rgba(134, 65, 244, 0.5)' }}
                  contentInset={ verticalContentInset }
              >
                  <Grid/>
              </LineChart>
              <XAxis
                    style={ { marginHorizontal: -10, height: xAxisHeight }}
                    data={ xAxis }
                    xAccessor={ ({ item }) => item }
                    formatLabel={ (value) => value }
                    contentInset={ { left: 10, right: 10 } }
                    svg={axesSvg}
              />
              <LineChart
                style={ { ...StyleSheet.absoluteFillObject,
                  backgroundColor: 'transparent',
                  marginBottom: xAxisHeight, } }
                data={ data2 }
                svg={{ stroke: 'rgba(34, 128, 176, 0.5)' }}
                contentInset={ verticalContentInset }
              />
            </SafeAreaView>
          </SafeAreaView>
          <Text style={ {
              textAlign: 'center',
              color: 'rgba(134, 65, 244, 0.5)',
              fontSize: 12,
            }}> 
            Vybraná školka 
            <Text>{"     "}</Text>
            <Text style={{
              color: 'rgba(34, 128, 176, 0.5)',
            }}>
            Okolí 
            </Text>
          </Text>
          </SafeAreaView>
      )
    }
  }  
