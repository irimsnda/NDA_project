/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.food.NewFoodProductAuditingPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'newfoodproductauditingpnl',
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
            height: 35,
            defaults: {
                labelAlign: 'right',
                labelStyle: "color:#595959"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '16px'
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
                        'font-size': '16px'
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
                        'font-size': '16px'
                    }
                }, {
                    xtype: 'tbspacer',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Ref No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '16px'
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
            title: '2nd Assessment Uploads',
            region: 'center',
            layout: 'fit',
            items: [{
                xtype: 'productauditingchecklistsGrid',

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
                text: 'Preview & Edit Products Details',
                ui: 'soft-purple',
                iconCls: 'fa fa-edit',
                isReadOnly: 0,
                winTitle: 'Products Details',
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
            }, {
                text: 'Sample Management Requests',
                ui: 'soft-purple',
                iconCls: 'fa fa-sliders',
                menu: {
                    xtype: 'menu',
                    items: [
                        {
                            text: 'Sample Laboratory Analysis Request & Results',
                            iconCls: 'x-fa fa-bars',
                            childXtype: 'inspectiondetailstabpnl',
                            winTitle: 'Inspection Details',
                            winWidth: '60%',
                            name: 'inspection_details',
                            stores: '[]'
                        },
                        {
                            text: 'Sample Requisition',
                            iconCls: 'x-fa fa-weixin',
                            childXtype: 'evaluationcommentspnl',
                            winTitle: 'Sample Requisition',
                            winWidth: '60%',
                            name: 'prev_comments',
                            stores: '[]',
                            target_stage: 'inspection',
                            isWin: 1
                        }
                    ]
                }
            }, {
                text: 'Documents/Reports',
                ui: 'soft-purple',
                iconCls: 'fa fa-upload',
                childXtype: 'productDocUploadsGrid',
                winTitle: '1st Assessment  Documents',
                winWidth: '80%',
                handler: 'showApplicationEvaluationUploads',
                stores: '[]',
                isWin: 1
            }, {
                text: 'Save 1st Assessment Details',
                ui: 'soft-purple',
				hidden: true,
                iconCls: 'fa fa-save',
                name: 'save_btn'
            }, '->', {
                text: 'Submit Application',
                ui: 'soft-purple',
                iconCls: 'fa fa-check',
                name: 'process_submission_btn',
                storeID: 'drugproductregistrationstr',
                table_name: 'tra_product_applications',
                winWidth: '50%'
            }
            ]
        }
    ]
});