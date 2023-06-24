Ext.define('Admin.view.registers.views.premisesregister.panel.PremisesRegisterPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'premisesregisterpnl',
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
            value: 2
        },
      {
            xtype: 'premisesregisterfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'premisesregistergrid',
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
            handler: 'exportPremiseRegister'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Register',
            iconCls: 'x-fa fa-print',
            handler: 'printPremisesRegister'
            
            
        }

       
    ]
     }
    ],

 });