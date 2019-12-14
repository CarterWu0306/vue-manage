<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">
        新增秒杀
      </el-button>
    </div>

    <div style="padding-top: 20px">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        height="750"
        border
        style="width: 100%">
        <el-table-column
          prop="flashSaleId"
          label="秒杀ID"
          v-if="false"
        >
        </el-table-column>
        <el-table-column
          prop="score"
          label="秒杀积分"
          align="center">
        </el-table-column>
        <el-table-column
          prop="stock"
          label="库存"
          align="center">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          :formatter="dateFormat"
          align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
          align="center">
          <template slot-scope="{row}">
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

    <el-dialog
      title="新增秒杀"
      width="600px"
      @close="resetFlashSale"
      :visible.sync="dialogFormVisible">
      <el-form ref="flashSaleForm"
               :model="flashSaleForm"
               label-position="right"
               label-width="85px"
               style="width: 350px; margin-left:50px;"
               @submit.native.prevent>
        <el-form-item
          prop="score"
          label="秒杀积分:">
          <el-input-number v-model="flashSaleForm.score" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item
          prop="stock"
          label="秒杀数量:">
          <el-input-number v-model="flashSaleForm.stock" :min="0"></el-input-number>
        </el-form-item>
        <span style="margin-left: 10px;font-weight: 700;margin-right: 10px;">开始时间:</span>
        <el-date-picker
          v-model="flashSaleForm.startTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="backContinue">返回</el-button>
          <el-button type="primary" :loading="loading" @click="addFlashSale">确认新增</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import moment from 'moment'
    import { getFlashSaleList, addFlashSale, deleteFlashSale } from '@/api/flashSale'
    export default {
        name: "index",
        components: {
            Pagination
        },
        data() {
            return{
                tableData: [],
                total: 0,
                listQuery: {
                    page: 1,
                    limit: 20
                },
                flashSaleForm:{
                    score: 0,
                    stock: 0,
                    startTime: new Date()
                },
                tableLoading: false,
                loading: false,
                dialogFormVisible: false,
            }
        },
        methods:{
            dateFormat(row, column) {
                var date = row[column.property]
                if (date === undefined) {
                    return ''
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            },
            pagination(data){
                this.listQuery.page = data.page;
                this.listQuery.limit = data.limit;
                this.getFlashSaleList();
            },
            resetFlashSale(){
                this.flashSaleForm = {
                    score: 0,
                    stock: 0,
                    startTime: new Date()
                }
            },
            getFlashSaleList(){
                this.tableLoading = true;
                getFlashSaleList(this.listQuery).then(response => {
                    this.total = response.total;
                    this.tableData = response.data;
                    this.tableLoading = false;
                }).catch(() => {
                    this.tableLoading = false
                })
            },
            handleCreate() {
                this.dialogFormVisible = true;
            },
            backContinue(){
                this.resetFlashSale();
                this.dialogFormVisible = false;
            },
            deleteRow(row){
                this.$confirm('此操作将永久删除该秒杀活动, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(response => {
                    deleteFlashSale({ flashSaleId: row.flashSaleId }).then(response => {
                        this.$message({
                            message: response.message,
                            type: 'success'
                        })
                        this.getFlashSaleList()
                    }).catch(() => {
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addFlashSale(){
                this.loading = true;
                addFlashSale(this.flashSaleForm).then(response => {
                    this.loading = false
                    this.dialogFormVisible = false
                    this.$message({
                        message: response.message,
                        type: 'success'
                    })
                    this.getFlashSaleList()
                }).catch(() => {
                    this.loading = false
                })
            }
        },
        mounted() {
            this.getFlashSaleList();
        }
    }
</script>

<style scoped>

</style>
