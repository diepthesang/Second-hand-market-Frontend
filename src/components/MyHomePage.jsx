import { Grid } from '@material-ui/core'
import { ListItem } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import MyBody from './MyBody'
import MyFooter from './MyFooter'
import MyHeader from './MyHeader'

function MyHomePage() {
    return (
        <div style={{ backgroundColor: "#7b35ba", overflowX: 'hidden' }}>
            <MyHeader />
            <MyBody />
            <MyFooter />
        </div>


    )
}

export default MyHomePage