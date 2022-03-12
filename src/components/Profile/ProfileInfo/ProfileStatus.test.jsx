import React from 'react'
import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe('ProfileStatus component', () => {
    test("status from props should be in state", () => {
        const component = create(<ProfileStatus status="testing" />)
        const instance = component.getInstance()
        expect(instance.state.status).toBe("testing")
    })

    test("after creation <span> should be displayed with correct status", () => {
        const component = create(<ProfileStatus status="testing" />)
        const root = component.root
        let span = root.findByType('span')
        expect(span.length).toBe(1)
    })

})
