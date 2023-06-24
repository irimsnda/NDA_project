Ext.define('Admin.view.registers.views.controlledrugsregister.panel.ControlledDrugsImportPermitRegisterPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'controlleddrugsimportpermitregisterpnl',
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
            value: 12
        },
      {
            xtype: 'controlleddrugsimportpermitregisterfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'controlleddrugsimportpermitregistergrid',
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
            filename: 'Controlled_Drugs_Import_Permit.Xlsx',
            heading: 'Controlled Drugs Import Permit Applications Register',
            function:'getImportExportRegister',
            text: 'Export Register',
            iconCls: 'x-fa fa-cloud-upload', 
            handler: 'exportControlledDrugsImportPermitRegister'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Register',
            filename: 'Controlled_Drugs_Import_Permit.pdf',
            heading: 'Controlled Drugs Import PermitRegister',
            title: 'Controlled DrugsI Import Permit Register',
            iconCls: 'x-fa fa-print',
            handler: 'printControlledDrugsImportPermitRegister'
            
            
        }

       
    ]
     }
    ],

 });