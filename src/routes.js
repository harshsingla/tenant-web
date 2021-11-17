import React from 'react'
import { push } from 'connected-react-router'
import _ from 'lodash'
import { Path } from 'path-parser'


import Dashboard from './containers/home'

import AddNumbers from './containers/numbers/addNumber'
import Numbers from './containers/numbers/list'

import Users from './containers/users/list'
import AddUsers from './containers/users/add'

import Department from './containers/department/list'
import AddDepartment from './containers/department/add'

import CallHistory from './containers/callHistory/list'
import PowerDailer from './containers/powerDailer/list'
import VoiceBroadcast from './containers/voiceBroadcast/list'
import CallScript from './containers/callScript/list'
import Settings from './containers/settings/list'
import Reports from './containers/reports/list'
import ScheduledCalls from './containers/scheduledCalls/list'
import Plans from './containers/plans'


import { ReactComponent as Number } from './assets/Number.svg'
import { ReactComponent as HomeIcon } from './assets/homeIcon.svg'
import { ReactComponent as User } from './assets/user.svg'
import { ReactComponent as Group } from './assets/Department-Icon.svg'
import { ReactComponent as Activity } from './assets/activity.svg'
import { ReactComponent as ReportsSvg } from './assets/reports.svg'
import { ReactComponent as Phone } from './assets/sscheduled.svg'
import { ReactComponent as Script } from './assets/script.svg'
import { ReactComponent as SettingsSvg } from './assets/settings.svg'
import { ReactComponent as ContactsSvg } from './assets/contacts.svg'
import Contacts from './containers/contacts/list'

const menu = [
  {
    'path': '/dashboard',
    'name': 'Dashboard',
    'title': "Dashboard",
    'icon': <HomeIcon fill="black" />,
    'key': 'home',
    'component': <Dashboard />,
    'authority': [
      'user'
    ]
  },
  {
    'path': '/numbers',
    'name': 'Numbers',
    'title': "Numbers",
    'icon': <Number />,
    'key': 'Numbers',
    'component': <Numbers />,
    'authority': [
      'user'
    ]
  },
  {
    'path': '/addNumbers',
    'name': 'Add Numbers',
    'title': "Add Numbers",
    'dontShowOnMenu': true,
    'icon': <Number />,
    'key': 'addNumbers',
    'component': <AddNumbers />,
    'authority': [
      'user'
    ]
  },
  {
    'path': '/department',
    'name': 'Department',
    'title': "Department",
    'icon': <Group />,
    'key': 'Department',
    'component': <Department />,
    'authority': [
      'user'
    ],
  },
  {
    'path': '/adddepartment',
    'name': 'Add Department',
    'title': "Add Department",
    'icon': <Group />,
    "dontShowOnMenu": true,
    'key': 'addDepartment',
    'component': <AddDepartment />,
    'authority': [
      'user'
    ]
  },
  {
    'path': '/editdepartment/:id/:deptname',
    'name': 'Edit Department',
    'title': "Edit Department",
    'icon': <Group />,
    "dontShowOnMenu": true,
    'key': 'editDepartment',
    'component': <AddDepartment />,
    'authority': [
      'user'
    ]
  },
  {
    'path': '/users',
    'name': 'Users',
    'title': "Users",
    'icon': <User />,
    'key': 'Users',
    'component': <Users />,
    'authority': [
      'user'
    ]
  },
  {
    'path': '/addUser',
    'name': 'Add User',
    'title': "Add User",
    'icon': <Group />,
    "dontShowOnMenu": true,
    'key': 'addUser',
    'component': <AddUsers />,
    'authority': [
      'user'
    ]
  },
  {
    'path': '/editUser/:id',
    'name': 'Edit User',
    'title': "Edit User",
    'icon': <Group />,
    "dontShowOnMenu": true,
    'key': 'editUser',
    'component': <AddUsers />,
    'authority': [
      'user'
    ]
  },

  {
    'path': '/callHistory',
    'name': 'Call History',
    'title': "Call History",
    'icon': <Activity />,
    'key': 'CallHistory',
    'component': <CallHistory />,
    'authority': [
      'user'
    ]
  },
  // {
  //   'path': '/powerDailer',
  //   'name': 'Power Dailer',
  //   'title':"Power Dailer Campaigns",
  //   'icon': <Thunderbolt />,
  //   'key': 'PowerDailer',
  //   'component': <PowerDailer />,
  //   'authority': [
  //     'user'
  //   ]
  // },
  // {
  //   'path': '/voiceBroadcast',
  //   'name': 'Voice Broadcast',
  //   'title':"Voice Broadcast Campaigns",
  //   'icon': <Voice />,
  //   'key': 'VoiceBroadcast',
  //   'component': <VoiceBroadcast />,
  //   'authority': [
  //     'user'
  //   ]
  // },
  // {
  //   'path': '/callScript',
  //   'name': 'Call Script',
  //   'title': "Call Script",
  //   'icon': <Script />,
  //   'key': 'CallScript',
  //   'component': <CallScript />,
  //   'authority': [
  //     'user'
  //   ]
  // },
  {
    'path': '/settings',
    'name': 'Settings',
    'title': "Settings",
    'icon': <SettingsSvg />,
    'key': 'Settings',
    'component': <Settings />,
    'authority': [
      'user'
    ]
  },
  {
    'path': '/reports',
    'name': 'Reports',
    'title': "Reports",
    'icon': <ReportsSvg />,
    'key': 'Reports',
    'component': <Reports />,
    'authority': [
      'user'
    ]
  },
  {
    'path': '/scheduledCalls',
    'name': 'Scheduled Calls',
    'title': "Scheduled Calls",
    'icon': <Phone />,
    'key': 'ScheduledCalls',
    'component': <ScheduledCalls />,
    'authority': [
      'user'
    ]
  },
  {
    'path': '/Plans',
    'name': 'Call Plans',
    'title': "Call Plans",
    "dontShowOnMenu": true,
    'icon': <Script />,
    'key': 'Plans',
    'component': <Plans />,
    'authority': [
      'user'
    ]
  },
  {
    'path': '/Contacts',
    'name': 'Contacts',
    'title': "Contacts",
    'icon': <ContactsSvg />,
    'key': 'Contacts',
    'component': <Contacts />,
    'authority': [
      'user'
    ]
  },
]

// utils for path

export const getUrlPushWrapper = (keyString, query) => {
  return push(getUrlPath(keyString, query))
}

export const getUrlPath = (keyString, params) => {

  if (!params) params = {}

  let keyArr = keyString.split('.')

  let val = _.find(menu, p => p.key === keyArr[0])

  if (!val) {
    return `/`
  }

  if (keyArr.length === 2) {
    val = _.find(val.children, p => p.key === keyArr[1])
  }

  if (!val) {
    return `/`
  }

  let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&')

  return `${val.path}?${queryString}`
}

export const getPushPathWrapper = (keyString, params = {}) => {

  let obj = getUrlObject(keyString)

  if (obj) {
    const path = new Path(obj.path)
    return push(path.build(params))
  }

  return 'error'
}

export const getUrlParams = (keyString, route) => {

  let obj = getUrlObject(keyString)
  if (obj) {
    const path = new Path(obj.path)

    return path.test(route)
  }

  return { error: true }
}

export const getUrlObject = (keyString) => {

  let keyArr = keyString.split('.')

  let val = _.find(menu, p => p.key === keyArr[0])

  if (!val) {
    return `/`
  }

  if (keyArr.length === 2) {
    val = _.find(val.children, p => p.key === keyArr[1])
  }

  if (!val) {
    return `/`
  }

  return val
}

export default menu;