<template>
  <div>
    <div style="height: 750px;">
      <div style="display:inline">
        <el-row style="float:left;padding: 10px 20px 20px 40px;">
          <el-button
            size="mini"
            type="success"
            :plain="!(listQuery.dateRange==='today')"
            @click="dateRangeChange('today')"
          >
            今日
          </el-button>
          <el-button
            size="mini"
            type="success"
            :plain="!(listQuery.dateRange==='week')"
            @click="dateRangeChange('week')"
          >
            近7天
          </el-button>
          <el-button
            size="mini"
            type="success"
            :plain="!(listQuery.dateRange==='month')"
            @click="dateRangeChange('month')"
          >
            近30天
          </el-button>
          <el-button
            size="mini"
            type="success"
            :plain="!(listQuery.dateRange==='')"
            @click="dateRangeChange('')"
          >
            全部
          </el-button>
        </el-row>
        <div style="padding-top: 3px;" class="order-date-picker">
          <el-input
            v-model="listQuery.orderSn"
            placeholder="订单编号"
            style="width: 350px;float:left;padding-left: 20px;"
            class="filter-item">
          </el-input>
          <el-button class="filter-item" style="margin-left: 10px;float:left;" type="primary" icon="el-icon-search" @click="select">
            查询
          </el-button>
        </div>
        <div style="text-align:right;padding-right: 35px;">
          <el-button type="success" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出Excel
          </el-button>
        </div>
      </div>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        height="700px"
        style="width: 100%"
      >
        <el-table-column
          prop="orderId"
          label="订单ID"
          v-if="false">
        </el-table-column>
        <el-table-column
          prop="orderRemarks"
          label="备注"
          v-if="false">
        </el-table-column>
        <el-table-column
          prop="deductionScore"
          label="抵扣积分"
          v-if="false">
        </el-table-column>
        <el-table-column
          prop="orderScore"
          label="所得积分"
          v-if="false">
        </el-table-column>
        <el-table-column
          prop="payStatus"
          label="支付状态"
          v-if="false">
          <!--<template slot-scope="{row}">
            <span v-if="row.payStatus==='0'">
              未支付
            </span>
            <span v-if="row.payStatus==='1'">
              已支付
            </span>
          </template>-->
        </el-table-column>
        <el-table-column
          prop="isAppraise"
          label="是否点评"
          v-if="false">
          <!--<template slot-scope="{row}">
            <span v-if="row.isAppraise==='0'">
              未点评
            </span>
            <span v-if="row.isAppraise==='1'">
              已点评
            </span>
          </template>-->
        </el-table-column>
        <el-table-column
          prop="isRefund"
          label="是否退款"
          v-if="false">
          <!--<template slot-scope="{row}">
            <span v-if="row.isRefund==='0'">
              未退款
            </span>
            <span v-if="row.isRefund==='1'">
              已退款
            </span>
          </template>-->
        </el-table-column>
        <el-table-column
          prop="orderSn"
          label="订单编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="用户昵称"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="用户姓名"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderDetails"
          label="订单详情"
          width="300"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{row}">
            <el-tag v-for="item in row.orderDetails" type="warning" style="margin-right: 10px;">
              {{ item.goodsName }} X{{ item.goodsNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalMoney"
          label="订单总金额"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <el-tag type="danger">
              {{ row.totalMoney }}元
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="realTotalMoney"
          label="实付金额"
          width="100"
          align="center">
          <template slot-scope="{row}">
            <el-tag type="danger">
              {{ row.realTotalMoney }}元
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="订单状态"
          width="100"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag type="danger" v-if="row.orderStatus==='-2'">
              订单取消
            </el-tag>
            <el-tag type="info" v-if="row.orderStatus==='-1'">
              待付款
            </el-tag>
            <el-tag v-if="row.orderStatus==='0'">
              制作中
            </el-tag>
            <el-tag type="success" v-if="row.orderStatus==='1'">
              订单完成
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderCreateTime"
          label="订单创建时间"
          width="160"
          align="center"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          prop="orderPayTime"
          label="订单支付时间"
          width="160"
          align="center"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="260"
          align="center"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" v-if="row.orderStatus==='0'" @click="completeOrder(row)">
              完成
            </el-button>
            <el-button type="primary" size="mini" @click="handleCreate(row)">
              详情
            </el-button>
            <el-button size="mini" type="danger" @click="deleteOrder(row)">
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
      @pagination="pagination"
      style="padding: 20px 16px 0px 16px;"
    />

    <el-dialog
      title="订单详情"
      width="600px"
      @close=""
      :visible.sync="dialogVisible"
      center>
      <div class="details-div">订单编号: <span class="details-span">{{ orderDetails.orderSn }}</span></div>
      <div class="details-div">用户昵称: <span class="details-span">{{ orderDetails.nickName }}</span></div>
      <div class="details-div">用户姓名: <span class="details-span">{{ orderDetails.realName }}</span></div>
      <div class="details-div">订单总金额:
        <span class="details-span">{{ orderDetails.totalMoney }}元</span>
      </div>
      <div class="details-div">实付金额:
        <span class="details-span">{{ orderDetails.realTotalMoney }}元</span>
      </div>
      <div class="details-div">备注: <span class="details-span">{{ orderDetails.orderRemarks }}</span></div>
      <div class="details-div">订单详情:
        <span class="details-span">
          <template>
            <el-tag v-for="item in orderDetails.orderDetails" type="warning" style="margin-right: 10px;margin-top: 5px">
              {{ item.goodsName }} X{{ item.goodsNum }}
            </el-tag>
          </template>
        </span>
      </div>
      <div class="details-div">订单状态:
        <span class="details-span">
          <template>
            <el-tag type="danger" v-if="orderDetails.orderStatus==='-2'">
              订单取消
            </el-tag>
            <el-tag type="info" v-if="orderDetails.orderStatus==='-1'">
              待付款
            </el-tag>
            <el-tag v-if="orderDetails.orderStatus==='0'">
              制作中
            </el-tag>
            <el-tag type="success" v-if="orderDetails.orderStatus==='1'">
              订单完成
            </el-tag>
          </template>
        </span>
      </div>
      <div class="details-div">支付状态:
        <span class="details-span">
          <el-tag type="info" v-if="orderDetails.payStatus==='0'">
              未支付
          </el-tag>
          <el-tag type="success" v-if="orderDetails.payStatus==='1'">
              已支付
          </el-tag>
        </span>
      </div>
      <div class="details-div">是否评价:
        <span class="details-span">
          <el-tag type="info" v-if="orderDetails.isAppraise==='0'">
              未评价
          </el-tag>
          <el-tag type="success" v-if="orderDetails.isAppraise==='1'">
              已评价
          </el-tag>
        </span>
      </div>
      <div class="details-div">是否退款:
        <span class="details-span">
          <el-tag type="info" v-if="orderDetails.isRefund==='0'">
              未退款
          </el-tag>
          <el-tag type="danger" v-if="orderDetails.isRefund==='1'">
              已退款
          </el-tag>
        </span>
      </div>
      <div class="details-div">抵扣积分: <span class="details-span">{{ orderDetails.deductionScore }}</span></div>
      <div class="details-div">所得积分: <span class="details-span">{{ orderDetails.orderScore }}</span></div>
      <div class="details-div">创建时间: <span class="details-span">{{ formatDate(orderDetails.orderCreateTime) }}</span></div>
      <div class="details-div">支付时间: <span class="details-span">{{ formatDate(orderDetails.orderPayTime) }}</span></div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeDetails">关闭详情</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getOrderList, getAllOrders, completeOrder, deleteOrder} from '@/api/order'
import { parseTime } from '@/utils'
import moment from 'moment'

export default {
  name: 'TabOrder',
  components: {
    Pagination
  },
  props: {
    tabType: String
  },
  data() {
      return {
          tableData: [],
          orderDetails: {},
          total: 0,
          listQuery: {
            page: 1,
            limit: 10,
            orderSn: '',
            dateRange: 'today',
            tabType: this.tabType
          },
          tableLoading: false,
          downloadLoading: false,
          dialogVisible: false
      }
  },
  mounted() {
      if (this.tabType === 'AllOrders'){
          this.dateRangeChange('')
      }else{
          this.getOrderList()
      }

  },
  methods: {
      dateFormat(row, column) {
          var date = row[column.property]
          if (date === undefined) {
              return ''
          }
          return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      formatDate(date){
          if (date === undefined){
              return ''
          }
          return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      dateRangeChange(dateType) {
          this.listQuery.dateRange = dateType;
          this.getOrderList();
      },
      select(){
          this.getOrderList()
      },
      pagination(data){
          this.listQuery.page = data.page;
          this.listQuery.limit = data.limit;
          this.getOrderList();
      },
      getOrderList() {
          this.tableLoading = true;
          getOrderList(this.listQuery).then(response => {
              this.total = response.total;
              this.tableData = response.data;
              this.tableLoading = false;
          }).catch(() => {
              this.tableLoading = false;
          })
      },
      handleDownload() {
          this.downloadLoading = true
          getAllOrders().then(response => {
              const allOrders = response.data
              import('@/vendor/Export2Excel').then(excel => {
                  const tHeader = ['订单编号', '用户昵称','用户姓名', '订单总金额', '实付金额', '订单详情', '备注', '订单状态', '支付状态', '是否点评', '是否退款', '抵扣积分', '所得积分', '订单创建时间', '订单支付时间']
                  const filterVal = ['orderSn', 'nickName', 'realName', 'totalMoney', 'realTotalMoney', 'orderDetails', 'orderRemarks', 'orderStatus', 'payStatus', 'isAppraise', 'isRefund', 'deductionScore', 'orderScore', 'orderCreateTime', 'orderPayTime']
                  const data = this.formatJson(filterVal, allOrders)
                  excel.export_json_to_excel({
                      header: tHeader,
                      data,
                      filename: '订单Excel'
                  });
                  this.downloadLoading = false
              })
          }).catch(() => {
              this.downloadLoading = false
          })
      },
      formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => {
              if (j === 'orderCreateTime' || j === 'orderPayTime') {
                  return parseTime(v[j])
              }
              if (j === 'orderDetails') {
                var orderDetails = ''
                for (var i = 0; i < v[j].length; i++) {
                    orderDetails += v[j][i].goodsName + ' X' + v[j][i].goodsNum + ' '
                }
                return orderDetails
              }
              if (j === 'orderStatus') {
                if (v[j] === '-2') {
                    return '订单取消'
                }
                if (v[j] === '-1') {
                    return '待支付'
                }
                if (v[j] === '0') {
                    return '制作中'
                }
                if (v[j] === '1') {
                    return '订单完成'
                }
              }
              if (j === 'payStatus') {
                if (v[j] === '0') {
                    return '未支付'
                } else {
                    return '已支付'
                }
              }
              if (j === 'isAppraise') {
                if (v[j] === '0') {
                    return '未点评'
                } else {
                    return '已点评'
                }
              }
              if (j === 'isRefund') {
                  if (v[j] === '0') {
                      return '未退款'
                  } else {
                      return '已退款'
                  }
              } else {
                  return v[j]
              }
          }))
        },
      completeOrder(row){
          //完成订单接口
          completeOrder({ orderId: row.orderId}).then(response => {
              this.$message({
                  message: response.message,
                  type: 'success'
              });
              this.getOrderList();
          }).catch(() => {
          })
      },
      handleCreate(row) {
          this.dialogVisible = true;
          this.orderDetails = row
      },
      closeDetails(){
          this.dialogVisible = false;
      },
      deleteOrder(row){
          this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(response => {
              let canVisti = false;
              const roleList = this.$store.getters.roles;
              roleList.forEach(index => {
                  if (index.roleCode === 'ROLE_MANAGER') {
                      canVisti = true
                  }
              })
              if (canVisti){
                  deleteOrder({ orderId: row.orderId }).then(response =>{
                      this.$message({
                          message: response.message,
                          type: 'success'
                      })
                      this.getOrderList()
                  }).catch(() => {
                  })
              }else{
                  this.$message({
                      message: '没有权限,请联系店长',
                      type: 'warning'
                  })
              }

          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
      }
    }
}
</script>

<style lang="scss">
  .details-div{
    font-weight: 700;
    padding-bottom: 14px;
    font-size: 15px;
    .details-span{
      font-weight: 500
    }
  }
</style>
