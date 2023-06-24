/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.main.GmpInspectionScheduling', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpinspectionscheduling',
    controller: 'gmpapplicationsvctr',
    viewModel: 'gmpapplicationsvm',
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 40,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:11px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                hidden: true
            }, {
                xtype: 'displayfield',
                name: 'gmp_type_txt',
                hidden: true,
                fieldLabel: 'GMP Type',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                hidden: true
            }, {
                xtype: 'displayfield',
                name: 'workflow_stage',
                hidden: true,
                fieldLabel: 'Workflow Stage',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                hidden: true
            }, {
                xtype: 'displayfield',
                name: 'application_status',
                hidden: true,
                fieldLabel: 'App Status',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                hidden: true
            },{
                xtype: 'displayfield',
                hidden: true,
                name: 'tracking_no',
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                hidden: true
            }, {
                xtype: 'displayfield',
                name: 'reference_no',
                fieldLabel: 'Reference No',
                hidden: true,
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbspacer'
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
                name: 'premise_id'
            },{
                xtype: 'hiddenfield',
                name: 'manufacturing_site_id'
            }, {
                xtype: 'hiddenfield',
                name: 'applicant_id'
            }, {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            }, {
                xtype: 'hiddenfield',
                name: 'gmp_type_id'
            }
            ]
        }
    ],
    items: [
        {
            xtype: 'gmpinspectionschedulingpanel'
        }
    ]
});