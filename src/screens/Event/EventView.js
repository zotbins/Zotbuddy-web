import React, { useState, useEffect } from 'react'
import {
    Flex,
} from '@chakra-ui/react'
import firebase from 'firebase'

import EventViewSidebar from './EventViewSidebar'
import EventViewTable from './EventViewTable'
import EventDialog from './EventDialog'

const EventView = props => {
    const [refresh, setRefresh] = useState(false)

    const [dialog, setDialog] = useState({
        open: false,
        data: null,
        state: '',
    })

    const handleOpenAddDialog = () => {
        setDialog({
            open: true,
            data: null,
            state: 'add'
        })
    }

    const handleOpenEditDialog = () => {
        setDialog({
            open: true,
            data: null,
            state: 'edit'
        })
    }

    const handleOpenDeleteDialog = () => {
        setDialog({
            open: true,
            data: null,
            state: 'delete'
        })
    }

    const handleCloseDialog = () => {
        setDialog({
            open: false,
            data: null,
            state: '',
        })
        setRefresh(false)
    }

    const [DATA, setData] = useState([]);

    useEffect(() => {
        const queryEvents = async () => {
            try {
                const snapshot = await firebase.firestore().collection('event').get()
                let events = []
                console.log("snapshot: " + snapshot)
                snapshot.forEach((doc) => {
                    events.push({
                        "id": doc.id,
                        "startDate": doc.data().startDate.toDate().toString(),
                        "endDate": doc.data().endDate.toDate().toString(),
                        "title": doc.data().title,
                        "description": doc.data().description,
                        "location": doc.data().location,
                        "imageURL": doc.data().imageURL
                    })
                })
                setData(events)
            } catch (err) {
                console.error(err)
            }
        }
        queryEvents();
    }, [refresh]) 

    /**
     * query events here and pass the data to problem view table
     */
    return (
        <Flex paddingTop={10} paddingRight={100}>
            <Flex direction={'column'} grow={1} paddingLeft={30} paddingRight={30}>
                <EventViewSidebar
                    handleOpenAddDialog={handleOpenAddDialog}
                    handleOpenEditDialog={handleOpenEditDialog}
                    handleOpenDeleteDialog={handleOpenDeleteDialog}
                />
            </Flex>
            <Flex align={'left'} direction={'column'} grow={1}>
                <EventViewTable DATA={DATA} />
            </Flex>
            <EventDialog
                dialog={dialog}
                handleClose={handleCloseDialog}
                setRefresh={setRefresh}
            />
        </Flex>
    )
}

export default EventView