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
          width="250"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名称"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="手机号"
          width="220"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userType"
          label="用户类型"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userEmail"
          label="邮箱"
          width="250"
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
            <el-button type="primary" size="mini">
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
        @pagination="getList"
        style="padding: 20px 16px 0px 16px;">
      </pagination>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Title" prop="title">
          <el-input/>
        </el-form-item>
      </el-form>
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
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: ''
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
    resetTemp () {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>

<style scoped>

</style>
