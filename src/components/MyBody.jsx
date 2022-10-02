import { Box, Grid, ListItem } from '@material-ui/core'
import { Stack } from '@mui/material'
import React from 'react'
import MyCategory from './MyCategory'
import MyListProduct from './MyListProduct'
import MyThumbnailAds from './MyThumbnailAds'

function MyBody() {
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={8} >
        <Stack direction='column' spacing={2} paddingTop={8} bgcolor='white' overflow='scroll'>
          <MyThumbnailAds />
          <MyCategory />
          <MyListProduct />
        </Stack>
      </Grid>
    </Grid >

  )
}

export default MyBody