
/**
 * Created by Softclans on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.OnlineControlDrugsLicDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinecontroldrugslicdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'controldrugslicensedetailsfrm',
        autoScroll: true,
        title: 'Controlled Drugs License Information'
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