import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { Route, Switch } from 'react-router-dom'
import ProblemRouter from '../Problem/ProblemRouter'
import EventRouter from '../Event/EventRouter'

const HomeView = props => {

  return (
    <Switch>
      <Route path='/problem' component={ProblemRouter} />
      <Route path='/event' component={EventRouter} />
      <Route
        path='/home'
        render={() => (
          <Flex>
            <Text>
              Currently under construction
            </Text>
            <Text>
              ZotBuddy Web v1
            </Text>
          </Flex>
        )}
      />
      <Route
        path='/'
        render={() => (
          <Flex>
            <Text>
              Currently under construction
            </Text>
            <Text>
              ZotBuddy Web v1
            </Text>
          </Flex>
        )}
      />
    </Switch>
  )
}

export default HomeView