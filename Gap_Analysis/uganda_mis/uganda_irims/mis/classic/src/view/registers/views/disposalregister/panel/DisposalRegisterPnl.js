Ext.define('Admin.view.registers.views.disposalregister.panel.DisposalRegisterPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'disposalregisterpnl',
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
            value: 15
        },
      {
            xtype: 'disposalregisterfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'disposalregistergrid',
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
            filename: 'Disposal_Register.Xlsx',
            heading: 'Disposal Register',
            text: 'Export Register',
            function:'getDisposalRegister',
            iconCls: 'x-fa fa-cloud-upload', 
            handler: 'exportDisposalRegister'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Register',
            filename: 'Disposal_Register.pdf',
            heading: 'Disposal Register',
            title: 'Disposal Register',
            iconCls: 'x-fa fa-print',
            handler: 'printDisposalRegister'
            
            
        }

       
    ]
     }
    ],

 });