
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.DeclaredInspectionImportExportDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'declaredinspectionimportexportdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'declaredimportexportdetailsfrm',
        autoScroll: true,
        title: 'Import/Export Permit Information'
    }, {
        xtype: 'senderreceiverdetailsfrm',
        title: 'Sender/Receiver Details',
    },{
        xtype: 'declaredonlineimportexportpermitsproductsgrid', autoScroll: true,
        title: 'Import/Export Permit Products Details',
    },  {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


