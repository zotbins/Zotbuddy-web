import React, { useState, useRef, useEffect } from 'react'
import { 
  Flex,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Stack,
  Textarea,
  Checkbox,
  Divider,
  useToast
} from '@chakra-ui/react'
import firebase from 'firebase'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './custom-react-datepicker.css'

//css styling src: //https://gist.github.com/baumandm/8665a34bc418574737847f7394f98bd9

const EventDialog = props => {
  const { dialog } = props
  const { open, data, state } = dialog

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  //const [imageUrl, setImageUrl] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const toast = useToast()
  const initialRef = useRef()

  useEffect(() => {
    setTitle('')
    setDescription('')
    setLocation('')
    setStartDate(new Date())
    setEndDate(new Date())
  }, [dialog.open])

  const handleCloseDialog = () => {
    props.handleClose()
  }

  const addEvent = async () => {
    const db = firebase.firestore()
    const eventRef = await db.collection('event').add({
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
      imageUrl: ''
    })
    toast({
      title: eventRef ? 'Success' : 'Error',
      description:  eventRef ? 'Added problem to Firebase' : 'An error occured while adding problem to Firebase',
      status: eventRef ? 'success': 'error',
      duration: 3000,
      isClosable: true,
    })
    props.handleClose()
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={open} onClose={handleCloseDialog} size={'lg'} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new problem</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} >
          <Stack>
            <FormControl>
              <FormLabel htmlFor='start-date'>Start Date</FormLabel>
              <DatePicker
                id='start-date'
                selected={startDate}
                onChange={date => setStartDate(date)}
                showTimeSelect
                showPopperArrow={true}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='end-date'>End Date</FormLabel>
              <DatePicker
                id='end-date'
                selected={endDate}
                onChange={date => setEndDate(date)}
                showTimeSelect
                showPopperArrow={true}
              />
            </FormControl>
            <Textarea
              value={title}
              onChange={e => { 
                setTitle(e.target.value)
              }}
              placeholder={'Enter the title of this event'}
              size={'lg'}
            />
            <Textarea
              value={description}
              onChange={e => { 
                setDescription(e.target.value)
              }}
              placeholder={'Enter the description of this event'}
              size={'lg'}
            />
            <Textarea
              value={location}
              onChange={e => { 
                setLocation(e.target.value)
              }}
              placeholder={'Enter the location of this event'}
              size={'lg'}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button 
            colorscheme='teal' 
            mr={3}
            onClick={addEvent}
          >
            Save
          </Button>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EventDialog