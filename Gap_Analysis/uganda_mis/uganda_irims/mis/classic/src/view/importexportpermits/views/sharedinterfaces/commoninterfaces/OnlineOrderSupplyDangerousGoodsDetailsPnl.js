
/**
 * Created by Softclans on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.OnlineOrderSupplyDangerousGoodsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlineordersupplydangerousgoodsdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'ordersupplydangerousgooddetailsfrm',
        autoScroll: true,
        title: 'Application Information'
    }, {
        xtype: 'onlineordersupplydangerousgoodproductsgrid',
        title: 'Drugs Products Details',
    },  {
        xtype: 'senderreceiverdetailsfrm',
        title: 'Supplier Details',
    }, {
        xtype: 'importexportpremisesfrm',
        hidden: true,
        title: 'Registered Outlet Details'
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});