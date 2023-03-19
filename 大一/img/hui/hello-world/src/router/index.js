import { initRouter, initRouterLayout } from '@hsui/core'

// 申购
import Purchase from '../components/Purchase'
import PurchaseSuccess from '../components/PurchaseSuccess'
// 赎回
import Redeem from '../components/RedeemMessage'
// 开户
import Risk from '../components/Risk'
import RiskResult1 from '../components/RiskResult1'
import RiskResult2 from '../components/RiskResult2'
import RiskResult3 from '../components/RiskResult3'
import RiskResult4 from '../components/RiskResult4'
import RiskResult5 from '../components/RiskResult5'
//产品管理
import Manage from '../components/Manage'
import ManageTrend from '../components/ManageTrend'
// 查询
import Inquiry from '../components/Inquiry'


export default initRouter(
    [
        {
            path: '/',
            component: initRouterLayout(layout => {
                return import('@/layouts/' + layout + '.vue')
            }),
            children: [
                {
                    name: 'index',
                    path: '',
                    component: Index,
                    children: [
                        {
                            name: 'index-home',
                            path: 'home',
                            component: IndexHome
                        },

                    ]
                },
                //申购
                {
                    path: 'purchase',
                    component: Purchase
                },
                {
                  path: 'purchaseSuccess',
                  component: PurchaseSuccess
                },
                //赎回
                {
                    path: 'redeem',
                    component: Redeem
                },
                
                //开户
                {
                    path: 'open',
                    component: Risk
                },
                {
                    path: 'riskResult1',
                    component: RiskResult1
                },
                {
                    path: 'riskResult2',
                    component: RiskResult2
                },
                {
                    path: 'riskResult3',
                    component: RiskResult3
                },
                {
                    path: 'riskResult4',
                    component: RiskResult4
                },
                {
                    path: 'riskResult5',
                    component: RiskResult5
                },
                //产品管理
                {
                    path: 'manage',
                    component: Manage
                },
                {
                  path: 'manageTrend',
                  component: ManageTrend
                },
                //查询
                {
                    path: 'inquiry',
                    component: Inquiry
                },

                {
                    name: '__404__',
                    path: '*',
                    component: __404__
                },

            ]
        }
    ],
    { base: '/', mode: 'hash' }
)

function Index() {
    return import(/* webpackChunkName: "index" */ '@/views/index.vue')
}
function IndexHome() {
    return import(/* webpackChunkName: "index-home" */ '@/views/index/home.vue')
}
function __404__() {
    return import(/* webpackChunkName: "__404__" */ '@/views/__404__.vue')
}
