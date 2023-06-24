/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.productnotification.views.sharedinterfaces.panels.products.MedicalDevicesNotificationAssessmentPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesnotificationassessmentpnl',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
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
                    fieldLabel: 'Ref No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },{
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
                    name: 'product_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'applicant_id'
                }
            ]
        }
    ],
    items: [
        {
            title: 'Evaluation/Assessment Uploads',
            region: 'center',
            layout: 'fit',
            items: [{
                xtype: 'productnotificationevaluationuploadsgrid'
            }]
        },
        {
            title: 'Other Details',
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
                            fieldLabel: 'Product Details',
                            name: 'product_details'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'toolbar',
            ui: 'footer',
            region: 'south',
            height: 45,
            split: false,
            defaults: {
                margin: 5
            },
            items: [{
                xtype: 'transitionsbtn'
            },
            {
                text: 'Preview & Edit Medical Devices Details',
                ui: 'soft-purple',
                iconCls: 'fa fa-edit',
                isReadOnly: 0,
                winTitle: 'Medical Devices Details',
                winWidth: '60%',
                name: 'more_app_details',
                stores: '[]'
            },
            {
                text: 'Add Overrall Comments',
                ui: 'soft-purple',
                iconCls: 'fa fa-weixin',
                childXtype: 'evaluationcommentspnl',
                winTitle: 'Audit Process Comments',
                winWidth: '60%',
                handler: 'showAddProductRegParamWinFrm',
                stores: '[]'
            },{
                text: 'Raise Query(s)',
                ui: 'soft-purple',
                iconCls: 'fa fa-weixin',
                childXtype: 'applicationunstructuredqueriesgrid',
                winTitle: 'Product Application Queries',
                winWidth: '80%',
                handler: 'showAddProductUnstructuredQueriesWin',
                stores: '[]'
            },'->', {
                text: 'Submit Application',
                ui: 'soft-purple',
                iconCls: 'fa fa-check',
                name: 'process_submission_btn',
                storeID: 'productregistrationstr',
                table_name: 'tra_product_notifications',
                winWidth: '50%'
            }
            ]
        }
    ]
});