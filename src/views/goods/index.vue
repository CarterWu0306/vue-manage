<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.goodsName" placeholder="商品名称" style="width: 200px;" class="filter-item"></el-input>
      <el-select v-model="listQuery.goodsLabel" placeholder="商品标签" clearable style="width: 120px" class="filter-item">
        <el-option value="招牌菜"></el-option>
      </el-select>
      <el-select v-model="listQuery.goodsStatus" placeholder="商品状态" clearable style="width: 120px" class="filter-item">
        <el-option value="0" label="已下架"></el-option>
        <el-option value="1" label="已上架"></el-option>
      </el-select>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="getList">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增商品
      </el-button>
    </div>

    <div style="padding-top: 20px">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        height="750"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="goodsId"
          label="商品ID"
          v-if="false"
        >
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
          prop="createTime"
          label="上架时间"
          :formatter="dateFormat"
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
              <span v-if="row.goodsStatus === '0'">
                已下架
              </span>
              <span v-if="row.goodsStatus === '1'">
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
            <el-button type="primary" size="mini" @click="edit(row)">
              编辑
            </el-button>
            <el-button v-if="row.goodsStatus!= '1'" size="mini" type="success" @click="handleModifyStatus(row,'1')">
              上架
            </el-button>
            <el-button v-if="row.goodsStatus!= '0'" size="mini" :loading="loading" @click="handleModifyStatus(row,'0')">
              下架
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
      @pagination="getList"
      style="padding: 20px 16px 0px 16px;">
    </pagination>

    <el-dialog
      title="新增商品"
      width="600px"
      @close="resetGoods"
      :visible.sync="dialogFormVisible">
      <el-dialog
        width="30%"
        title="识别结果"
        :visible.sync="recognizeVisible"
        append-to-body>
        <span v-for="item in recognizeResult" :key="item.probability">
          <el-button type="primary" plain @click="recognizeResultClick(item.name)" style="margin-right: 20px;margin-bottom: 10px;">{{item.name}}</el-button>
        </span>
      </el-dialog>
      <el-form ref="goodsForm"
               :rules="goodsFormRules"
               :model="goodsForm"
               label-position="right"
               label-width="85px"
               style="width: 350px; margin-left:50px;"
               @submit.native.prevent>
        <el-form-item
          prop="goodsName"
          label="商品名称:">
          <el-input v-model="goodsForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item
          prop="goodsLabel"
          label="商品标签:">
          <el-select v-model="goodsForm.goodsLabel" placeholder="请选择" filterable allow-create>
            <el-option
              v-for="item in allGoodsLabel"
              :key="item.goodsLabel"
              :value="item.goodsLabel">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片:">
          <el-upload
            class="avatar-uploader"
            v-model="goodsForm.goodsImg"
            action="imgUpload/food-goods/goods/uploadAndReconizeImage"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="goodsForm.goodsImg" :src="goodsForm.goodsImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述:">
          <el-input type="textarea" v-model="goodsForm.goodsDesc"></el-input>
        </el-form-item>
        <el-form-item
          prop="goodsPrice"
          label="商品价格:">
          <el-input-number v-model="goodsForm.goodsPrice" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="商品库存:">
          <el-input-number v-model="goodsForm.goodsStock" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="总销售量:" v-show="this.dialogFormTitle==='编辑商品'">
          <el-input-number v-model="goodsForm.saleNum" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="backContinue">返回</el-button>
          <el-button type="info" @click="empty">清空</el-button>
          <el-button type="primary" @click="addGoods" :loading="loading" v-show="this.dialogFormTitle==='新增商品'">确认新增</el-button>
          <el-button type="primary" @click="editGoods" :loading="loading" v-show="this.dialogFormTitle==='编辑商品'">确认编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import moment from 'moment'
