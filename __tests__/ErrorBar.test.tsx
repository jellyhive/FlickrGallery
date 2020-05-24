import React from 'react'
import ErrorBar from '../components/ErrorBar'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
    let tree: any;
    tree = renderer.create(<ErrorBar visible text="Error message" />).toJSON()
    expect(tree).toMatchSnapshot()
})