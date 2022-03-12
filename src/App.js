import React, { Suspense } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

//import DialogsContainer from './components/Dialogs/DialogsContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import Navbar from './components/Navbar/Navbar'
import UsersContainer from './components/Users/UsersContainer'

import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import { connect } from 'react-redux'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/Common/Preloader/Preloader'
import store from './redux/redux-store'
import { Provider } from 'react-redux'
import './App.css'
import withSuspense from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {

    if (!this.props.initialized)
      return <Preloader />

    let Dl = withSuspense(DialogsContainer)

    return (
      <BrowserRouter>

        <div className='app-wrapper'>

          <HeaderContainer />

          <Navbar />

          <div className='app-wrapper-content'>

            <Routes>
              <Route path="/dialogs/*" element={<Dl />} />
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<Login />} />
            </Routes>

          </div>

        </div>

      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  initialized: state.app.initialized
})

let AppContainer = connect(mapStateToProps, { initializeApp })(App);

const MainApp = props => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </React.StrictMode>
  )
}

export default MainApp

