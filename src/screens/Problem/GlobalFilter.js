import React from 'react'

export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span>
            <div className="field">
                Search: {' '}
                <input style={{borderWidth: 3, marginTop: 30, width: '85%'}} value={filter || ''} onChange={e => setFilter(e.target.value)} />
            </div>
        </span>
    )
}