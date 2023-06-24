
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.EditImportExportDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'editimportexportdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'editimportexportdetailsfrm',
        autoScroll: true,
        title: 'Import/Export Permit Information'
    }, 
    // {
    //     xtype: 'importexportpermitsproductsgrid',
    //     title: 'Import/Export Permit Products Details',
    //     readonly: true
    // },
    {
        xtype: 'senderreceiverdetailsfrm',
        title: 'Sender/Receiver Details',
    }, {
        xtype: 'importexportpremisesfrm',
        
        title: 'Premises Details',
        autoScroll: true,
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


