// @flow

import React, { useEffect, useState } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Dimensions, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DataLocalRedux from '../Redux/DataLocalRedux'

// Styles
import styles from './Styles/DashboardStyle'

// I18n
import I18n from 'react-native-i18n'
import { Divider, Header, Icon } from 'react-native-elements'
import { DrawerActions } from 'react-navigation-drawer'
import { View } from 'react-native-animatable'
import { TextInput } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { bindActionCreators } from 'redux'

function Dashboard (props) {
  const {width, height} = Dimensions.get('screen')
  const [search, setSearch] = useState('')
  const [visibleSearch, setvisibleSearch] = useState(false)
  const [category, setcategory] = useState('semua')
  const {data} = props
  const updateSearch = (search) => {
    setSearch(search)
  }

// useEffect(
//   () => {
//     props.dataLocalSuccess([])
//   },
//   [data]
// );
  return (
    <View style={styles.container}>
      <Header
        placement='left'
        leftComponent={<Icon name='menu' color='white' onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} />}
        centerComponent={{ text: 'Dashboard', style: { color: '#fff', fontSize: 20, fontWeight: '700' } }}
        rightComponent={
          <View style={{backgroundColor: 'white', borderRadius: 12, padding: 4, flexDirection: 'row'}}>
            <Text style={{color: '#87ceeb', fontWeight: '600'}}>Atur Tempo</Text>
            <Text style={{backgroundColor: 'grey', padding: 2, paddingHorizontal: 4, marginHorizontal: 4, borderRadius: 16, color: 'white'}}>0</Text>
          </View>}
      />
      <ScrollView>
        <KeyboardAvoidingView behavior='position'>
          <View style={{backgroundColor: '#87ceeb', width: width, height: height * 0.225, maxHeight: 180, borderTopWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: width * 0.9, height: height * 0.18, maxHeight: 180, backgroundColor: 'white', borderRadius: 4}}>
              <View style={{flexDirection: 'row', width: width, padding: 12, height: '60%'}}>
                <View style={{width: width * 0.45}}>
                  <View style={{flexDirection: 'row'}}>
                      <Icon name='trending-down' color='green' />
                      <Text style={{color: 'green'}}>Rp 0</Text>
                    </View>
                  <Text style={{color: 'green'}}>Total Utang Saya</Text>
                </View>
                <View style={{width: width * 0.5}}>
                  <View style={{flexDirection: 'row'}}>
                      <Icon name='trending-up' color='red' />
                      <Text style={{color: 'red'}}>Rp 0</Text>
                    </View>
                  <Text style={{color: 'red'}}>Total Utang Pelanggan</Text>
                </View>
              </View>
              <Divider />
              <View style={{flexDirection: 'row', padding: 12, alignItems: 'baseline', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name='book' color='blue' />
                  <Text style={{color: 'blue', marginLeft: 12}}>Lihat Laporan Utang</Text>
                </View>
                <Icon name='chevron-right' color='blue' />
              </View>
            </View>
          </View>

          <View style={{marginTop: 4, flexDirection: 'row', alignItems: 'center', padding: 12, justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {visibleSearch ? null
                : <Icon name='search' color='#1589FF' />
              }

              <TextInput style={{color: 'grey', paddingLeft: 12}} placeholder='Pelanggan'
                onTouchStart={() => setvisibleSearch(true)}
                onTouchCancel={() => setvisibleSearch(false)}
               />
            </View>
            <View style={{flexDirection: 'row', width: 80, justifyContent: 'space-around'}}>
              <Icon name='filter-list' color='#1589FF'
                onPress={() => Alert.alert('Still on Development')}
              />
              <Icon name='topic' color='#1589FF'
                onPress={() => Alert.alert('Still on Development')}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'ghostwhite'}}>
            <Text style={{backgroundColor: category === 'semua' ? '#1589FF' : 'lightgrey', color: category === 'semua' ? 'white' : 'grey', padding: 12, borderRadius: 20}}
              onPress={() => setcategory('semua')}
            >Semua</Text>
            <Text style={{backgroundColor: category === 'utang' ? '#1589FF' : 'lightgrey', color: category === 'utang' ? 'white' : 'tomato', padding: 12, borderRadius: 20}}
              onPress={() => setcategory('utang')}
            >Utang Pelanggan</Text>
            <Text style={{backgroundColor: category === 'usaha' ? '#1589FF' : 'lightgrey', color: category === 'usaha' ? 'white' : 'green', padding: 12, borderRadius: 20}}
              onPress={() => setcategory('usaha')}
            >Utang Saya</Text>
            <Text style={{backgroundColor: category === 'lunas' ? '#1589FF' : 'lightgrey', color: category === 'lunas' ? 'white' : 'black', padding: 12, borderRadius: 20}}
              onPress={() => setcategory('lunas')}
            >Lunas</Text>
          </View>
          <View style={{width: width, height: height * 0.3, alignItems: 'center', marginTop: 12}}>

            <ScrollView>
              {data && data.length > 0

                ? data.map((dat, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('DetailCatatanScreen', {params: dat})
                    }}
                    // long pressed
                    onLongPress={() => {
                      Alert.alert(
                        'Delete',
                         'Apakah anda yakin menghapus catatan: ' + dat.nama,
                        [
                          {
                            text: 'Cancel',
                            // onPress: () => console.log("Cancel Pressed"),
                            style: 'danger'
                          },
                          { text: 'OK',
                            onPress: () => {
                              let list = data
                              let temp = []
                              list.map((tempdata, idx) => {
                                if (index !== idx) {
                                  temp.push(tempdata)
                                }
                              })
                            // alert(JSON.stringify(temp))
                              props.dataLocalSuccess(temp)
                            } }
                        ],
                        { cancelable: false }
                      )
                    }}
                    style={{width: width, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: 'whitesmoke'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{width: 40, height: 40, backgroundColor: 'blue', textAlign: 'center', textAlignVertical: 'center', borderRadius: 20, color: 'white', fontWeight: '700', marginRight: 12}}>{dat.nama.substring(0, 1)}</Text>
                      <Text>{dat.nama}</Text>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                      <Text style={{color: dat.jenis === 'terima' ? 'green' : 'red', fontSize: 16, fontWeight: '700'}}>Rp. {dat.nominal}</Text>
                      <Text style={{fontSize: 10, color: 'gray'}}>{dat.jenis}</Text>
                    </View>
                  </TouchableOpacity>
                    )
                )
                : <Text style={{fontSize: 20}}>Transaksi Tidak Ditemukan</Text>
              }
            </ScrollView>
          </View>

          {/* <Text>Dashboard Container</Text>
          <Image source={{uri: 'https://media.tenor.com/images/0b258e24e61f1085b16087309aecdc01/tenor.gif'}} style={{width:200,height:200}}/> */}
        </KeyboardAvoidingView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('UtangPiutang')}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 5,
          width: 200,
          height: 50,
          backgroundColor: '#FBB117',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text
          style={{
            color: 'white', fontSize: 16, fontWeight: '600'
          }}>
              +  UTANG PIUTANG
              </Text>
      </TouchableOpacity>

    </View>
  )
}

const mapStateToProps = (state) => {
  // console.log(state.local.payload[0].history)
  return {
    data: state.local.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(DataLocalRedux), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
