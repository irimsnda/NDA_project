Ext.define('Admin.view.registers.views.importexportregister.panel.ImportExportRegisterPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'importexportregisterpnl',
    margin: 2,
    layout: 'border',
    controller: 'registerctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [
     {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 4
        },
      {
            xtype: 'importexportregisterfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'importexportregistergrid',
            region: 'center'
        }],
  bbar: [{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        items: [
         
        '->',
          {
            xtype:'button',
            ui: 'soft-green',
            filename: 'Import_&_Export_Register.Xlsx',
            heading: 'Import & Export Register',
            text: 'Export Register',
            iconCls: 'x-fa fa-cloud-upload', 
            handler: 'exportImportExportRegister'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Register',
            filename: 'Import_&_Export_Register.pdf',
            heading: 'Import & Export Register',
            title: 'Import and Export Register',
            iconCls: 'x-fa fa-print',
            handler: 'printImportExportRegister'
            
            
        }

       
    ]
     }
    ],

 });