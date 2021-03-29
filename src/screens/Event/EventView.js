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

  // const queryProblems = async () => {
  //   const db = firebase.firestore()
  //   let questions = []
  //   db.collection('question').onSnapshot((snapshot) => {
  //     snapshot.forEach((doc) => {
  //       const documentData = doc.data()
  //       console.log(documentData)
  //       questions.push({ ...documentData, id: doc.id })
  //     })
  //   })
  //   console.log(questions)
  // }

  // queryProblems()

  return (
    <Flex>
      <EventViewSidebar 
        handleOpenAddDialog={handleOpenAddDialog}
      />
      <Flex align={'left'} direction={'column'} grow={1}>
        <EventViewTable />
      </Flex>
      <EventDialog
        dialog={dialog}
        handleClose={handleCloseDialog}
      />
    </Flex>
  )
}

export default EventView