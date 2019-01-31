// @flow
import React from "react"
import { StyleSheet, SafeAreaView, Text} from "react-native"
import { LineChart, YAxis , XAxis, Grid } from 'react-native-svg-charts'

type Props = {|
  data: any,
  data2: any,
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
                  svg={{ stroke: 'tomato' }}
                  contentInset={ verticalContentInset }
                  gridMin = {Math.min(...maxData)}
                  gridMax = {Math.max(...maxData)} 
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
                svg={{ stroke: '#7BDCB5' }}
                contentInset={ verticalContentInset }
                gridMin = {Math.min(...maxData)}
                gridMax = {Math.max(...maxData)} 
              />
            </SafeAreaView>
          </SafeAreaView>
          <Text style={ {
              textAlign: 'center',
              color: 'tomato',
              fontSize: 12,
            }}> 
            Vybraná školka 
            <Text>{"     "}</Text>
            <Text style={{
              color: '#7BDCB5',
            }}>
            Okolí 
            </Text>
          </Text>
          </SafeAreaView>
      )
    }
  }  
