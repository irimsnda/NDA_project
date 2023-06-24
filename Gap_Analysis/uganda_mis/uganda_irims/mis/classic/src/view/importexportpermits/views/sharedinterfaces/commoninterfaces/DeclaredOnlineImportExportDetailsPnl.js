
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.DeclaredOnlineImportExportDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'declaredonlineimportexportdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'declaredonlineimportexportdetailsfrm',
        autoScroll: true,
        title: 'Import/Export Permit Information'
    }, {
        xtype: 'declaredonlineimportexportpermitsproductsgrid',
        title: 'Import/Export Permit Products Details',
    },  {
        xtype: 'senderreceiverdetailsfrm',
        title: 'Sender/Receiver Details',
    }, {
        xtype: 'importexportpremisesfrm',
        hidden: true,
        title: 'Premises Details',
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});