
/**
 * Created by Softclans on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.OrderSupplyDangerousGoodsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'ordersupplydangerousgoodsdetailspnl',
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
        xtype: 'senderreceiverdetailsfrm',
        title: 'Supplier Details',
    }, {
        xtype: 'ordersupplydangerousgoodproductsgrid',
        title: 'Drugs Products Details',
    },  {
        xtype: 'importexportpremisesfrm',
        hidden: true,
        title: 'Registered Outlet Details'
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});