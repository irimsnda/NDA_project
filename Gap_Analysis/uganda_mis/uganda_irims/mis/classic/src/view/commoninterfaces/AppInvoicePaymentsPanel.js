Ext.define('Admin.view.commoninterfaces.AppInvoicePaymentsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'appinvoicepaymentspanel',
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
                            viewType:'applicationgenerateinvoicespnl',
                            name: 'generate_invoice'
                
                        },{
                            text: 'Generate Invoice (Fast Track Double Charges)',
                            application_feetype_id: 1,
                            fasttrack_option_id: 1,  ui: 'soft-green',
                            winTitle: 'Generate Invoice (Fast Track Double Charges)',
                            winWidth: '60%',
                            viewType:'applicationgenerateinvoicespnl',
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
            xtype: 'paymentinvoicingcostdetailsgrid',
            application_feetype_id: 9,  
            features:[{
                ftype:'searching'
            }]
        },{
            title: 'Customer Proof of Payments',
            xtype: 'uploadedapplicationpaymentsgrid'
        },{
            title: 'Payments/Receipting',
            scrollable: true,
            layout: 'fit',
            hidden: true,
            xtype: 'applicationpaymentsgrid',
           features:[{
               ftype:'searching'
           }]
        }]
    }
    ]
});