import { Grid } from '@mui/material'
import { Stack } from '@mui/system'
import MyListProduct from '../common/MyListProduct';
import MyChildCategory from './MyChildCategory';


function MyBodyCategory() {

  return (
    <div style={{ marginTop: 110 }}>
      <Grid container justifyContent='center'>
        <Grid item xs={8} >
          <Stack direction='column' spacing={2} bgcolor='white' overflow='scroll'>
            <MyChildCategory />
            <MyListProduct />
          </Stack>
        </Grid>
      </Grid >
    </div>
  )
}

export default MyBodyCategory