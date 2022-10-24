import { Grid } from '@material-ui/core'
import { Stack } from '@mui/material'
import React from 'react'
import MyCategory from '../common/MyCategory'
import MyListProduct from '../common/MyListProduct'
import MyThumbnailAds from '../common/MyThumbnailAds'



function MyBodyHome() {
  return (
    <div style={{ marginTop: 65 }}>
      <Grid container justifyContent='center'>
        <Grid item xs={8} >
          <Stack direction='column' spacing={2} bgcolor='white' overflow='scroll'>
            <MyThumbnailAds />
            <MyCategory />
            <MyListProduct />
          </Stack>
        </Grid>
      </Grid >
    </div>

  )
}

export default MyBodyHome
