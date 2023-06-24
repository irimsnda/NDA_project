
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.QueryResponseClinicalTrial', {
    extend: 'Ext.panel.Panel',
    xtype: 'queryResponseclinicaltrial',
    itemId: 'queryResponseclinicaltrialId',
    controller: 'clinicaltrialvctr',
    viewModel: 'clinicaltrialvm',
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            //height: 40,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:11px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                hidden: true,
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator'
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
                xtype: 'tbseparator'
            }, {
                xtype: 'displayfield',
                hidden: true,
                name: 'application_status',
                fieldLabel: 'App Status',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator'
            }, {
                xtype: 'displayfield',
                name: 'tracking_no',
                hidden: true,
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator'
            }, {
                xtype: 'displayfield',
                name: 'reference_no',
                hidden: true,
                fieldLabel: 'Ref No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
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
            }, {
                xtype: 'hiddenfield',
                name: 'premise_id'
            }, {
                xtype: 'hiddenfield',
                name: 'applicant_id'
            },{
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Application Details',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'reference_no',
                            hidden: false,
                            readOnly: true,
                            columnWidth: 0.9
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            hidden: false,
                            text: 'Search',
                            tooltip: 'Select Application',
                            name: 'select_applications',
                            childXtype: 'allclinicaltrialappgrid',
                            winTitle:'Clinical Trial Applications',
                            winWidth:'70%',
                            handler: 'showApplicationsSelectionList',
                            origin: 'queryResponseclinicaltrialId'
                        }
                    ]
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'queryResponseclinicaltrialwizard'
        }
    ]
});