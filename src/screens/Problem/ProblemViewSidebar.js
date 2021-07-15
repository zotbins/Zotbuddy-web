import React from 'react'
import { Flex, Text, Button, Stack } from '@chakra-ui/react'

const ProblemViewSidebar = props => {

  return (
    <Flex
      direction={"column"}
      grow={0}
      shrink={0}
      overflow='hidden'
      p='10px'
      style={{
        width: '100%',
        maxWidth: '15.38%',
        overflowX: undefined,
        flexShrink: 0,
        textAlign: 'center',
        margin: '50px'
        // width: '15.38%',
        // borderRight: '1px #aaaaaa solid',
        // maxWidth: '200px',
        // overflowX: undefined,
        // flexShrink: 0,
        // textAlign: 'left',
        // backgroundColor: '#e5e5e5',
      }}
    >
      <Flex direction={'column'} grow={1} justify='space-between' align='right'>
        <Stack spacing={4} direction={'column'} align={'right'}>
          <Button colorScheme='teal' size='lg' variant='outline' onClick={() => props.handleOpenAddDialog()}>
            Add Problem
          </Button>

          <Button colorScheme='teal' size='lg' variant='outline' onClick={() => props.handleOpenEditDialog()}>
            Edit Problem
          </Button>

          <Button colorScheme='teal' size='lg'variant='outline'  onClick={() => props.handleOpenDeleteDialog()}>
            Delete Problem
          </Button>

        </Stack>
      </Flex>
    </Flex>
  )
}

export default ProblemViewSidebar