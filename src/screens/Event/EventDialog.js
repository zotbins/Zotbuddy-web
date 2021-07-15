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
    const [editFlag, setEditFlag] = useState(false)

    const [id, setId] = useState(0)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    //const [imageUrl, setImageUrl] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())


    const toast = useToast()
    const initialRef = useRef()

    useEffect(() => {
        setId('')
        setTitle('')
        setDescription('')
        setLocation('')
        setStartDate(new Date())
        setEndDate(new Date())
    }, [dialog.open])

    const handleCloseDialog = () => {
        setEditFlag(false)
        props.handleClose()
    }

    const addEvent = async () => {
        const db = firebase.firestore()
        const eventRef = await db.collection('event').add({
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            location: location,
            imageUrl: ''
        })
        toast({
            title: eventRef ? 'Success' : 'Error',
            description: eventRef ? 'Added event to Firebase' : 'An error occured while adding event to Firebase',
            status: eventRef ? 'success' : 'error',
            duration: 3000,
            isClosable: true,
        })
        props.setRefresh(true)
        props.handleClose()
    }

    const handleEditFill = async () => {
        if (id != '') {
            setEditFlag(true);
            const db = firebase.firestore()
            const docRef = await db.collection('event').doc(id).get().then((docRef) => {
                console.log("document: " + docRef.data())
                setTitle(docRef.data().title)
                setDescription(docRef.data().description)
                setLocation(docRef.data().location)
                setStartDate(docRef.data().startDate.toDate())
                setEndDate(docRef.data().endDate.toDate())

 
            }).catch((error) => { })
        }
    }

    const editEvent = async () => {
        const db = firebase.firestore()
        const eventRef = await db.collection('event').doc(id).update({
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            location: location,
            imageUrl: ''
        }).then(() => {
            toast({
                title: 'Success',
                description: 'Edited event in Firebase',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }).catch((error) => {
            toast({
                title: 'Error',
                description: 'An error occured while editing event in Firebase',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        })
        setEditFlag(false)
        props.setRefresh(true)
        props.handleClose()
    }

    const deleteEvent = async () => {
        const db = firebase.firestore()
        const eventRef = await db.collection('event').doc(id).delete().then(() => {
            toast({
                title: 'Success',
                description: 'Deleted event from Firebase',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }).catch((error) => {
            toast({
                title: 'Error',
                description: 'An error occured while deleting event from Firebase',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        })
        props.setRefresh(true)
        props.handleClose()
    }

    return (
        <Modal initialFocusRef={initialRef} isOpen={open} onClose={handleCloseDialog} size={'lg'} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {(() => {
                        switch (state) {
                            case "add": return "Add a new event";
                            case "edit": return "Edit an existing event";
                            case "delete": return "Delete an existing event";
                            default: return "ERROR";
                        }
                    })()}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6} >
                    {(state == "add") ?
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
                        : (state == "edit") ?
                            <Stack>
                                <Textarea
                                    value={id}
                                    onChange={e => {
                                        setId(e.target.value)
                                    }}
                                    placeholder={'Enter the ID of the event to edit'}
                                    size={'lg'}
                                />
                                <Button onClick={handleEditFill}>
                                    Enter
                                </Button>
                                {(editFlag == true) ?
                                    <>
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
                                        /> </> :
                                    <></>
                                }

                            </Stack>
                            : (state == "delete") ?
                                <Stack>
                                    <Textarea
                                        value={id}
                                        onChange={e => {
                                            setId(e.target.value)
                                        }}
                                        placeholder={'Enter the ID of the event to delete'}
                                        size={'lg'}
                                    />
                                </Stack>
                                :
                                <Stack></Stack>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorscheme='teal'
                        mr={3}
                        onClick={(() => {
                            switch (state) {
                                case "add": return addEvent;
                                case "edit": return editEvent;
                                case "delete": return deleteEvent;
                                default: return;
                            }
                        })()}
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