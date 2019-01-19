// @flow
import React from "react"
import { StyleSheet, View, SafeAreaView} from "react-native"
import { LineChart, YAxis , XAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

// theme
import { Metrics } from "../themes"

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'transparent',
  },
})

type Props = {|
|}

export default class Graph extends React.PureComponent<Props> {
    render() {
      const { data, data2 } = this.props
      const verticalContentInset = { top: 20, bottom: 20 }
      const axesSvg = { fontSize: 10, fill: 'grey' };
      const xAxisHeight = 30

      return (
          <SafeAreaView style={ { 
          height: 200, 
          flexDirection: 'row', 
          } }>
              <YAxis
                  data={ data }
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
                    data={ data }
                    formatLabel={ (value, index) => index }
                    contentInset={ { left: 10, right: 10 } }
                    svg={axesSvg}
              />
              <LineChart
                style={styles.wrapper}
                data={ data2 }
                svg={{ stroke: 'rgba(34, 128, 176, 0.5)' }}
                contentInset={ verticalContentInset }
              />
              </SafeAreaView>
            </SafeAreaView>
           
              
             
          
      )
    }
  }  
