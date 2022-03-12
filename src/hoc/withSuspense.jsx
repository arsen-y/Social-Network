import React, { Suspense } from 'react'
import Preloader from '../components/Common/Preloader/Preloader'

const withSuspense = Component => {

    return (props) => (
        <Suspense fallback={<Preloader />}><Component {...props} /></Suspense>
    )

}

export default withSuspense

