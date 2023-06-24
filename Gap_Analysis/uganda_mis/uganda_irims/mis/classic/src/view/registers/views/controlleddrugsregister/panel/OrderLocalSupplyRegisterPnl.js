Ext.define('Admin.view.registers.views.controlledrugsregister.panel.OrderLocalSupplyRegisterPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'orderlocalsupplyregisterpnl',
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
            xtype: 'localsupplyregisterfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'localsupplyregistergrid',
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
            filename: 'Order_for_local_of_dangerous_drugs_Register.Xlsx',
            heading: 'Order for Supply Of Dangerous Drugs Applications Register',
            function:'getImportExportRegister',
            text: 'Export Register',
            iconCls: 'x-fa fa-cloud-upload', 
            handler: 'exportLocalSupplyRegister'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Register',
            filename: 'Order_for_local_of_dangerous_drugs_Register.pdf',
            heading: 'Order for Supply Of Dangerous Drugs Applications Register',
            title: 'Order for Supply Of Dangerous Drugs Applications Register',
            iconCls: 'x-fa fa-print',
            handler: 'printLocalSupplyRegister'
            
            
        }

       
    ]
     }
    ],

 });