
Ext.define('Admin.view.revenuemanagement.views.panels.AdhocInvoiceRequestPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'adhocinvoicerequestpnl',
    controller: 'revenuemanagementvctr',
    layout: 'fit',
    dockedItems: [{
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
                }, {
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    value: '******',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },{
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Reference No',
                    hidden: true,
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
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
                },{
                    xtype: 'hiddenfield',
                    name: 'active_application_code'
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
                    name: 'status_type_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'applicant_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'invoice_id'
                },
            ]
        }
    ],
    items: [{
                xtype: 'applicantdetailsfrm',
                title:'Applicant Details',
            },{
                xtype: 'adhocinvoiceotherdetailsFrm',
                title: 'Other Details'
            }],

     bbar: ['->',
            {
                text: 'Save Details',
                iconCls: 'x-fa fa-check-square',
                name: 'saveother_invoice',
                action: 'submit',
                formBind: true,
                ui: 'soft-purple',
                handler: 'saveadhocInvoiceOtherDetails'
            },{
                text: 'Receive & Invoice Application',
                ui: 'soft-purple',
                iconCls: 'fa  fa-print',
                winWidth: '50%',
                storeID: 'adhocinvoicingprocessdashgridstr',
                winWidth: '30%',
                name: 'receive_invoicebtn',
                handler: 'receiveAndInvoiceOnlineApplicationDetailsFrmBtn'
            },'-',{
                xtype: 'button',
                ui: 'soft-purple',
                text: 'Print Invoice',
                name: 'print_invoice',
                iconCls: 'fa fa-print',
                report_type: 'Invoice',
                handler: 'printInvoice'
            },'-',{
                xtype: 'button',
                ui: 'soft-purple',
                text: 'Submit Application',
                iconCls: 'x-fa fa-send',
                storeID: 'adhocinvoicingprocessdashgridstr',
                table_name: 'tra_adhocinvoices_applications',
                winWidth: '50%',
                handler: 'showReceivingApplicationSubmissionWin'
            } 
        ]
        
});