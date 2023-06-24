Ext.define('Admin.view.promotionmaterials.views.maininterfaces.panels.PromotionAdvertsEvaluationDocPanel', {
    extend: 'Ext.panel.Panel',
	record:1,
    xtype: 'promotionadvertsevaluationdocpanel',
    controller: 'promotionmaterialviewcontroller',
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
                }, {
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
           xtype:'tabpanel',
           layout:'fit',
           region: 'center',
           title:'Promotional and Advertisements Evaluation and details', 
           items:[{
                title: 'Evaluation/Assessment Review Report Uploads',
                itemId:'evaluation_panel',
                layout:'fit', margin:5,  
                xtype: 'productscreeninggrid'
           },{
                title: 'Evaluation Uploads',
                layout: 'fit',
                xtype: 'promotionmaterialsdocuploadsgenericgrid'
            },{
                    title:'Preview Promotional and Advertisements Details',
                    xtype:'promtionadvertspreviewdetailswizard'
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
                text: 'Preview Applications Documents(uploads)',
                iconCls: 'x-fa fa-file',
                tooltip: 'Application Documents',
                action: 'edit',
                childXtype: '',
                winTitle: 'Application Documents',
                winWidth: '60%',
                isReadOnly: 1,
                document_type_id: '',
                handler: 'showPreviousNonGridPanelUploadedDocs'
        },
            {
                text: 'Add Overrall Comments',
                ui: 'soft-purple', 
                iconCls: 'fa fa-weixin',
                childXtype: 'applicationcommentspnl',
                winTitle: 'Evaluation Process Comments',
                winWidth: '60%',
                name:'prev_comments',
                comment_type_id: 2,
                stores: '[]'
        }, 
            '->', {
                text: 'Submit Application',
                ui: 'soft-purple',
                iconCls: 'fa fa-check',
                name: 'process_submission_btn',
                storeID: 'promotionmaterialapplicationstr',
                table_name: 'tra_promotion_adverts_applications',
                winWidth: '50%'
            }
            ]
        }
    ]
});