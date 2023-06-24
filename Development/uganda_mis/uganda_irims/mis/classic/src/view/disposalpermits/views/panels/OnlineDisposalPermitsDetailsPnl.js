
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.disposalpermits.views.panels.OnlineDisposalPermitsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinedisposalpermitsdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'onlinedisposalpermitsdetailsfrm',
        autoScroll: true,
        title: 'Disposal Application Information'
    }, {
        xtype: 'disposalpermitsproductsgrid',
        title: 'Disposal  Products Details',
        listeners: {
            afterrender: {
                fn: 'setProductRegGridsStore',
                config: {
                    pageSize: 100000,
                    storeId: 'onlinedisposalpermitsproductsstr',
                   groupField:'sub_module',
                    proxy: {
                        url: 'importexportpermits/getOnlineDisposalpermitsproductsDetails'
                    }
                },
                isLoad: true
            }
        },
    },  {
        xtype: 'importexportpremisesfrm',
        title: 'Premises Details',
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});