<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.loginName" placeholder="用户帐号" style="width: 200px;" class="filter-item"/>
      <el-input v-model="listQuery.userPhone" placeholder="手机号" style="width: 200px;" class="filter-item"/>
      <el-select v-model="listQuery.userType" placeholder="用户类型" clearable style="width: 120px" class="filter-item">
        <el-option value="门店用户"/>
        <el-option value="会员用户"/>
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
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="用户头像" width="120" align="center">
          <template slot-scope="{row}">
            <el-popover
              placement="right"
              trigger="click">
              <img :src="row.userPhoto" width="420" height="262" alt=""/>
              <img slot="reference" :src="row.userPhoto" width="50" height="30" alt=""/>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="用户帐号"
          width="220"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userName"
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
          prop="userType"
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
        @pagination="getUsers"
        style="padding: 20px 16px 0px 16px;">
      </pagination>

    <el-dialog
      :title="this.dialogFormTitle"
      width="600px"
      @close="resetUser"
      :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :model="user"
               label-position="left"
               label-width="80px"
               style="width: 350px; margin-left:50px;"
               @submit.native.prevent>
        <el-form-item label="用户帐号:">
          <el-input v-model="user.loginName"></el-input>
        </el-form-item>
        <el-form-item label="密   码:">
          <el-input v-model="user.userPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="用户名称:">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:">
          <el-input v-model="user.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input v-model="user.userPhone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="用户类型:">
          <el-select v-model="user.userType" placeholder="请选择" filterable allow-create>
            <el-option
              v-for="item in allUserType"
              :key="item.userType"
              :value="item.userType">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱地址:">
          <el-input v-model="user.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="用户头像:">
          <el-upload
            class="avatar-uploader"
            v-model="user.userPhoto"
            action="mock/user/uploadUserPhoto"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="user.userPhoto" :src="user.userPhoto" class="avatar">
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
import { getUsers } from '@/api/user'
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
    return {
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        loginName: undefined,
        userPhone: undefined,
        userType: undefined
      },
      user: {
        loginName: '',
        userPwd: '',
        userName: '',
        realName: '',
        userPhone: '',
        userType: '',
        userPhoto: '',
        userEmail: '',
        createTime: new Date()
      },
      allUserType:[
        {
          userType: '店长'
        },
        {
          userType: '店员'
        },
        {
          userType: '普通会员'
        }
      ],
      dialogFormVisible: false,
      dialogFormTitle: ''
    }
  },
  methods:{
    getUsers () {
      getUsers(this.listQuery).then(response => {
        const data = response.data
        this.total = data.total
        this.tableData = data.items
      })
    },
    resetUser () {
      this.user = {
        loginName: '',
        userPwd: '',
        userName: '',
        userPhone: '',
        userType: '',
        userPhoto: '',
        userEmail: '',
        createTime: new Date()
      }
    },
    handleCreate () {
      this.dialogFormTitle = '新增用户';
      this.dialogFormVisible = true
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    handleModifyStatus(row, goodsStatus) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.goodsStatus = goodsStatus
    },
    handleAvatarSuccess(res, file) {
      this.user.userPhoto = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    backContinue() {
      this.resetUser();
      this.dialogFormVisible = false;
    },
    empty() {
      this.resetUser()
    },
    onCommit() {

    },
    edit(row) {
      this.dialogFormTitle = '编辑用户';
      this.dialogFormVisible = true;
      this.user = {
        loginName: row.loginName,
        userPwd: row.userPwd,
        userName: row.userName,
        realName: row.realName,
        userPhone: row.userPhone,
        userType: row.userType,
        userPhoto: row.userPhoto,
        userEmail: row.userEmail,
        createTime: row.createTime
      }
    }
  },
  mounted () {
    this.getUsers()
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
