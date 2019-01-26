// @flow
import React  from "react"
import { StyleSheet, Text, TouchableOpacity, SafeAreaView, View } from "react-native"
 import { Table, TableWrapper, Row, Rows, Col  } from 'react-native-table-component';

// theme
import { Metrics } from "../themes"

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
})

type Props = {|
  +onPress: () => void,
  +buttons: string,
|}

export default class DescTable extends React.PureComponent<Props> {

  render() {
    const tableHead = ['', 'Head1']
    const tableTitle = 'Title'
    const tableData = 20

    return (
      <View style={styles.container}>
        <Table>
        <Row data = {tableHead} flexArr={[1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={tableTitle} style={styles.title} heightArr={[10,10]} textStyle={styles.text}/>
            <Rows data={tableData} flexArr={[1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
      </View>
    )
  }

}
