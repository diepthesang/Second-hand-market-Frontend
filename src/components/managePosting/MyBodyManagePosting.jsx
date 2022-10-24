import { Avatar, Box, Button, Grid, Switch, Tab } from '@material-ui/core'
import { Paper, Tabs } from '@mui/material';
import { Stack } from '@mui/system'
import axios from 'axios';
import React, { useEffect, useState } from 'react'


function MyBodyManagePosting() {
  const [activeId, setActiveId] = useState(1);
  const [listPost, setListPost] = useState([])
  const [value, setValue] = React.useState('1');
  const [checked, setChecked] = React.useState();
  const [postId, setPostId] = useState();

  const handleChangeChecked = (event) => {
    console.log('event.target.checked', event.target.checked);
    // updateActiveForPost(postId, activeId)
    if (event.target.checked) {
      setActiveId(1)
    } else {
      setActiveId(4)
    }

    setChecked(!event.target.checked);
    console.log('checked::::', checked);

  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAllPostByUserId = async () => {
    try {
      const { data } = await axios.get('/user/allPost', {
        headers: {
          Authorization: localStorage['access_token']
        }
      });
      console.log(data.data);
      setListPost(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const updateActiveForPost = async () => {
    try {
      await axios.put('/user/updateActiveIdPost',
        {
          postId,
          activeId,
        },
        {
          headers: {
            Authorization: localStorage['access_token']
          }
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(
    () => {
      getAllPostByUserId()
    }, [value]
  )

  useEffect(
    () => {
      updateActiveForPost()
      getAllPostByUserId()
    }, [checked]
  )


  return (
    <div style={{ marginTop: 110 }}>
      <Grid container justifyContent='center' >
        <Grid item xs={6} style={{ backgroundColor: '#F1ECF5' }}>
          <div style={{ color: 'red', backgroundColor: 'blue', marginBottom: 12 }}>
            <Stack direction='row' spacing={4}>
              <Avatar
                alt="Remy Sharp"
                src={'/static/images/avatar/1.jpg'}
                sx={{ width: 100, height: 100 }}
              />
              <p style={{ fontSize: 24 }}>Diep The Sang</p>
              <Button variant="outlined" size='small'>
                Trang cá nhân
              </Button>
            </Stack>

          </div>
          <Paper>
            <Box sx={{ width: '100%' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                centered
                size='small'
              >
                <Tab value="1" label="Show" defaultValue={1} />
                <Tab value="2" label="Hide" />
                <Tab value="3" label="khac" />
              </Tabs>
            </Box>
          </Paper>
          <div style={{ paddingTop: 12 }}>
            {listPost.map(item => {
              return (
                <Paper key={item.id} style={{ marginLeft: 12, marginRight: 12, marginBottom: 12 }}>
                  <Stack direction='row' spacing={2} padding={1}>
                    <img alt='' width={100} height={100} src={item.image.proImg}></img>
                    <Stack direction='column' spacing={1} justifyContent='start'>
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                      <p>{item.updatedAt}</p>
                    </Stack>
                    <div style={{ marginLeft: 300, display: 'inline-flex' }}>
                      {item.activeId === 1 ? <Switch
                        color='primary'
                        defaultChecked
                        // checked={checked}
                        onChange={handleChangeChecked}
                        onClick={() => { setPostId(item.id) }}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                        :
                        <Switch
                          color='primary'
                          // checked={checked}
                          onClick={() => { setPostId(item.id) }}
                          onChange={handleChangeChecked}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />}
                      <p style={{ marginTop: 6 }}>{item.activeId === 1 ? 'Show' : 'Hide'}</p>
                    </div>
                  </Stack>
                </Paper>
              )
            })}

          </div>
        </Grid>
      </Grid>
    </div >
  )
}

export default MyBodyManagePosting