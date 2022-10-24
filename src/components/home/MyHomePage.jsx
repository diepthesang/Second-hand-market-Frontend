import { CircularProgress, Grid } from '@material-ui/core'
import { ListItem } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import MyBodyHome from './MyBodyHome'
import MyFooter from '../common/MyFooter'
import MyHeader from '../common/MyHeader'

function MyHomePage() {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <MyHeader />
            <MyBodyHome />
            <MyFooter />
        </div>
    )
}

export default MyHomePage