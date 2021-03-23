import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { Route, Switch } from 'react-router-dom'
import TabBar from './TabBar'
import HomeView from '../screens/Home/HomeView'

const MainView = props => {

  return (
    <Flex direction={'column'}>
      <TabBar />
      <HomeView />
    </Flex>
  )
}

export default MainView