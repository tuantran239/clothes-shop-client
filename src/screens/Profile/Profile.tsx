import React, { Fragment } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Navbar from '@App/components/Navbar'
import Announcement from '@App/components/Announcement'
import { Col, Container, Row } from 'react-bootstrap'
import BackTo from '@App/components/BackTo'
import { RouteUrl } from '@App/constants'
import { useRecoilValue } from 'recoil'
import { User } from '@App/recoils/user/atom'
import Info from './Info'
import UpdatePassword from './UpdatePassword'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const Profile = (props: TabPanelProps) => {
  const [value, setValue] = React.useState(0)
  const user = useRecoilValue(User)

  console.log(user)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Fragment>
      <Navbar />
      <Announcement />
      <Container className="mt-5">
        <Row>
          <Col xl={3} lg={3}>
            <BackTo url={RouteUrl.HOME}>Back to home</BackTo>
          </Col>
        </Row>
        <Row>
          <Col xl={8} lg={8} className="mx-auto">
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Info" {...a11yProps(0)} />
                  {user && user.authType === 'email' && (
                    <Tab label="Update password" {...a11yProps(1)} />
                  )}
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                {user && <Info user={user} />}
              </TabPanel>
              {user && user.authType === 'email' && (
                <TabPanel value={value} index={1}>
                  <UpdatePassword />
                </TabPanel>
              )}
            </Box>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Profile
