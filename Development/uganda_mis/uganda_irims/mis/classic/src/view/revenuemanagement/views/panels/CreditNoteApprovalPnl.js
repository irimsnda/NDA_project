
/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.panels.CreditNoteApprovalPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'creditnoteapprovalpnl', 
    controller: 'revenuemanagementvctr',
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
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Reference No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },  {
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
                }, {
                    xtype: 'hiddenfield',
                    name: 'cancellation_id'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'panel',
            layout: 'border',
            items:[{
                    xtype: 'creditnoteapprovalpnlfrm',
                    height: 350,
                    region: 'north',
                    collapsible: true,
                    
            },{
                xtype:'tabpanel',
                layout:'fit',region: 'center',
                items:[{
                    xtype: 'revmanagementinvoicingcostdetailsgrid',
                    title:'Invoice Costs Details',
                    
                },{
                    xtype: 'revrequestpaymentdetailsgrid',
                    title:'Payments Details'
                }]
            }],
        }
    ],
    bbar:['->',  {
        text: 'Approve Credit Note Request(Payment Waiver)',
        ui: 'soft-purple',
        iconCls: 'fa fa-check',
        storeId:'wavepaymentmanagementdashgridstr',
        action_url: 'revenuemanagement/approveCreditNoteRequest',
        confirm_title : 'Approve Credit Note Request',
        handler:'funcApproveCancellationRequest',
        winWidth: '35%'
    },{
        //reject

    }]

});