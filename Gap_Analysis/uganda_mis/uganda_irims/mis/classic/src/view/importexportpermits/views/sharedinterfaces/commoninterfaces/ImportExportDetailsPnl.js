
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.ImportExportDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'importexportdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    listeners: {
        tabchange: 'funcActiveImportOtherInformationTab'
    },
    items: [{
            xtype: 'panel',
            autoScroll: true, 
            title: 'Application Details(Permit, Sender/Receiver, Premises Licenses Outlets)',
            items:[{
                xtype: 'importexportdetailsfrm',
                autoScroll: true,
                title: 'Application Details', 
                title: 'Import/Export Permit Information'
            },  {
                xtype: 'senderreceiverdetailsfrm',
                title: 'Sender/Receiver Details',
            },{
                xtype: 'importexportpremisesfrm',
                title: 'Licensed Outlet Details',
            }]
        },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


