import { renderHook } from '@testing-library/react-hooks'
import { useFlickrImages } from '../useFlickrImages'
import { act } from 'react-test-renderer'

describe('useFlickerImages', () => {
    describe('With search term with length 2', () => {
        it('should set error', () => {
            const { result } = renderHook(() => useFlickrImages())
            act(() => result.current.setSearch('XX'))
            expect(result.current.error).toBe("Search term needs to be longer than 2 characters")
        })
    })
})