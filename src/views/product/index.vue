<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.productName" placeholder="商品名称" style="width: 200px;" class="filter-item"/>
      <el-select v-model="listQuery.productLabel" placeholder="商品标签" clearable style="width: 120px" class="filter-item">
        <el-option value="招牌菜"/>
      </el-select>
      <el-select v-model="listQuery.productStatus" placeholder="商品状态" clearable style="width: 120px" class="filter-item">
        <el-option value="已上架"/>
        <el-option value="已下架"/>
      </el-select>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增商品
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
        <el-table-column
          fixed
          prop="productName"
          label="商品名称"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productLabel"
          label="商品标签"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <el-tag>
              {{ row.productLabel }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" width="150" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              trigger="hover">
              <img :src="scope.row.img" width="420" height="262" alt=""/>
              <img slot="reference" :src="scope.row.img" width="50" height="30" alt=""/>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="productPrice"
          label="商品价格(元)"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <el-tag type="danger">
              {{ row.productPrice }}￥
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="productDetail"
          label="详细介绍">
        </el-table-column>
        <el-table-column
          prop="productCreateTime"
          label="创建时间"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productStatus"
          label="商品状态"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <el-tag :type="row.productStatus | statusFilter">
              {{ row.productStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="260"
          align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini">
              编辑
            </el-button>
            <el-button v-if="row.productStatus!='已上架'" size="mini" type="success" @click="handleModifyStatus(row,'已上架')">
              上架
            </el-button>
            <el-button v-if="row.productStatus!='已下架'" size="mini" @click="handleModifyStatus(row,'已下架')">
              下架
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
        style="padding: 18px 16px;">
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
import { getList } from '@/api/table'
export default {
  name: "Product",
  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        已上架: 'success',
        已下架: 'info'
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
        productName: undefined,
        productLabel: undefined,
        productStatus: undefined
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
    getList () {
      getList(this.listQuery).then(response => {
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
    handleModifyStatus(row, productStatus) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.productStatus = productStatus
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>

</style>
