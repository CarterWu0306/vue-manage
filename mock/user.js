const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const usersData = {
  'items': [
    {
      'userPhoto': 'https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg',
      'loginName': 'carter0306',
      'userPwd': '123456',
      'userName': '假装躺在云上好轻松',
      'realName': '伍卡特',
      'userPhone': '15669252627',
      'userType': '店长',
      'userEmail': 'carter0306@163.com',
      'userScore': 100,
      'createTime': '2019-9-26 13:56:26'
    }
  ]
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '登录失败: 用户名或密码错误!!!'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/user/getUsers',
    type: 'post',
    response: () => {
      const items = usersData.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },

  {
    url: '/user/uploadUserPhoto',
    type: 'post',
    response: () => {
      return {
        code: 20000
      }
    }
  }
]
