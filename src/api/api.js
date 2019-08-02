import {
  get,
  post
} from '@/util/http';
export const test = () => get('/');
// export const login = params => post('/login', params);
export const login = params => post('/rbac/mall/wxLogin', params);
export const loginOut = params => post('/auth/backLogin',params);
export const authorize = params => get('/auth/getAuthUrl',params);
//获取验证码
export const getVcode = params => post('/message/sendSmsVcode',params);
// 获取用户openid和token
export const getUser = params => get("/auth/getUserOpenIdAndSessionKey",params);
// 获取用户openid和token 无：给默认值
export const getUserAuth = params => get("/auth/getOpenId?extUserId=oYNm1vxJvmn-r3qMhkzEGwsmxe1Q",params)
// 获取用户信息
export const getUserInfo = params => get('/auth/getUserInfo',params);
// 获取统计数据
export const getTask = params => post("/order/getDefault",params)
export const reg = params => post('reg', params);
export const hotSale = () => post('hotsale');
export const saleGroup = () => post('salegroup');
export const discover = () => post('discover');
export const getCartCount = () => post('getCartCount');
export const getCart = () => post('getCart');
export const updateCartCount = params => post('updateCartCount', params);
export const addToCart = params => post('addToCart', params);
export const delFromCart = params => post('delFromCart', params);
export const getAddress = () => post('getAddress');
export const getOrder = () => post('getOrder');
export const createOrder = params => post('createOrder', params);
export const getGoodById = params => post('getGoodById', params);
export const listMessage = params => post('listMessage', params);
export const messageDetail = params => post('messageDetail', params);
//库存预警
export const dangerStorage = params => post('/order/stockUseNumLTMinStock', params);
// 出入库流水
export const stockDetailList = params => post('/order/stockDetailList', params);
// 预约单列表
export const findReserveOrderList = params => post('/storage/reserveOrder/findReserveOrderList', params);
// 预约明细单列表
export const findReserveOrderItemList = params => post('/storage/reserveOrderItem/findReserveOrderItemList', params);
// 得到预约单号
export const getReserveOrderNo = params => post('/storage/reserveOrder/getReserveOrderNo', params);
// 保存预约单
export const saveReserveOrder = params => post('/storage/reserveOrder/saveReserveOrder', params);
// 保存预约明细单
export const saveReserveOrderItem = params => post('/storage/reserveOrderItem/saveReserveOrderItem', params);
// 确认收货
export const confirmReserveOrderItem = params => post('/storage/reserveOrderItem/confirmReserveOrderItem', params);
// 入库单列表
export const findStockInList = params => post('/storage/stockIn/findStockInList', params);
// 入库单查询
export const getStockIn = params => post('/storage/stockIn/getStockIn', params);
// 入库单明细查询
export const findStockInItemList = params => post('/storage/stockIn/findStockInItemList', params);
//获得入库主单订单号
export const getStockInOrderNo = params => post('/storage/stockIn/getStockInOrderNo', params);
// 封盘后的列表
export const findCheckInItemList = params => post('/storage/checkIn/findCheckInItemList', params);
// 入库单上架
export const doToCell = params => post('storage/toCell/doToCell', params);
//保存入库主单
export const saveStockIn = params => post('/storage/stockIn/saveStockIn', params);
//保存入库主单
export const saveStockInItem = params => post('/storage/stockIn/saveStockInItem', params);
// 出库单列表
export const findStockOutList = params => post('/storage/stockOut/findStockOutList', params);
// 出库单查询
export const getStockOut = params => post('/storage/stockOut/getStockOut', params);
// 出库单明细查询
export const findStockOutItemList = params => post('/storage/stockOut/findStockOutItemList', params);
// 拣货单列
export const findGetStockOutList = params => post('/storage/stockOut/findStockOutList', params);
// 生产拣货单
export const saveStockLibrary = params => post('/storage/stockLibrary/saveStockLibrary', params);
// 拣货完成
export const getToLocationList = params => post('/storage/toLocation/getToLocationList', params);
// 下架
export const doToLocation = params => post('/storage/toLocation/doToLocation', params);
// 指定货位
export const toLocation = params => post('/storage/toLocation/toLocation', params);
// 仓库列表
export const findWareHouseList = params => post('ware/wareHouse/findWareHouseList', params);
// 根据货位号找货位
export const getCellByCode = params => post('/ware/cell/getCellByCode', params);
// 根据托盘号找托盘
export const getTrayByCode = params => post('/ware/tray/getTrayByCode', params);
// 库区列表
export const findWareAreaList = params => post('ware/wareArea/findWareAreaList', params);
// RFID绑定托盘
export const bindTrayWithRfid = params => post('/ware/tray/bindTrayWithRfid', params);
// 根据RFID找托盘
export const getTrayByRfid = params => post('/ware/tray/getTrayByRfid', params);
// 自动生成出库单
export const getStockOutOrderNo = params => post('/storage/stockOut/getStockOutOrderNo', params);
// RFID绑定货位
export const bindCellWithRfid = params => post('/ware/cell/bindCellWithRfid', params);
// 客户
export const findCustomerList = params => post('/crm/customer/findCustomerList', params);
// 货位移动
export const saveStockMove = params => post('/storage/stockMove/saveStockMove', params);
// 货位查库存明细
export const findStockLogByCell = params => post('/storage/stockLog/findStockLogByCell', params);
// 盘库主单订单号
export const getStockTakeOrderNo = params => post('/storage/stockTake/getStockTakeOrderNo', params);
// 保存盘点单
export const createStockTake = params => post('/storage/stockTake/createStockTake', params);
// 保存出库单
export const saveStockOut = params => post('/storage/stockOut/saveStockOut', params);
// 保存出库单明细
export const saveStockOutItem = params => post('/storage/stockOut/saveStockOutItem', params);
// 根据明细找货位
export const findToLocationByStockOutItemAndCell = params => post('/storage/toLocation/findToLocationsByStockOutItem', params);
// 已经入库的物料单
export const findStockList = params => post('/storage/stockOut/findStockList', params);
// 找到多个托盘
export const getStockLogsByTrays = params => post('/storage/stockTake/getStockLogsByTrays', params);
// 拣货
export const findToLocationByCellAndTray = params => post('/storage/toLocation/findToLocationByCellAndTray', params);
// 根据RFID找货位
export const getCellByRfid = params => post('/ware/cell/getCellByRfid', params);
// 货架列表
export const findPalletList = params => post('ware/pallet/findPalletList', params);
// 供应商列表
export const findSupplierList = params => post('crm/supplier/findSupplierList', params);
// 物料列表
export const findMaterielList = params => post('data/materiel/findMaterielList', params);
// 物料查询
export const getMateriel = params => post('data/materiel/getMateriel', params);
// 托盘列表
export const findTrayList = params => post('ware/tray/findTraylist', params);
// 确认封盘
export const confirmSealedTray = params => post('storage/checkIn/confirmSealedTray ', params);
// 托盘查询
export const getTray = params => post('ware/tray/getTray', params);
// 货位查询
export const getCell = params => post('ware/cell/getCell', params);
// 查流水的列表
export const findStockLogs = params => post('/storage/stockLog/findStockLogs', params);
// 空货位查询
export const findEmptyCell = params => post('ware/cell/findEmptyCell', params);
// 托盘封闭
export const sealedTray = params => post('/storage/checkIn/sealedTray', params);
// 找到多个托盘
export const findTraysByRfids = params => post('/ware/tray/findTraysByRfids', params);
// 盘点单列表
export const findStockTakeList = params => post('/storage/stockTake/findStockTakeList', params);
// 保存盘点明细 
export const createStockTakeItem = params => post('/storage/stockTake/createStockTakeItem', params);
// 盘点明细
export const findStockTakeItems = params => post('/storage/stockTake/findStockTakeItems', params);
// 扫描获取明细
export const getStockTakeItem = params => post('/storage/stockTake/getStockTakeItem', params);
// 保存盘点数量
export const saveStockTakeItem = params => post('/storage/stockTake/saveStockTakeItem', params);
// 通过托盘去找封盘的数量
export const getCheckInItemByTray = params => post('/storage/checkIn/getCheckInItemByTray', params);
// 获取已入库数量
export const getCheckedInQty = params => post('/storage/stockIn/getCheckedInQty', params);
// 配货单
export const findToLocationList = params => post('/storage/toLocation/findToLocationList', params);
