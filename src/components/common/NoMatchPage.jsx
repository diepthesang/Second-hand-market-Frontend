import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import MyHeader from './MyHeader'
import MyFooter from './MyFooter';

function NoMatchPage() {
  return (
    <>
      <MyHeader />
      <Grid container justifyContent='center'>
        <Grid item xs={8}>
          <div style={{ paddingTop: 110, color: 'red', textAlign: 'center' }}>
            404 not found
          </div>

        </Grid>
      </Grid>
      <MyFooter />
    </>
  )
}

export default NoMatchPage