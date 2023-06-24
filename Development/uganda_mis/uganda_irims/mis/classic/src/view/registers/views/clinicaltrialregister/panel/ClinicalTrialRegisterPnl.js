Ext.define('Admin.view.registers.views.clinicaltrialregister.panel.ClinicalTrialRegisterPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialregisterpnl',
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
            value: 7
        },
      {
            xtype: 'clinicaltrialregisterfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'clinicaltrialregistergrid',
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
            handler: 'exportClinicalTrialRegister'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Register',
            iconCls: 'x-fa fa-print',
            handler: 'printClinicalTrialRegister'
            
            
        }

       
    ]
     }
    ],

 });