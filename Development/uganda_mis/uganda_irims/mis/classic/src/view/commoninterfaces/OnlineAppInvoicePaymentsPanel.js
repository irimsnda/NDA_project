Ext.define('Admin.view.commoninterfaces.OnlineAppInvoicePaymentsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'onlineappinvoicepaymentspanel',
    layout: {
        type: 'fit'
    },
    defaults: {
        split: true
    },
    dockedItems: [ {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            margin: 2,
            items: ['->',{
                text: 'Generate Invoice',
                iconCls: 'x-fa fa-credit-card',
                ui: 'soft-purple',
                menu:{
                    xtype: 'menu',
                    items:[
                        {
                            text: 'Generate Invoice (Normal Track)',
                            application_feetype_id: 1,  
                            ui: 'soft-purple',
                            winTitle: 'Generate Invoice(Normal Track)',
                            winWidth: '60%', 
                            fasttrack_option_id: 2,
                            viewType: 'onlineapplicationgenerateinvoicesgrid',
                            name: 'generate_invoice'
                
                        },{
                            text: 'Generate Invoice (Fast Track Double Charges)',
                            application_feetype_id: 1,
                            fasttrack_option_id: 1,  ui: 'soft-green',
                            winTitle: 'Generate Invoice (Fast Track Double Charges)',
                            winWidth: '60%',
                            
                            viewType: 'onlineapplicationgenerateinvoicesgrid',
                            name: 'generate_invoice'
                        }
                    ]
                }
             }]
    }],
  
    items:[{
        xtype:'tabpanel',
        items:[{
            title: 'Proforma Invoice Details',
            xtype: 'onlinepaymentinvoicingcostdetailsgrid',
            features:[{
                ftype:'searching'
            }]
        },{
            xtype:'tabpanel',
            title: 'Payments Details',
            items:[{
                title: 'Upload the Proof of Payment',
                scrollable: true,
                layout: 'fit',
                xtype: 'uploadedapplicationpaymentsgrid',
                features:[{
                    ftype:'searching'
                }]
             },{
                title: 'Payments/Receipting',
                scrollable: true,
                layout: 'fit',
                xtype: 'onlineapplicationpaymentsgrid',
               features:[{
                   ftype:'searching'
               }]
            }]
        }]
    }
    ]
});