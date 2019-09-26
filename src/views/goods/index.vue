<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.goodsName" placeholder="商品名称" style="width: 200px;" class="filter-item"/>
      <el-select v-model="listQuery.goodsLabel" placeholder="商品标签" clearable style="width: 120px" class="filter-item">
        <el-option value="招牌菜"/>
      </el-select>
      <el-select v-model="listQuery.goodsStatus" placeholder="商品状态" clearable style="width: 120px" class="filter-item">
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
          prop="goodsName"
          label="商品名称"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="goodsLabel"
          label="商品标签"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <el-tag>
              {{ row.goodsLabel }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="{row}">
            <el-popover
              placement="left"
              trigger="hover">
              <img :src="row.goodsImg" width="420" height="262" alt=""/>
              <img slot="reference" :src="row.goodsImg" width="50" height="30" alt=""/>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsPrice"
          label="商品价格(元)"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <el-tag type="danger">
              {{ row.goodsPrice }}￥
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsDesc"
          label="商品描述"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="saleTime"
          label="上架时间"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="saleNum"
          label="总销售量"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <el-tag type="warning">
              {{ row.saleNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsStock"
          label="商品库存"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <el-tag type="warning">
              {{ row.goodsStock }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsStatus"
          label="商品状态"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <el-tag :type="row.goodsStatus | statusFilter">
              <span v-if="row.goodsStatus==='0'">
                已下架
              </span>
              <span v-if="row.goodsStatus==='1'">
                已上架
              </span>
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
            <el-button v-if="row.goodsStatus!='1'" size="mini" type="success" @click="handleModifyStatus(row,'1')">
              上架
            </el-button>
            <el-button v-if="row.goodsStatus!='0'" size="mini" @click="handleModifyStatus(row,'0')">
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
import { getList } from '@/api/table'
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
        goodsName: undefined,
        goodsLabel: undefined,
        goodsStatus: undefined
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
    handleModifyStatus(row, goodsStatus) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.goodsStatus = goodsStatus
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>

</style>
