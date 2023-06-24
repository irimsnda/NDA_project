Ext.define('Admin.view.registers.views.gmpregister.panel.GmpRegisterPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'gmpregisterpnl',
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
            value: 3
        },
         {
            xtype: 'hiddenfield',
            name: 'gmp_location',
            value: 2
        },
      {
            xtype: 'gmpregisterfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'gmpregistergrid',
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
            filename: 'GMP_Register.Xlsx',
            heading: 'GMP Register',
            function:'getGmpRegister',
            text: 'Export Register',
            iconCls: 'x-fa fa-cloud-upload', 
            handler: 'exportGmpRegister'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Register',
            filename: 'GMP_Register.pdf',
            heading: 'GMP Register',
            title: 'GMP Register',
            iconCls: 'x-fa fa-print',
            handler: 'printGmpRegister'
            
            
        }

       
    ]
     }
    ],

 });