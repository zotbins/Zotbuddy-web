import React from 'react'
import firebase from 'firebase'
import { chakraTheme } from './theme' 
import { ChakraProvider } from '@chakra-ui/react'
import { firebaseConfig } from './config'
import { BrowserRouter } from 'react-router-dom'
import MainView from './components/MainView'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const App = () => {
  return (
    <ChakraProvider theme={chakraTheme} >
      <BrowserRouter forceRefresh={true} >
        <MainView />
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
