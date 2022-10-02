import { Box, Grid } from '@material-ui/core'
import { Stack } from '@mui/material'
import React from 'react'
import MyHeader from './MyHeader'

function MyPostPage() {
    return (
        <Box bgcolor='#7b35ba'>
            <Grid container justifyContent='center' >
                <Grid item xs={8} sm={8}>
                    <Box bgcolor='yellow' >
                        <Stack direction='column' spacing={2}>
                            <MyHeader></MyHeader>
                            <div style={{ marginTop: 100 }}>
                                <Grid container >
                                    <Grid item xs={4}>
                                        <div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>
                                            sfs
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div style={{ backgroundColor: 'blue', width: '100%', height: '100%' }}>
                                            sfsf
                                        </div>
                                    </Grid>
                                </Grid >

                            </div>
                        </Stack>
                    </Box>
                </Grid>
            </Grid >
        </Box>
    )
}

export default MyPostPage