import React, { useState } from 'react'
import { 
  Flex, 
  Text,
} from '@chakra-ui/react'
import firebase from 'firebase'

import EventViewSidebar from './EventViewSidebar'
import EventViewTable from './EventViewTable'
import EventDialog from './EventDialog'

const EventView = props => {
  const [dialog, setDialog] = useState({
    open: false,
    data: null,
    state: 'create',
  })

  const handleOpenAddDialog = () => {
    setDialog({
      open: true,
      data: null,
      state: 'create'
    })
  }

  const handleCloseDialog = () => {
    setDialog({
      open: false,
      data: null,
    })
  }

  const queryEvents = async () => {
     const db = firebase.firestore()
     let events = []
     db.collection('event').onSnapshot((snapshot) => {
       snapshot.forEach((doc) => {
         const documentData = doc.data()
         events.push({ ...documentData, id: doc.id })
       })
     })
     console.log("events: " , events)
     return(events)
    }

  /**
   * query events here and pass the data to problem view table
   */
  return (
    <Flex paddingTop={10} paddingRight={100}>
        <Flex direction={'column'} grow={1} paddingLeft={30} paddingRight={30}>
            <EventViewSidebar 
                handleOpenAddDialog={handleOpenAddDialog}
            />
        </Flex>
        <Flex align={'left'} direction={'column'} grow={1}>
            <EventViewTable handleOpenAddDialog={handleOpenAddDialog} getData={queryEvents}/>
        </Flex>
        <EventDialog
            dialog={dialog}
            handleClose={handleCloseDialog}
        />
    </Flex>
  )
}

export default EventView