import { Grid } from '@mui/material'
import { Stack } from '@mui/system'
import MyListProduct from '../common/MyListProduct';
import MyChildCategory from './MyChildCategory';
import MyListProductByCate from './MyListProductByCate';


function MyBodyCategory() {

  return (
    <div>
      <Grid container justifyContent='center'>
        <Grid item xs={8} >
          <Stack direction='column' spacing={2} bgcolor='white' overflow='scroll'>
            <MyChildCategory />
            <MyListProductByCate />
          </Stack>
        </Grid>
      </Grid >
    </div>
  )
}

export default MyBodyCategory