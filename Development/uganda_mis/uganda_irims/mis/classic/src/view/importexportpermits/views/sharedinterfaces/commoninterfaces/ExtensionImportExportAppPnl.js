
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.commoninterfaces.ExtensionImportExportAppPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'extensionimportexportapppnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    tbar: [{
                xtype: 'displayfield',
                name: 'process_name',
                value: 'Applications Reference and Previous Expiry date are only loaded for registered applications',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                }
            },'->',{
                xtype: 'button',
                name: 'reprint_pemit',
                text: 'Reprint Permit',
                ui: 'soft-green',
                iconCls: 'x-fa fa-print',
                handler: 'print_permit'
            }],
    items: [{
        xtype: 'importexportappextensionFrm',
        autoScroll: true,
        title: 'Extension Details'
    },
    {
        xtype: 'unstructureddocumentuploadsgrid',
        title: 'Documents',
        listeners: {
            beforerender: 'setApplicationsDocument'
        }
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