import { getList, addGoods, updateGoods, changeGoodsStatus, deleteGoods } from '@/api/goods'
export default {
  name: "Product",
  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'info',
        1: 'success'
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
    const validatePrice = (rule, value, callback) => {
      if (!value || value === 0) {
        callback(new Error('价格必须大于0'))
      } else {
        callback()
      }
    }
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
        goodsName: '',
        goodsLabel: '',
        goodsStatus: ''
      },
      goodsForm: {
        goodsName: '',
        goodsLabel: '',
        goodsImg: '',
        goodsPrice: '',
        goodsDesc: '',
        saleTime: new Date(),
        goodsStock: 0,
        saleNum: 0
      },
      goodsFormRules: {
        goodsName: [{required: true, trigger: 'blur', validator: validateData}],
        goodsLabel: [{required: true, trigger: 'change', validator: validateData}],
        goodsPrice: [{required: true, trigger: 'change', validator: validatePrice}]
      },
      recognizeResult: [],
      tableLoading: false,
      loading: false,
      dialogFormVisible: false,
      recognizeVisible: false,
      dialogFormTitle: ''
    }
  },
  computed:{
      headers(){
          return{
              'X-token': this.$store.getters.token
          }
      }
  },
  methods:{
    dateFormat (row, column){
      var date = row[column.property]
      if(date === undefined){
        return ''
      }
      return moment(date).format("YYYY-MM-DD HH:mm")
    },
    getList () {
      this.tableLoading = true
      getList(this.listQuery).then(response => {
        this.total = response.total
        this.tableData = response.data
        this.tableLoading = false
      }).catch(() => {
          this.tableLoading = false
      })
    },
    addGoods () {
      this.$refs.goodsForm.validate(valid =>{
        if (valid){
          this.loading = true
          addGoods(this.goodsForm).then(response =>{
            this.loading = false
            this.dialogFormVisible = false
            this.$message({
              message: response.message,
              type: 'success'
            })
            this.getList()
          }).catch(() => {
            this.loading = false
          })
        }else {
          return false
        }
      })
    },
    editGoods () {
      this.$refs.goodsForm.validate(valid =>{
        if (valid){
          this.loading = true
          updateGoods(this.goodsForm).then(response =>{
            this.loading = false
            this.dialogFormVisible = false
            this.$message({
              message: response.message,
              type: 'success'
            })
            this.getList()
          }).catch(() => {
            this.loading = false
          })
        }else {
          return false
        }
      })
    },
    resetGoods() {
      this.$refs.goodsForm.resetFields()
      this.goodsForm = {
        goodsName: '',
        goodsLabel: '',
        goodsImg: '',
        goodsPrice: '',
        goodsDesc: '',
        saleTime: new Date(),
        goodsStock: 0,
        saleNum: 0
      }
    },
    handleCreate() {
      this.dialogFormTitle = '新增商品';
      this.dialogFormVisible = true
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    handleModifyStatus(row, goodsStatus) {
        //修改上下架请求接口
        changeGoodsStatus({ goodsId: row.goodsId, goodsStatus: goodsStatus }).then(response =>{
            row.goodsStatus = goodsStatus;
            this.$message({
                message: response.message,
                type: 'success'
            })
        }).catch(() => {
        })
    },
    //图像上传识别成功回调
    handleAvatarSuccess(res, file) {
      this.goodsForm.goodsImg = res.data.ImgURL;
      this.recognizeResult = res.data.result;
      this.recognizeVisible = true;
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
    recognizeResultClick(name) {
      this.goodsForm.goodsName = name;
      this.recognizeVisible = false;
    },
    backContinue() {
      this.resetGoods();
      this.dialogFormVisible = false;
    },
    empty() {
      this.resetGoods()
    },
    edit(row) {
      this.dialogFormTitle = '编辑商品';
      this.dialogFormVisible = true;
      this.goodsForm = {
        goodsId: row.goodsId,
        goodsName: row.goodsName,
        goodsLabel: row.goodsLabel,
        goodsImg: row.goodsImg,
        goodsPrice: row.goodsPrice,
        goodsDesc: row.goodsDesc,
        saleTime: row.saleTime,
        goodsStock: row.goodsStock,
        goodsStatus: row.goodsStatus,
        saleNum: row.saleNum
      }
    },
    deleteRow(row){
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(response => {
          this.loading = true
          deleteGoods({ goodsId: row.goodsId }).then(response =>{
              this.$message({
                  message: response.message,
                  type: 'success'
              })
              this.getList()
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
