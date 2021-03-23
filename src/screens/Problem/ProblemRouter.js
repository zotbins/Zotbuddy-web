import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { Route, Switch } from 'react-router-dom'
import ProblemView from './ProblemView'

const ProblemRouter = props => {
  const url = props.match.url

  return (
    <Switch>
      <Route path={url} component={ProblemView} />
    </Switch>
  )
}

export default ProblemRouter