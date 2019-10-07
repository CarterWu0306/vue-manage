<template>
  <div>
    <div style="height: 750px;">
      <div v-if="tabType==='AllOrders'" style="display:inline">
        <el-row style="float:left;padding: 10px 20px 20px 40px;">
          <el-button size="mini" type="success" :plain="!(listQuery.dateRange==='today'&&listQuery.dateRangeValue==='')" @click="dateRangeChange('today')">今日</el-button>
          <el-button size="mini" type="success" :plain="!(listQuery.dateRange==='yesterday'&&listQuery.dateRangeValue==='')" @click="dateRangeChange('yesterday')">昨日</el-button>
          <el-button size="mini" type="success" :plain="!(listQuery.dateRange==='week'&&listQuery.dateRangeValue==='')" @click="dateRangeChange('week')">近7天</el-button>
          <el-button size="mini" type="success" :plain="!(listQuery.dateRange==='month'&&listQuery.dateRangeValue==='')" @click="dateRangeChange('month')">近30天</el-button>
          <el-button  size="mini" type="success" :plain="!(listQuery.dateRange==='all'&&listQuery.dateRangeValue==='')" @click="dateRangeChange('all')">全部</el-button>
        </el-row>
        <div style="padding-top: 3px;" class="order-date-picker">
          <el-date-picker
            v-model="listQuery.dateRangeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="datePickerChange"
            style="float:left;">
          </el-date-picker>
          <el-input v-model="listQuery.orderSn" placeholder="订单编号" style="width: 350px;float:left;padding-left: 20px;" class="filter-item"></el-input>
          <el-button class="filter-item" style="margin-left: 10px;float:left;" type="primary" icon="el-icon-search">
            查询
          </el-button>
        </div>
        <div style="text-align:right;padding-right: 35px;">
            <el-button type="success" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出Excel</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        border
        height="700px"
        style="width: 100%">
        <el-table-column
          prop="orderSn"
          label="订单编号"
          width="320"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户 ID"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户姓名"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderDetails"
          label="订单详情"
          width="300"
          :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-tag type="warning" v-for="item in row.orderDetails" style="margin-right: 10px;">
              {{ item.goodsName }} X{{item.goodsNum}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalMoney"
          label="订单总金额"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="realTotalMoney"
          label="实付金额"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderRemarks"
          label="备注"
          width="160">
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="订单状态"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <span v-if="row.orderStatus==='-2'">
                  订单取消
            </span>
            <span v-if="row.orderStatus==='-1'">
                  待付款
            </span>
            <span v-if="row.orderStatus==='0'">
                  制作中
            </span>
            <span v-if="row.orderStatus==='1'">
                  订单完成
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="payStatus"
          label="支付状态"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <span v-if="row.payStatus==='0'">
                  未支付
            </span>
            <span v-if="row.payStatus==='1'">
                  已支付
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="isAppraise"
          label="是否点评"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <span v-if="row.isAppraise==='0'">
                  未点评
            </span>
            <span v-if="row.isAppraise==='1'">
                  已点评
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="isRefund"
          label="是否退款"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <span v-if="row.isRefund==='0'">
                  未退款
            </span>
            <span v-if="row.isRefund==='1'">
                  已退款
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderScore"
          label="所得积分"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderCreateTime"
          label="订单创建时间"
          width="250"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderPayTime"
          label="订单支付时间"
          width="250"
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
      style="padding: 20px 16px 0px 16px;">
    </pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getOrderList } from '@/api/table'
import { parseTime } from '@/utils'
export default {
  name: "TabOrder",
  components: {
    Pagination
  },
  props: {
    tabType: String
  },
  data() {
    return {
      tableData: [],
      total: 10,
      listQuery: {
        page: 1,
        limit: 20,
        orderSn: undefined,
        dateRange: 'today',
        tabType: this.tabType,
        dateRangeValue: ''
      },
      downloadLoading: false
    }
  },
  methods: {
    dateRangeChange(dateType) {
      this.listQuery.dateRange = dateType
      this.listQuery.dateRangeValue = ''
    },
    datePickerChange() {

    },
    getOrderList() {
      getOrderList(this.listQuery).then(response => {
        const data = response.data
        this.total = data.total
        this.tableData = data.items
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['订单编号', '用户ID', '订单金额', '实付金额', '订单详情', '备注', '订单状态', '支付状态','是否点评','是否退款','所得积分', '订单创建时间', '订单支付时间']
        const filterVal = ['orderSn', 'userId', 'totalMoney', 'realTotalMoney', 'orderDetails', 'orderRemarks', 'orderStatus', 'payStatus','isAppraise','isRefund','orderScore', 'orderCreateTime', 'orderPayTime']
        const data = this.formatJson(filterVal, this.tableData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '订单Excel'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'orderCreateTime' || j === 'orderPayTime') {
          return parseTime(v[j])
        }
        if (j === 'orderDetails'){
          var orderDetails = ''
          for (var i=0;i<v[j].length;i++){
            orderDetails += v[j][i].goodsName + ' X' + v[j][i].goodsNum + ' '
          }
          return orderDetails
        }
        if (j === 'orderStatus') {
          if (v[j]==='-2') {
            return '订单取消'
          }
          if (v[j]==='-1') {
            return '待支付'
          }
          if (v[j]==='0') {
            return '制作中'
          }
          if (v[j]==='1') {
            return '订单完成'
          }
        }if (j === 'payStatus'){
          if (v[j]==='0') {
            return '未支付'
          }else{
            return '已支付'
          }
        }if (j === 'isAppraise'){
          if (v[j]==='0') {
            return '未点评'
          }else{
            return '已点评'
          }
        }if (j === 'isRefund'){
          if (v[j]==='0') {
            return '未退款'
          }else{
            return '已退款'
          }
        } else {
          return v[j]
        }
      }))
    }
  },
  mounted() {
    this.getOrderList()
  }
}
</script>

<style lang="scss">
  .order-date-picker{
    .el-date-editor .el-range-separator {
      padding: 0 0px;
    }
  }
</style>
