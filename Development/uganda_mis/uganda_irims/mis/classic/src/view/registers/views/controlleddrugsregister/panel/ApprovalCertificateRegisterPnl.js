Ext.define('Admin.view.registers.views.controlledrugsregister.panel.ApprovalCertificateRegisterPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'approvalcertificateregisterpnl',
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
            xtype: 'approvalcertificateregisterfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'approvalcertificateregistergrid',
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
            filename: 'Controlled_Drugs_Certificate_of_Approval.Xlsx',
            heading: 'Controlled Drugs Certificate of Approval Applications Register',
            function:'getImportExportRegister',
            text: 'Export Register',
            iconCls: 'x-fa fa-cloud-upload', 
            handler: 'exportApprovalCertificateRegister'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Register',
            filename: 'Controlled_Drugs_Certificate_of_Approval.pdf',
            heading: 'Order for Supply Of Dangerous Drugs Applications Register',
            title: 'Controlled Drugs Certificate of Approval Applications Register',
            iconCls: 'x-fa fa-print',
            handler: 'printApprovalCertificateRegister'
            
            
        }

       
    ]
     }
    ],

 });