/**
 * Created by Kip on 10/19/2018.
 */
Ext.define('Admin.view.premiseregistration.views.maininterfaces.new.OnlineFoodReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'onlinefoodreceiving',
    controller: 'premiseregistrationvctr',
    viewModel: 'premiseregistrationvm',
    layout: 'fit',
    height: 550,
    dockedItems: [
        {
            hidden: true,
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 35,
            defaults: {
                labelAlign: 'right',
                labelStyle: "color:#595959;font-size:12px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                value: '****',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '14px'
                }
            }, {
                xtype: 'tbspacer'
            }, {
                xtype: 'displayfield',
                name: 'workflow_stage',
                fieldLabel: 'Workflow Stage',
                value: '****',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '14px'
                }
            }, {
                xtype: 'tbspacer'
            }, {
                xtype: 'displayfield',
                name: 'application_status',
                fieldLabel: 'App Status',
                value: '****',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '14px'
                }
            }, {
                xtype: 'tbspacer'
            }, {
                xtype: 'displayfield',
                name: 'reference_no',
                value: '****',
                fieldLabel: 'Ref No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '14px'
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
            },{
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
            }
            ]
        }
    ],
    items: [
        {
            xtype: 'foodnewonlinereceivingwizard'
        }
    ]
});