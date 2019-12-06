<template>
  <div>
    <div>
      <div style="float: left;font-size: 15px;margin-top: 20px;margin-right: 20px;">
        评价时间
      </div>
      <el-row style="padding: 10px 20px 20px 40px;">
        <el-button type="success" :plain="!(listQuery.dateRange==='week')" @click="dateRangeChange('week')">近7天</el-button>
        <el-button type="success" :plain="!(listQuery.dateRange==='month')" @click="dateRangeChange('month')">近30天</el-button>
        <el-button type="success" :plain="!(listQuery.dateRange==='all')" @click="dateRangeChange('')">全部</el-button>
      </el-row>
    </div>
    <div>
      <div style="float: left;font-size: 15px;margin-top: 20px;margin-right: 50px;">
        星级
      </div>
      <el-row style="padding: 10px 20px 20px 40px;">
        <el-button type="success" :plain="!(listQuery.starLevel==='all')" @click="starLevelChange('')">全部</el-button>
        <el-button type="success" :plain="!(listQuery.starLevel==='highLevel')" @click="starLevelChange('highLevel')">好评(4-5星)</el-button>
        <el-button type="success" :plain="!(listQuery.starLevel==='lowLevel')" @click="starLevelChange('lowLevel')">中差评(低于4星)</el-button>
      </el-row>
    </div>
    <div>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        height="618"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="{row}">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单编号:">
                <span>{{ row.orderSn }}</span>
              </el-form-item>
              <el-form-item label="用户昵称:">
                <span>{{ row.nickName }}</span>
              </el-form-item>
              <el-form-item label="评价类型:">
                <span v-if="row.orderScore >4 ">
                  好评
                </span>
                <span v-if="row.orderScore <4 ">
                  中差评
                </span>
              </el-form-item>
              <el-form-item label="订单评分:">
                <span>{{ row.orderScore }}</span>
              </el-form-item>
              <el-form-item label="评价图片:" width="150" style="line-height: 60px;">
                <span v-for="(item,index) in row.images" :key="index">
                 <el-popover
                   placement="left"
                   trigger="click"
                   style="margin-left: 5px;">
                  <img :src="item" width="420" height="262" alt=""/>
                  <img slot="reference" :src="item" width="100" height="60" alt=""/>
                  </el-popover>
                </span>
              </el-form-item>
              <el-form-item label="评价内容:">
                <span>{{ row.content }}</span>
              </el-form-item>
              <el-form-item label="回复内容:">
                <span>{{ row.replyContent }}</span>
              </el-form-item>
              <el-form-item label="评价时间:">
                <span>{{ formatDate(row.createTime) }}</span>
              </el-form-item>
              <el-form-item label="回复时间:">
                <span>{{ formatDate(row.replyTime) }}</span>
              </el-form-item>
              <el-form-item label="是否显示:">
                <span v-if="row.isShow === '1'">
                  显示
                </span>
                <span v-if="row.isShow === '0'">
                  不显示
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="用户昵称"
          prop="nickName"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderScore"
          label="评价类型"
          width="120">
          <template slot-scope="{row}">
            <el-tag
              :type="row.orderScore >4 ? 'danger' : 'info'"
              disable-transitions>
              <div v-if="row.orderScore >4 ">
                好评
              </div>
              <div v-if="row.orderScore <4 ">
                中差评
              </div>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          width="280"
          label="订单评分"
          prop="orderScore"
          align="center">
          <template slot-scope="{row}">
            <div class="star">
              <el-rate
                v-model="row.orderScore"
                disabled
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="评价内容"
          prop="content"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          width="150"
          label="点评时间"
          prop="createTime"
          align="center"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
          align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini">
              回复
            </el-button>
            <el-button size="mini" type="danger" @click="deleteRow(row)">
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
      style="padding: 20px 16px 0px 16px;">
    </pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import moment from 'moment'
import { getEvaluationList, deleteEvaluation } from '@/api/evaluation'

export default {
    name: "EvaluationDetail",
    components: { Pagination },
    props: {
      tabType: String
    },
    data() {
      return {
          total: 0,
          listQuery: {
            page: 1,
            limit: 10,
            dateRange: 'week',
            starLevel: '',
            tabType: this.tabType
          },
          tableData: [],
          tableLoading: false
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
           this.getEvaluationList();
        },
        starLevelChange(starLevel) {
           this.listQuery.starLevel = starLevel;
            this.getEvaluationList();
        },
        pagination(data){
            this.listQuery.page = data.page;
            this.listQuery.limit = data.limit;
            this.getEvaluationList();
        },
        getEvaluationList(){
            getEvaluationList(this.listQuery).then(response => {
                const data = response.data;
                this.total = response.total;
                data.forEach(item => {
                    item.images = item.images.split(';')
                })
                this.tableData = data;
            }).catch()
        },
        deleteRow(row){
            this.$confirm('此操作将永久删除该评价, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(response => {
                deleteEvaluation({ evaluationId: row.evaluationId }).then(response =>{
                    this.$message({
                        message: response.message,
                        type: 'success'
                    })
                    this.getEvaluationList()
                }).catch(() => {
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    mounted() {
        this.getEvaluationList();
    }
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>

<style lang="scss">
  .star{
    .el-rate__icon {
      font-size: 22px;
    }
  }
</style>
