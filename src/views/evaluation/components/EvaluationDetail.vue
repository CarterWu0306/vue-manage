<template>
  <div>
    <div>
      <div style="float: left;font-size: 15px;margin-top: 20px;margin-right: 20px;">
        评价时间
      </div>
      <el-row style="padding: 10px 20px 20px 40px;">
        <el-button type="success" :plain="!(listQuery.dateRange==='week')" @click="dateRangeChange('week')">近7天</el-button>
        <el-button type="success" :plain="!(listQuery.dateRange==='month')" @click="dateRangeChange('month')">近30天</el-button>
        <el-button type="success" :plain="!(listQuery.dateRange==='all')" @click="dateRangeChange('all')">全部</el-button>
      </el-row>
    </div>
    <div>
      <div style="float: left;font-size: 15px;margin-top: 20px;margin-right: 50px;">
        星级
      </div>
      <el-row style="padding: 10px 20px 20px 40px;">
        <el-button type="success" :plain="!(listQuery.starLevel==='all')" @click="starLevelChange('all')">全部</el-button>
        <el-button type="success" :plain="!(listQuery.starLevel==='highLevel')" @click="starLevelChange('highLevel')">好评(4-5星)</el-button>
        <el-button type="success" :plain="!(listQuery.starLevel==='lowLevel')" @click="starLevelChange('lowLevel')">中差评(1-3星)</el-button>
      </el-row>
    </div>
    <div>
      <el-table
        :data="tableData"
        height="618"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="{row}">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单编号:">
                <span>{{ row.orderNo }}</span>
              </el-form-item>
              <el-form-item label="用户ID:">
                <span>{{ row.userID }}</span>
              </el-form-item>
              <el-form-item label="用户名:">
                <span>{{ row.userName }}</span>
              </el-form-item>
              <el-form-item label="评价类型:">
                <span v-if="row.evaluationType === '1'">
                  好评
                </span>
                <span v-if="row.evaluationType === '0'">
                  中差评
                </span>
              </el-form-item>
              <el-form-item label="订单评分:">
                <span>{{ row.evaluationScore }}</span>
              </el-form-item>
              <el-form-item label="上传图片:" width="150">
                <el-popover
                  placement="left"
                  trigger="click">
                  <img :src="row.evaluationImages" width="420" height="262" alt=""/>
                  <img slot="reference" :src="row.evaluationImages" width="50" height="30" alt=""/>
                </el-popover>
              </el-form-item>
              <el-form-item label="点评内容:">
                <span>{{ row.evaluationContent }}</span>
              </el-form-item>
              <el-form-item label="商家回复:">
                <span>{{ row.businessReply }}</span>
              </el-form-item>
              <el-form-item label="点评时间:">
                <span>{{ row.evaluationCreateTime }}</span>
              </el-form-item>
              <el-form-item label="商家回复时间:">
                <span>{{ row.businessReplyCreateTime }}</span>
              </el-form-item>
              <el-form-item label="是否显示:">
                <span v-if="row.isShow === '1'">
                  显示
                </span>
                <span v-if="row.isShow === '0'">
                  不显示
                </span>
              </el-form-item>
              <el-form-item label="有效状态:">
                <span v-if="row.statusFlag === '1'">
                  有效
                </span>
                <span v-if="row.statusFlag === '0'">
                  无效
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          width="180"
          label="订单编号"
          prop="orderNo"
          align="center">
        </el-table-column>
        <el-table-column
          width="180"
          label="用户 ID"
          prop="userID"
          align="center">
        </el-table-column>
        <el-table-column
          width="150"
          label="用户名"
          prop="userName"
          align="center">
        </el-table-column>
        <el-table-column
          prop="evaluationType"
          label="评价类型"
          width="100">
          <template slot-scope="{row}">
            <el-tag
              :type="row.evaluationType === '1' ? 'danger' : 'info'"
              disable-transitions>
              <div v-if="row.evaluationType === '1'">
                好评
              </div>
              <div v-if="row.evaluationType === '0'">
                中差评
              </div>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          width="220"
          label="订单评分"
          prop="evaluationScore"
          align="center">
          <template slot-scope="{row}">
            <div class="star">
              <el-rate
                v-model="row.evaluationScore"
                disabled
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="点评内容"
          prop="evaluationContent"
          align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          width="150"
          label="点评时间"
          prop="evaluationCreateTime"
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
export default {
  name: "EvaluationDetail",
  components: { Pagination },
  props: {
    tabType: String
  },
  data() {
    return {
      total: 10,
      listQuery: {
        page: 1,
        limit: 10,
        dateRange: 'week',
        starLevel: 'all',
        tabType: this.tabType
      },
      tableData: [
          {
            orderNo: '12987122',
            userID: '100001',
            userName: '章潇裕',
            evaluationType: '1',
            evaluationScore: 3.7,
            evaluationContent: '荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻',
            evaluationCreateTime: '2019-09-11',
            evaluationImages: 'https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg',
            businessReply: '商家回复你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
            businessReplyCreateTime: '2019-09-11',
            isShow: '1',
            statusFlag: '1'
          },{
            orderNo: '12987122',
            userID: '100001',
            userName: '章潇裕',
            evaluationType: '0',
            evaluationScore: 3.7,
            evaluationContent: '荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻',
            evaluationCreateTime: '2019-09-11',
            evaluationImages: 'https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg',
            businessReply: '商家回复你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
            businessReplyCreateTime: '2019-09-11',
            isShow: '1',
            statusFlag: '1'
          },{
            orderNo: '12987122',
            userID: '100001',
            userName: '章潇裕',
            evaluationType: '1',
            evaluationScore: 3.7,
            evaluationContent: '荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻',
            evaluationCreateTime: '2019-09-11',
            evaluationImages: 'https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg',
            businessReply: '商家回复你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
            businessReplyCreateTime: '2019-09-11',
            isShow: '1',
            statusFlag: '1'
          },{
            orderNo: '12987122',
            userID: '100001',
            userName: '章潇裕',
            evaluationType: '1',
            evaluationScore: 3.7,
            evaluationContent: '荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻',
            evaluationCreateTime: '2019-09-11',
            evaluationImages: 'https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg',
            businessReply: '商家回复你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
            businessReplyCreateTime: '2019-09-11',
            isShow: '1',
            statusFlag: '1'
          },{
            orderNo: '12987122',
            userID: '100001',
            userName: '章潇裕',
            evaluationType: '1',
            evaluationScore: 3.7,
            evaluationContent: '荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻',
            evaluationCreateTime: '2019-09-11',
            evaluationImages: 'https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg',
            businessReply: '商家回复你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
            businessReplyCreateTime: '2019-09-11',
            isShow: '1',
            statusFlag: '1'
          },{
            orderNo: '12987122',
            userID: '100001',
            userName: '章潇裕',
            evaluationType: '0',
            evaluationScore: 3.7,
            evaluationContent: '荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻',
            evaluationCreateTime: '2019-09-11',
            evaluationImages: 'https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg',
            businessReply: '商家回复你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
            businessReplyCreateTime: '2019-09-11',
            isShow: '1',
            statusFlag: '1'
          },{
            orderNo: '12987122',
            userID: '100001',
            userName: '章潇裕',
            evaluationType: '1',
            evaluationScore: 3.7,
            evaluationContent: '荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻',
            evaluationCreateTime: '2019-09-11',
            evaluationImages: 'https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg',
            businessReply: '商家回复你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
            businessReplyCreateTime: '2019-09-11',
            isShow: '1',
            statusFlag: '1'
          },{
            orderNo: '12987122',
            userID: '100001',
            userName: '章潇裕',
            evaluationType: '1',
            evaluationScore: 3.7,
            evaluationContent: '荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻',
            evaluationCreateTime: '2019-09-11',
            evaluationImages: 'https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg',
            businessReply: '商家回复你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
            businessReplyCreateTime: '2019-09-11',
            isShow: '1',
            statusFlag: '1'
          },{
            orderNo: '12987122',
            userID: '100001',
            userName: '章潇裕',
            evaluationType: '0',
            evaluationScore: 3.7,
            evaluationContent: '荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻',
            evaluationCreateTime: '2019-09-11',
            evaluationImages: 'https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg',
            businessReply: '商家回复你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
            businessReplyCreateTime: '2019-09-11',
            isShow: '1',
            statusFlag: '1'
          },{
            orderNo: '12987122',
            userID: '100001',
            userName: '章潇裕',
            evaluationType: '1',
            evaluationScore: 3.7,
            evaluationContent: '荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻',
            evaluationCreateTime: '2019-09-11',
            evaluationImages: 'https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg',
            businessReply: '商家回复你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
            businessReplyCreateTime: '2019-09-11',
            isShow: '1',
            statusFlag: '1'
      }]
    }
  },
  methods: {
    dateRangeChange(dateType) {
      this.listQuery.dateRange = dateType;
    },
    starLevelChange(starLevel) {
      this.listQuery.starLevel = starLevel;
    }
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
