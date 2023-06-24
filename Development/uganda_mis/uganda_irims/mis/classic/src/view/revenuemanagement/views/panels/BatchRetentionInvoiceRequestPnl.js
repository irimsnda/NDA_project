
/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.panels.BatchRetentionInvoiceRequestPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'batchretentioninvoicerequestpnl',
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
    bbar:['->',{
        text:'Save Batch Invoice Detail',
        iconCls: 'x-fa fa-save',
        ui: 'soft-green',
        batchinvoice_type_id:2,
        action_url:'revenuemanagement/saveBatchInvoiceDetails',
        handler:'funcSaveBatchInvoiceDetails'
    },{
        text:'Print Invoice Statement',
        iconCls: 'x-fa fa-save',
        ui: 'soft-green',
        handler:'funcPrintRetentionBatchInvoiceStatement'
    }],
    items: [{
            xtype: 'panel',
            title: 'Bills/Invoicing',
            layout: 'border',
            items:[{
                xtype: 'batchinvoicerequestpnlfrm',
                height: 200,
                region: 'north',
                title:'Batch Invoice Request Details',
                collapsible: true
            },{
                xtype: 'batchinvoicerequestgrid',
                title:'Invoice Details',
                region: 'center',
                tbar:[{
                    text:'Add Retention Invoice to Batch',
                    iconCls: 'x-fa fa-plus',
                    handler:'funcAppInvoiceDetailstoBatch',
                    ui: 'soft-green',
                    childXtype: 'linkretentioninvoicesgrid',
                    winTitle: 'Link Retention Application Invoice',
                    winWidth: '80%',
                    stores: '[]'
                },{
                    text:'Unlink Invoices from Batch',
                    iconCls: 'x-fa fa-cancel',
                    handler:'funcUnlinkInvoiceDetailsfromBatch',
                    name:'btnunlinkbatchinvoice',
                    ui: 'soft-green',
            
                    
                }],
            }]
        }
    ]
});