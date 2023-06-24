Ext.define('Admin.view.commoninterfaces.ReinvoicingPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'reinvoicingpanel',
    controller: 'commoninterfacesVctr',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        ui: 'footer',
        name: 'topBarPnl',
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
                fieldLabel: 'App Status',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            },{
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
                fieldLabel: 'Ref No',
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
            }, {
                xtype: 'hiddenfield',
                name: 'active_application_code'
            }, {
                xtype: 'hiddenfield',
                name: 'application_status_id'
            }, {
                xtype: 'hiddenfield',
                name: 'module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            },{
                xtype: 'hiddenfield',
                name: 'invoice_request_type_id'
            }
        ]
    }],
    items:[{
            title: 'Reinvoicing Details',
            region: 'north',
            width: 200,
            name: 'other_details',
          //  collapsed: true,
            collapsible: true,
            titleCollapse: true,
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 5,
                    layout: 'column',
                    defaults: {
                        margin: 2,
                        labelAlign: 'top',
                        columnWidth: 0.5
                    },
                    fieldDefaults: {
                        fieldStyle: {
                            'color': 'green',
                            'font-weight': 'bold'
                        }
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Invoice Request Type',
                            name: 'invoice_request_type'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Invoice Request Details',
                            name: 'invoice_details'
                        },
                        {
                            xtype: 'toolbar',
                            ui: 'footer',
                            columnWidth: 1,
                            items: [{xtype:'tbfill'},
                                {
                                    text: 'View Application Details',
                                    iconCls: 'fa fa-bars',
                                    name: 'more_app_details',
                                    isReadOnly: 1,
                                    is_temporal: 0
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'tabpanel',
            region: 'center',
            layout: 'fit',
            items: [{
                title: 'Raised Invoices',
                xtype: 'reinvoicingdetailsgrid'
            }],
            
        },
        
        {
            xtype: 'toolbar',
            ui: 'footer',
            region: 'south',
            height: 45,
            split: false,
            items: [
                
                '->',{
                    xtype: 'button',
                    text: 'Re-Invoice',
                    iconCls: 'x-fa fa-credit-card',
                    ui: 'soft-purple',
                    application_feetype_id: 1,
                    winTitle: 'Generate Invoice',
                    winWidth: '60%',
                    name: 'generate_invoice'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    hidden: true,
                    name: 'process_submission_btn',
                    storeID: 'commonuseregistrationstr',
                    table_name: 'tra_premises_applications',
                    winWidth: '50%'
                }
            ]
        }
    ]
});