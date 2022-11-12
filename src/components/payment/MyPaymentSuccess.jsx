import { Grid, Paper } from '@material-ui/core'
import { Stack } from '@mui/system'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';

function MyPaymentSuccess() {


  const getTransactionId = async () => {
    try {

    } catch (error) {

    }
  }

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={4} style={{ minHeight: '70vh' }}>
        <Paper style={{ backgroundColor: "gray" }}>
          <Stack direction='column' justifyContent='center' justifyItems='center' alignItems='center' padding={12}>
            <CheckCircleIcon style={{ fill: 'green', width: 150, height: 150 }} />
            <p style={{ color: 'green', fontSize: 30 }}>Thanh toán thành công!</p>
            <p style={{ color: 'green', fontSize: 20 }}>Mã giao dịch: </p>
            <Button>
              Tiếp tục mua hàng
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default MyPaymentSuccess