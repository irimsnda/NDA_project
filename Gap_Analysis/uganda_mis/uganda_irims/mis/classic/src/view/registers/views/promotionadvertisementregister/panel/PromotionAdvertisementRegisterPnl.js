Ext.define('Admin.view.registers.views.promotionadvertisementregister.panel.PromotionAdvertisementRegisterPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'promotionadvertisementregisterpnl',
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
            value: 14
        },
      {
            xtype: 'promotionadvertisementregisterfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'promotionadvertisementregistergrid',
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
            handler: 'exportPromotionAdvertisementRegister'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Register',
            iconCls: 'x-fa fa-print',
            handler: 'printPromotionAdvertisementRegister'
            
            
        }

       
    ]
     }
    ],

 });