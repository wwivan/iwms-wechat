<template>
  <div class>
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <div
          v-for="(item, index) in records"
          :key="index"
          class="stock-take"
          :class="(index < (records.length-1))?'bottom':''"
        >
          <div class="header">
            <span
              v-show="item.status == 3"
              class="bot"
              style="background: linear-gradient(135deg, #4181ff, #2360ef);"
            ></span>
            <span
              v-show="item.status == 1"
              class="bot"
              style="background: linear-gradient(135deg, #FF9779, #F6617B);"
            ></span>
            <span
              v-show="item.status == 2"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>
            <span class="context">{{item.orderNo}}</span>
          </div>

          <!-- 采购人员 采购总单-->
          <div class="content">
            <div>
              <div>采购物料: {{item.materielSku}}</div>
              <div>订单类型: {{item.orderType}}</div>
              <div>采购数量: {{item.qty}}</div>
              <div>含税总金额: {{item.spAmount}}</div>              
              <div>订单状态: {{item.status | formatPurchaseOrderStatus}}</div>
              <div>备注: {{item.remark}}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div class="confirm">
              <div
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findStockTakeDetail(item)"
              >详情</div>
            </div>
          </div>

          <!-- 采购人员 采购明细单-->
          <div class="content">
            <div>
              <div>采购物料: {{item.materielSku}}</div>
              <div>订单类型: {{item.orderType}}</div>
              <div>采购数量: {{item.qty}}</div>
              <div>含税总金额: {{item.spAmount}}</div>              
              <div>订单状态: {{item.status | formatPurchaseOrderStatus}}</div>
              <div>备注: {{item.remark}}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div class="confirm">
              <div
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findStockTakeDetail(item)"
              >详情</div>
            </div>
          </div>

          <!-- 审核人员 -->
          <div class="content">
            <div>
              <div>采购物料: {{item.materielSku}}</div>
              <div>订单类型: {{item.orderType}}</div>
              <div>采购数量: {{item.qty}}</div>
              <div>订单状态: {{item.status | formatPurchaseOrderStatus}}</div>
              <div>备注: {{item.remark}}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div class="confirm">
              <div
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findStockTakeDetail(item)"
              >详情</div>
            </div>
          </div>

          <!-- 供应商 -->
          <div class="content">
            <div>
              <div>订单编号: {{item.operatorUser}}</div>
              <div>采购物料: </div>
              <div>采购数量: {{item.qty}}</div>
              <div>订单状态: {{item.status | formatStockTakeStatus}}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div class="confirm">
              <div
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findStockTakeDetail(item)"
              >详情</div>
            </div>
          </div>

          <!-- 状态4 -->
          <div class="content">
            <div>
              <div>订单编号: {{item.operatorUser}}</div>
              <div>采购物料: </div>
              <div>采购数量: {{item.qty}}</div>
              <div>订单状态: {{item.status | formatStockTakeStatus}}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div class="confirm">
              <div
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findStockTakeDetail(item)"
              >详情</div>
            </div>
          </div>

          <!-- 状态5 -->
          <div class="content">
            <div>
              <div>订单编号: {{item.operatorUser}}</div>
              <div>采购物料: </div>
              <div>采购数量: {{item.qty}}</div>
              <div>订单状态: {{item.status | formatStockTakeStatus}}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div class="confirm">
              <div
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findStockTakeDetail(item)"
              >详情</div>
            </div>
          </div>
          <!-- 状态6 -->
          <div class="content">
            <div>
              <div>订单编号: {{item.operatorUser}}</div>
              <div>采购物料: </div>
              <div>采购数量: {{item.qty}}</div>
              <div>订单状态: {{item.status | formatStockTakeStatus}}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div class="confirm">
              <div
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findStockTakeDetail(item)"
              >详情</div>
            </div>
          </div>

        </div>
      </van-list>
      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findStockTakeList"
          style="height: 10rem"
        >
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {};
</script>