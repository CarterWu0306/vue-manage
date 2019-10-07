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

    <el-dialog
      title="新增商品"
      width="600px"
      :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :model="goods"
               label-position="left"
               label-width="80px"
               style="width: 350px; margin-left:50px;"
               @submit.native.prevent>
        <el-form-item label="商品名称:">
          <el-input v-model="goods.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品标签:">
          <el-select v-model="goods.goodsLabel" placeholder="请选择">
            <el-option
              v-for="item in allGoodsLabel"
              :key="item.goodsLabel"
              :value="item.goodsLabel">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片:" style="line-height: 180px;">
          <el-upload
            class="avatar-uploader"
            v-model="goods.goodsImg"
            action="mock/table/uploadGoodsImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="goods.goodsImg" :src="goods.goodsImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述:">
          <el-input type="textarea" v-model="goods.goodsDesc"></el-input>
        </el-form-item>
        <el-form-item label="商品价格:">
          <el-input-number v-model="goods.goodsPrice" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="商品库存:">
          <el-input-number v-model="goods.goodsStock" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="backContinue">返回</el-button>
          <el-button type="info" @click="empty">清空</el-button>
          <el-button type="primary">确认新增</el-button>
        </span>
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
      allGoodsLabel: [
        {
          goodsLabel: '招牌菜'
        },
        {
          goodsLabel: '凉菜'
        }
      ],
      listQuery: {
        page: 1,
        limit: 20,
        goodsName: undefined,
        goodsLabel: undefined,
        goodsStatus: undefined
      },
      goods: {
        goodsName: '',
        goodsLabel: '',
        goodsImg: '',
        goodsPrice: '',
        goodsDesc: '',
        saleTime: new Date(),
        goodsStock: 0,
      },
      dialogFormVisible: false,
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
    handleCreate () {
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
      this.goods.goodsImg = URL.createObjectURL(file.raw);
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
      this.dialogFormVisible = false
    },
    empty() {
        this.goods.goodsName = '';
        this.goods.goodsLabel = '';
        this.goods.goodsImg = '';
        this.goods.goodsPrice = '';
        this.goods.goodsDesc = '';
        this.goods.saleTime = new Date();
        this.goods.goodsStock = 0;
    }
  },
  mounted () {
    this.getList()
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
    width: 180px;
    height: 180px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }
  .avatar {
    width: 180px;
    height: 180px;
    display: block;
  }
</style>
