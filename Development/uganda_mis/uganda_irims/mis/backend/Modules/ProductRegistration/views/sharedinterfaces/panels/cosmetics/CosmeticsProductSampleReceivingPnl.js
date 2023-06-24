/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.cosmetics.CosmeticsProductSampleReceivingPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'cosmeticsproductsamplereceivingpnl',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    layout: 'border',
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
                xtype: 'tbspacer',
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
                xtype: 'tbspacer',
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
                xtype: 'tbspacer',
                width: 20
            },  {
                xtype: 'displayfield',
                name: 'tracking_no',
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            },{
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
                name: 'module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            }, {
                xtype: 'hiddenfield',
                name: 'application_status_id'
            }
        ]
    }
    ],

    items: [{
        xtype: 'cosmeticssamplereceivingwizard',
        region: 'center'
    }, {
        title: 'Application & Local Technical Representative Details',
        region: 'east',
        width: 400,
        collapsed: true,
        collapsible: true,
        titleCollapse: true,
        items: [
            {
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    margin: 2,
                    labelAlign: 'top'
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
                        fieldLabel: 'Applicant Details',
                        name: 'applicant_details'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Local Agent details',
                        name: 'local_agentdetails'
                    }
                ]
            }
        ]
    }
    ]
});