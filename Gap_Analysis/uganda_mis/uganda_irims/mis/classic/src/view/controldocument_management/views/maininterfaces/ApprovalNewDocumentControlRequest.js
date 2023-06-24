/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.controldocument_management.views.maininterfaces.ApprovalNewDocumentControlRequest', {
    extend: 'Ext.panel.Panel',
    xtype: 'approvalnewdocumentcontrolrequest',
    controller: 'controldocumentmanagementvctr',
    viewModel: 'controldocumentmanagementvm',
    layout: 'fit',
    is_readonly: true,
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
                'font-size': '13px'
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
                    'font-size': '13px'
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
                    'font-size': '13px'
                }
            }, {
                xtype: 'tbspacer',
                width: 20
            },  {
                xtype: 'displayfield',
                name: 'tracking_no',
                hidden: true,
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '13px'
                }
            },{
                xtype: 'displayfield',
                name: 'reference_no',
                fieldLabel: 'Document Reference No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '13px'
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
    }],
    items: [
        {
            xtype: 'approvalnewdoccontrolrequestpnl'
        }
    ]
});

