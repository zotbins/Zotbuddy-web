import React, { useState } from 'react'
import { 
  Flex, 
  Text,
} from '@chakra-ui/react'
import ProblemViewSidebar from './ProblemViewSidebar'
import ProblemViewTable from './ProblemViewTable'
import ProblemDialog from './ProblemDialog'

const ProblemView = props => {
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

  return (
    <Flex>
      <ProblemViewSidebar 
        handleOpenAddDialog={handleOpenAddDialog}
      />
      <Flex align={'left'} direction={'column'} grow={1}>
        <ProblemViewTable />
      </Flex>
      <ProblemDialog
        dialog={dialog}
        handleClose={handleCloseDialog}
      />
    </Flex>
  )
}

export default ProblemView