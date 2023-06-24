/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.ClinicalTrialProgressRptOnlinePreviewPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialprogressrptonlinepreviewpnl',
    controller: 'clinicaltrialvctr',
    viewModel: 'clinicaltrialvm',
    layout: 'fit',
    height: 550,
    dockedItems: [
        {
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
                name: 'application_status',
                fieldLabel: 'Application Status',
                value: '****',
                labelWidth: 300,
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '14px'
                }
            }, {
                xtype: 'tbspacer'
            }, {
                xtype: 'displayfield',
                name: 'tracking_no',
                value: '****',
                fieldLabel: 'Tracking No',
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
            },{
                xtype: 'hiddenfield',
                name: 'status_type_id'
            }
            ]
        }
    ],
    items: [
        {
            xtype: 'clinicaltrialprogressrptonlinepreviewwizard'
        }
    ]
});