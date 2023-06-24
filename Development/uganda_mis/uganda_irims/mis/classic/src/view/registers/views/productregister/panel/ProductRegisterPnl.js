Ext.define('Admin.view.registers.views.productregister.panel.ProductRegisterPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'productregisterpnl',
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
            value: 1
        },
      {
            xtype: 'productregisterfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'productregistergrid',
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
            text: 'Export Register',
            iconCls: 'x-fa fa-cloud-upload', 
            handler: 'exportProductRegister'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Gazzete',
             iconCls: 'x-fa fa-print',
             handler: 'printProductGazzete'
            
            
        }

       
    ]
     }
    ],

 });