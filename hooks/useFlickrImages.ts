import { useState, useEffect } from 'react'
import { FLICKR_KEY } from 'react-native-dotenv'
import Flickr from '../constants/Flickr'
import App from '../constants/App'
import axios from 'axios'

export const useFlickrImages = () => {
    const [photos, setPhotos] = useState<Photo[]>([])
    const [error, setError] = useState<string>('')
    const [search, setSearch] = useState<string>(App.searchDefaultTerm)
    const [tempText, setTempText] = useState<string>(App.searchDefaultTerm)
    const [page, setPage] = useState<number>(1)
    const [reconnect, setReconnect] = useState<boolean>(false)
    const [reconnectTimeouts, setReconnectTimeouts] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        let mounted = true
        var url = Flickr.baseUrl + 'api_key=' + FLICKR_KEY + '&tags=' + search + '&privacy_filter=1&safe_search=1&content_type=1&extras=url_m&page=' + page + '&per_page=10&format=json&nojsoncallback=1'
        if(search.length > 2 && reconnectTimeouts <= 3){
            axios.get(url, { timeout: App.timeout })
            .then((response) => { 
                return response.data 
            })
            .then((data) => {
                if(mounted){
                    var fetchedPhotos = data.photos.photo.filter((photo:Photo) => photo.server != '0').filter((photo:Photo) => photo.url_m)
                    setPhotos(page === 1 ? fetchedPhotos : [...photos, ...fetchedPhotos])
                    setError('')
                }
            })
            .catch((error) => { 
                if (error.code === App.timeoutErrorCode){
                    setReconnectTimeouts(reconnectTimeouts + 1)
                    setError(reconnectTimeouts < 3 ? 'Error from fetch: ' + error + '. Reconnecting...' : 'Error from fetch: ' + error + '. Failed to connect after ' + reconnectTimeouts + ' retries.')
                    setReconnect(!reconnect)
                } else{
                    setError('Error from fetch: ' + error)
                }
            })
            .finally(() => {
                setLoading(false)
            })
            return () => {mounted = false}
        } else {
            setError('Search term needs to be longer than 2 characters')
        }
    }, [search, page, reconnect])

    return { loading, photos, tempText, setTempText, setPhotos, search, setSearch, error, page, setPage }
}