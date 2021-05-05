import React from 'react'
import { Flex, Text, Button, Stack } from '@chakra-ui/react'

const EventViewSidebar = props => {
    /* Add a button for editing an existing event entry */
  return (
    <Flex
      direction={"column"}
      grow={1}
      shrink={0}
      overflow='hidden'
      p='10px'
      style={{
        width: '100%',
        maxWidth: '500px',
        overflowX: undefined,
        flexShrink: 0,
        textAlign: 'center',
      }}
    >
      <Flex direction={'column'} grow={1} justify='space-between' align='right'>
        <Stack spacing={4} direction={'column'} align={'right'}>
          <Button colorScheme='teal' size='lg' variant="outline" onClick={() => props.handleOpenAddDialog()}>
            Add Event
          </Button>
          <Button colorScheme='teal' size='lg' variant="outline" onClick={() => props.handleOpenAddDialog()}>
            Edit Existing Event
          </Button>
          <Button colorScheme='teal' size='lg' variant="outline" onClick={() => props.handleOpenAddDialog()}>
            Delete Event
          </Button>
        </Stack>
      </Flex>
    </Flex>
  )
}

export default EventViewSidebar