
/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.panels.PaymentReversalRequestPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'paymentreversalrequestpnl',
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 60,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'workflow_stage',
                    fieldLabel: 'Workflow Stage',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'App Status',hidden: true,
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                },{
                    xtype: 'hiddenfield',
                    name: 'process_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'workflow_stage_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_id'
                },  {
                    xtype: 'hiddenfield',
                    name: 'application_status_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'sub_module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'section_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'product_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'applicant_id'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'panel',
            title: 'Bills/Invoicing',
            layout: 'border',
            tbar:['->',{
                text: 'Search Payment/Receipt Details',
                iconCls: 'fa fa-search',
                ui:'soft-green',
                handler: '',
                childXtype: 'applicationsearchpaymentsgrid',
                winTitle:' Payments Details',
                winWidth: '80%',
                handler:'funcSearchInvoiceDetails'
            }],
            items:[{
                    xtype: 'paymentsreversalrequestpnlfrm',
                    height: 300,
                    region: 'north',
                    collapsible: true,
                    
            },{
                    xtype: 'revmanagementinvoicingcostdetailsgrid',
                    title:'Invoice Costs Details',
                    region: 'center'
            }],
        
        }
    ],
    bbar:['->', {
        text: 'Submit for Payment Cancellation REquest',
        ui: 'soft-purple',
        iconCls: 'fa fa-check',
        name: 'process_submission_btn',
        storeID: '',
        table_name: '',
        winWidth: '50%'
    }]
});