<template>
  <el-card class="box-card-component">
    <div style="position:relative;height: 255px;">
      <mallki class-name="mallki-text" text="热门商品" style="color: #f4516c;float: left;"/>
      <div style="padding-top: 45px;">
        <div class="progress-item" v-for="item in hotGoods" :key="item.goodsId">
          <span>{{item.goodsName}}</span>
          <el-progress :percentage="judgePercentage(item.sum,total)" :color="judgeColor(item.sum,total)"></el-progress>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'
import { sumHotGoods } from '@/api/home'

export default {
    components: { PanThumb, Mallki },

    filters: {
      statusFilter(status) {
        const statusMap = {
          success: 'success',
          pending: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
        return {
            statisticsData: {
                article_count: 1024,
                pageviews_count: 1024
            },
            hotGoods: [],
            total: 0
        }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    },
    methods: {
        judgePercentage (value,total) {
            if ((value/(total/2))*100>=100){
                return 100
            }
            return Math.ceil((value/(total/2))*100)
        },
        judgeColor (value,total) {
            if ((value/(total/2))*100>=60){
                return "#f55e77"
            }
            if ((value/(total/2))*100<=20){
                return "#ffb980"
            }
        },
        sumHotGoods(){
            sumHotGoods().then(response => {
                this.total = 0;
                const data = response.data;
                this.hotGoods = data;
                data.forEach(item => {
                    this.total += item.sum;
                })
            }).catch(() => {
            })
        }
    },
    mounted() {
        this.sumHotGoods();
    }
}
</script>

<style lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    /deep/ .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
