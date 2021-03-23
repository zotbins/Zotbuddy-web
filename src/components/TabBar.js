import React from 'react'
import { Tabs, TabList, Tab } from '@chakra-ui/react'
import { withRouter } from 'react-router-dom'
import HomeView from '../screens/Home/HomeView'

const TabBar = props => {
  const matchedPath = props.location.pathname

  const tabs = new Map([
    ['/home', { label: 'Home', index: 0 }],
    ['/problem', { label: 'Problem', index: 1 }],
    ['/event', { label: 'Event', index: 2 }]
  ])

  //bad refactor
  const reverseTabs = new Map([
    [0, '/home'],
    [1, '/problem'],
    [2, '/event']
  ])

  const pushToRouter = (value) => {
    props.history.push(value)
  }

  const selectedTabValue = () => {
    if (tabs.get(matchedPath)) {
      return tabs.get(matchedPath).index
    }
    return 0
  }

  return (
    <Tabs
      variant='enclosed'
      onChange={(index) => { pushToRouter(reverseTabs.get(index)) }}
      size='lg'
      index={selectedTabValue()}
    >
      <TabList>
        {['/home', '/problem', '/event'].map((path, index) => {
          console.log(tabs.get(path))
          return (
            <Tab key={index}>
              {tabs.get(path).label}
            </Tab>
          )
        })}
      </TabList>
    </Tabs>
  )
}

export default withRouter(TabBar)