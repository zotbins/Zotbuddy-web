import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { Route, Switch } from 'react-router-dom'
import EventView from './EventView'

const EventRouter = props => {
  const url = props.match.url

  return (
    <Switch>
      <Route path={url} component={EventView} />
    </Switch>
  )
}

export default EventRouter