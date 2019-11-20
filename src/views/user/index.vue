<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.realName" placeholder="用户姓名" style="width: 200px;" class="filter-item"></el-input>
      <el-input v-model="listQuery.userPhone" placeholder="手机号" style="width: 200px;" class="filter-item"></el-input>
      <el-select v-model="listQuery.userType" placeholder="用户类型" clearable style="width: 120px" class="filter-item">
        <el-option value="1" label="店长"></el-option>
        <el-option value="2" label="店员"></el-option>
        <el-option value="3" label="普通会员"></el-option>
      </el-select>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增用户
      </el-button>
    </div>

    <div style="padding-top: 20px">
      <el-table
        :data="tableData"
        height="750"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="userId"
          label="用户ID"
          v-if="false"
        >
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户ID"
          v-if="false"
        >
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="用户头像" width="120" align="center">
          <template slot-scope="{row}">
            <el-popover
              placement="right"
              trigger="click">
              <img :src="row.avatar" width="420" height="262" alt=""/>
              <img slot="reference" :src="row.avatar" width="50" height="30" alt=""/>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户帐号"
          width="220"
          align="center">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="用户名称"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="真实姓名"
          width="110"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="手机号"
          width="130"
          align="center">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="用户类型"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userEmail"
          label="邮箱"
          width="230"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userScore"
          label="用户积分"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <el-tag type="warning">
              {{ row.userScore }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          :formatter="dateFormat"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
          align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="edit(row)">
              编辑
            </el-button>
            <el-button size="mini" type="danger">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getUserList"
        style="padding: 20px 16px 0px 16px;">
      </pagination>

    <el-dialog
      :title="this.dialogFormTitle"
      width="600px"
      @close="resetUser"
      :visible.sync="dialogFormVisible">
      <el-form ref="userForm"
               :rules="userFormRules"
               :model="userForm"
               label-position="right"
               label-width="85px"
               style="width: 350px; margin-left:50px;"
               @submit.native.prevent>
        <el-form-item
          prop="username"
          label="用户帐号:">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密   码:">
          <el-input v-model="userForm.password" type="password" placeholder="输入可修改密码"></el-input>
        </el-form-item>
        <el-form-item
          prop="nickName"
          label="用户名称:">
          <el-input v-model="userForm.nickName"></el-input>
        </el-form-item>
        <el-form-item
          prop="realName"
          label="真实姓名:">
          <el-input v-model="userForm.realName"></el-input>
        </el-form-item>
        <el-form-item
          prop="userPhone"
          label="手机号码:">
          <el-input v-model="userForm.userPhone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="用户类型:">
          <el-select v-model="userForm.userType" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱地址:">
          <el-input v-model="userForm.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="用户头像:">
          <el-upload
            class="avatar-uploader"
            v-model="userForm.avatar"
            action="imgUpload/user/uploadUserImage"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="backContinue">返回</el-button>
          <el-button type="info" @click="empty">清空</el-button>
          <el-button type="primary" @click="onCommit" v-show="this.dialogFormTitle==='新增用户'">确认新增</el-button>
          <el-button type="primary" @click="onCommit" v-show="this.dialogFormTitle==='编辑用户'">确认编辑</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import moment from 'moment'
import { getUserList } from '@/api/user'
export default {
  name: "Product",
  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info'
      }
      return statusMap[status]
    }
  },
  data () {
    const validateData = (rule, value, callback) => {
        if (!value) {
            callback(new Error('该项不能为空'))
        } else {
            callback()
        }
    }
    const validatePhone = (rule, value, callback) => {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
            callback(new Error('请填写正确的号码'))
        } else {
            callback()
        }
    }
    return {
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        realName: '',
        userPhone: '',
        userType: ''
      },
      userForm: {
        userId: '',
        username: '',
        password: '',
        nickName: '',
        realName: '',
        userPhone: '',
        userType: '',
        roleName: '',
        avatar: '',
        userEmail: '',
        createTime: ''
      },
      roleList:[
        {
          id: 1,
          roleName: '店长'
        },
        {
          id: 2,
          roleName: '店员'
        },
        {
          id: 3,
          roleName: '普通会员'
        }
      ],
      dialogFormVisible: false,
      dialogFormTitle: '',
      userFormRules: {
          username: [{required: true, trigger: 'blur', validator: validateData}],
          realName: [{required: true, trigger: 'blur', validator: validateData}],
          nickName: [{required: true, trigger: 'blur', validator: validateData}],
          userPhone: [{required: true, trigger: 'blur', validator: validatePhone}]
      },
    }
  },
  methods:{
    dateFormat (row, column){
        var date = row[column.property]
        if(date === undefined){
            return ''
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
    },
    getUserList () {
      getUserList(this.listQuery).then(response => {
        this.total = response.total
        this.tableData = response.data
      })
    },
    resetUser () {
      this.userForm = {
        userId: '',
        username: '',
        password: '',
        nickName: '',
        userPhone: '',
        userType: '',
        roleName: '',
        avatar: '',
        userEmail: '',
        createTime: new Date()
      }
    },
    handleCreate () {
      // 调用获取用户类型下拉框接口
      this.dialogFormTitle = '新增用户';
      this.dialogFormVisible = true
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    handleAvatarSuccess(res, file) {
      this.userForm.avatar = res.data.avatar;
    },
    beforeAvatarUpload(file) {
      const isJPGorPng = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGorPng) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPGorPng && isLt2M;
    },
    backContinue() {
      this.resetUser();
      this.dialogFormVisible = false;
    },
    empty() {
      this.resetUser()
    },
    onCommit() {
       this.$refs.userForm.validate(valid =>{
           if (valid){
               console.log(this.userForm)
           }else {
               return false
           }
       })
    },
    edit(row) {
      this.dialogFormTitle = '编辑用户';
      this.dialogFormVisible = true;
      this.userForm = {
        userId: row.userId,
        username: row.username,
        nickName: row.nickName,
        realName: row.realName,
        userPhone: row.userPhone,
        userType: row.roleId,
        roleName: row.roleName,
        avatar: row.avatar,
        userEmail: row.userEmail,
        createTime: row.createTime
      }
    }
  },
  mounted () {
    this.getUserList()
  }
}
</script>

<style lang="scss" scoped>
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 120px;
    height: 120px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
