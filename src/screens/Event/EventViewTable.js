import React from 'react'
import { Flex } from '@chakra-ui/react'
import './event-table.css'
import './GlobalFilter.js'

import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { GlobalFilter } from './GlobalFilter';

const COLUMNS = [
    {
        Header: "Events",
        columns: [
            {
                Header: "Id",
                accessor: "id"
            },
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
            /*{
                Header: "Image URL",
                accessor: "imageURL"
            }*/
        ]
    }
]

const EventViewTable = props => {
    /**
     * grab the data from props
     * use react-table here to render the table with the data
     */
    const tableInstance = useTable({
        columns: COLUMNS,
        data: props.DATA
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

    const { globalFilter } = state

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
                                    <tr {...row.getRowProps()}>
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