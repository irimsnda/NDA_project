
/**
 * Created by Softclans on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.OnlineControlDrugsImpDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinecontroldrugsimpdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'controldrugsimpdetailsfrm',
        autoScroll: true,
        title: 'Import Permit Information'
    }, {
        xtype: 'onlinecontrolledpermitsproductsgrid',
        title: 'Controll Drugs Products Details',
    },  {
        xtype: 'senderreceiverdetailsfrm',
        title: 'Consignor Details',
    }, {
        xtype: 'importexportpremisesfrm',
        title: 'Registered Outlet Details'
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});