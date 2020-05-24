import React, { useRef } from 'react'
import { StyleSheet, FlatList, SafeAreaView, View, Platform, ActivityIndicator } from 'react-native'
import {PhotoCard} from '../components/PhotoCard'
import { SearchBar } from 'react-native-elements'
import Style from '../constants/Style'
import {useFlickrImages} from '../hooks/useFlickrImages'
import ErrorBar from '../components/ErrorBar'
import App from '../constants/App'

const FlickrScreen = () => {
  const searchBar = useRef<SearchBar>(null)
  const { loading, photos, tempText, setTempText, setPhotos, setSearch, setPage, page, error } = useFlickrImages()

  const onEndReached = () => {
    setPage(page + 1)
  }

  const handleSubmit = () => {
    setPage(1)
    setPhotos([])
    setSearch(tempText)
  }

  const handleClear = () => {
    setTempText('')
    setSearch('')
    setPage(1)
    setPhotos([])
    searchBar.current?.focus()
  }

const renderFooter = () => {
  return loading ? <View style={styles.loader}><ActivityIndicator size='large'></ActivityIndicator></View> : null
}

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: Style.darkBackgroundColor, height: Platform.OS === App.android ? 25 : 0 }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.viewStyle}>
          <SearchBar
            ref={searchBar}
            round
            containerStyle={{ backgroundColor: Style.darkBackgroundColor, borderBottomColor: Style.darkBackgroundColor, borderTopColor: Style.darkBackgroundColor}}
            searchIcon={{ size: 24 }}
            onChangeText={(text) => setTempText(text)}
            onClear={() => handleClear()}
            placeholder={App.searchPlaceholder}
            onSubmitEditing={() => handleSubmit()}
            value={tempText}
          />
          <ErrorBar visible={error != ''} text={error} />
          {photos.length > 0 &&
            <FlatList 
              onEndReachedThreshold={ 0.1 } 
              onEndReached={ () => onEndReached() } 
              data = { photos } 
              keyExtractor={ item => item.id } 
              ListFooterComponent={ () => renderFooter()}
              renderItem = {({ item }) => (
                <PhotoCard  title={item.title} url={item.url_m} />
              )} 
            />}
        </View>
      </SafeAreaView>
      </>
    )
  }

export default FlickrScreen

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: Style.lightBackgroundColor,
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: Style.lightBackgroundColor,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 20,
  }
})
