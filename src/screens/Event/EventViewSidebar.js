import React from 'react'
import { Flex, Text, Button, Stack } from '@chakra-ui/react'

const EventViewSidebar = props => {

  return (
    <Flex
      direction={"column"}
      grow={0}
      shrink={0}
      overflow='hidden'
      p='10px'
      style={{
        width: '15.38%',
        borderRight: '1px #aaaaaa solid',
        maxWidth: '200px',
        overflowX: undefined,
        flexShrink: 0,
        textAlign: 'left',
        backgroundColor: '#e5e5e5',
      }}
    >
      <Flex direction={'column'} grow={1} justify='space-between'>
        <Stack spacing={4} direction={'column'} align={'center'}>
          <Button colorScheme='teal' size='lg' onClick={() => props.handleOpenAddDialog()}>
            Add Event
          </Button>
        </Stack>
      </Flex>
    </Flex>
  )
}

export default EventViewSidebar