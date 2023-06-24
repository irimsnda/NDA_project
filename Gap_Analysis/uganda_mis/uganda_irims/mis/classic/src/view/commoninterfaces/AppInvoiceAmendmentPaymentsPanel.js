Ext.define('Admin.view.commoninterfaces.AppInvoiceAmendmentPaymentsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'appinvoiceamendmentpaymentspanel',
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
                            application_feetype_id: 9,  
                            ui: 'soft-purple',
                            winTitle: 'Generate Invoice(Normal Track)',
                            winWidth: '60%', 
                            fasttrack_option_id: 2,
                            name: 'generate_invoice'
                
                        }
                    ]
                }
             }]
    }],
  
    items:[{
        xtype:'tabpanel',
        items:[{
            title: 'Invoice Details',
            xtype: 'paymentinvoicingcostdetailsgrid',
            application_feetype_id: 9,  
            features:[{
                ftype:'searching'
            }]
        },{
            title: 'Payments/Receipting',
            scrollable: true,
            layout: 'fit',
            xtype: 'applicationpaymentsgrid',
           features:[{
               ftype:'searching'
           }]
        }]
    }
    ]
});