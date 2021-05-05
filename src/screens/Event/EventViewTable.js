import React, { useState, useMemo, useEffect } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { Route, Switch } from 'react-router-dom'
import './event-table.css'
import './GlobalFilter.js'
import firebase from 'firebase'

import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { GlobalFilter } from './GlobalFilter';

const COLUMNS = [
    {
        Header: "Events",
        columns: [
          {
            Header: "Start Date",
            accessor: "startDate"
          },
          {
            Header: "End Date",
            accessor: "endDate",
          },
          {
            Header: "Title",
            accessor: "title"
          },
          {
            Header: "Description",
            accessor: "description"
          },
          {
            Header: "Location",
            accessor: "location"
          },
          {
            Header: "Image URL",
            accessor: "imageURL"
          }
        ]
    }
]


const DATA = [
    {
        "id": "event1",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #1",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event2",
        "startDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #2",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event3",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #3",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event4",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #4",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event1",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #1",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event2",
        "startDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #2",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event3",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #3",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event4",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #4",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event1",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #1",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event2",
        "startDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #2",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event3",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #3",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event4",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #4",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event1",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #1",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event2",
        "startDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #2",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event3",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #3",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event4",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #4",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event1",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #1",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event2",
        "startDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #2",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event3",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #3",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event4",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #4",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event1",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #1",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event2",
        "startDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #2",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event3",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #3",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event4",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #4",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event1",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #1",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event2",
        "startDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 21, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #2",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event3",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #3",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
    {
        "id": "event4",
        "startDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "endDate": "April 18, 2021 at 12:59:10 PM UTC-7",
        "title": "Testing Event #4",
        "description": "This is a test event!",
        "location": "On Zoom",
        "imageURL": "https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg"
    },
]


const EventViewTable = props => {
  /**
   * grab the data from props
   * use react-table here to render the table with the data
   */

  /* useMemo makes sure the data is not recreated during every render! */
  const [DATA, setData] = useState([]);

  //DEBUG: useEffect correctly sets DATA to the array from firebase but memoData is not getting updated
  useEffect(() => {
      const fetchData = async() => {
          try {
            const db = firebase.firestore()
            let events = []
            db.collection('event').onSnapshot((snapshot) => {
              snapshot.forEach((doc) => {
                events.push({ 
                    id: doc.id,
                    startDate: doc.data().startDate,
                    endDate: doc.data().endDate,
                    title: doc.data().title,
                    description: doc.data().description,
                    location: doc.data().location,
                    imageURL: doc.data().imageURL
                })
              })
            })
           setData(events)
          }catch (err){
              console.error(err)
          }
      }
      fetchData();
  }, [])

  console.log("INSIDE TABLE: ", DATA)
  const memoColumns = useMemo(() => COLUMNS, [])
  const memoData = useMemo(() =>  DATA, [])  

  const tableInstance = useTable({
      columns: memoColumns,
      data: memoData
  }, useGlobalFilter, useSortBy)

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
      setGlobalFilter
  } = tableInstance
  console.log("INSIDE TABLE MEMO: ", memoData)  //DEBUG: memodata keeps printing as empty

  const { globalFilter } = state

  return (
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
    <Flex>
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? ' ▲' : ' ▼') : ''}
                                        </span>
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} onClick={() => props.handleOpenAddDialog()}>
                                {
                                    row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </Flex>
    </>
  )
}

export default EventViewTable