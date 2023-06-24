/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.medicaldevices.MedicalDevnewAuditingPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevnewauditingpnl',
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
            },//drugproductdocuploadsgrid
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
                },  {
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
    items: [{
            title: 'Product Application & Auditing Uploads',
            region: 'center',
            xtype:'tabpanel', autoScroll: true,
            items: [{
                xtype: 'medicaldevicesproductsdetailspanel',
                autoScroll: true,
                title: 'Preview Product Details'
            },{
                title: '2nd Assessment Uploads',itemId:'auditing_panel',
                layout:'fit', margin:5,
                items:[{
                    xtype: 'productAuditingUploadsGrid',
                    
                }]
            },{
                title: 'Requests for Additional Information',
                xtype: 'applicationqueriesgrid'
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
                    text: 'Application Documents',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Application Documents',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Product Application Documents',
                    winWidth: '40%',
                    isReadOnly: 1,
                    document_type_id: '',
                    handler: 'showPreviousNonGridPanelUploadedDocs'
                }, {
                    text: '1st Assessment Reports',
                    ui: 'soft-purple', 
                    iconCls: 'fa fa-upload',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
               
                                    text: 'Comments',
                                    ui: 'soft-purple',
                                    iconCls: 'fa fa-weixin',
                                    childXtype: 'applicationprevcommentsgrid',
                                    winTitle: '1st Assessment Comments',
                                    winWidth: '60%',
                                    comment_type_id: 2,
                                    name: 'comments_btn',
                                    stores: '[]'
                            },
                            {
                                text: 'Documents/Reports',
                                iconCls: 'fa fa-upload',
                                childXtype: 'productDocUploadsGrid',
                                winTitle: '1st Assessment uploaded Documents',
                                winWidth: '60%', 
                                stores: '[]',
                                document_type_id: 8,
                                handler: 'showPreviousNonGridPanelUploadedDocs',
                                target_stage: 'evaluation',
                                isWin: 1
                            }
                        ]
                    }
                }, {
                    text: 'Sample Management',
                    ui: 'soft-purple', 
                    iconCls: 'fa fa-sliders',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: 'Sample Laboratory Analysis Request & Results',
                                iconCls: 'x-fa fa-bars',
                                childXtype: 'sampleanalysistestrequestspnl',
                                winTitle: 'Sample Analysis Request',
                                winWidth: '90%', 
                                name: 'btnsample_analysis',
                                handler: 'showSampleAnalysisrequestswin',
                                stores: '[]'
                            }
                        ]
                    }
                },  {
                    text: 'Variation Requests ',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Variation Requests',
                    childXtype: '',
                    winTitle: 'Variation Requests',
                    winWidth: '60%',
                    name:'variation_requests',
                    hidden:true
                },{
                    text: 'Inspection/Quality Audit Status & Overall Recommendation',
                    ui: 'soft-purple', 
                    iconCls: 'fa fa-sliders',
                    menu: {
                        xtype: 'menu',
                        items: [{
                            text: 'Inspection/Quality Audit Inspection Status',
                            ui: 'soft-purple',
                            iconCls: 'fa fa-weixin',
                            childXtype: 'productgmpinspectionstatusfrm',
                            winTitle: 'Inspection/Quality Audit Inspection Status',
                            winWidth: '50%',
                            table_name:'tra_productgmp_inspectionstatuses',
                            handler: 'showAddProductGmpInspectionStatusWin',
                            stores: '[]'
                        }, {
                            text: '2nd Assessments Recommendation & Comments',
                            ui: 'soft-purple', 
                            iconCls: 'fa fa-weixin',
                            childXtype: 'applicationcommentspnl',
                            winTitle: '2nd Assessments Process Comments',
                            winWidth: '60%',
                            name:'prev_comments',
                            comment_type_id: 3,
                            stores: '[]'
                        }]
                    }
                }, '->', {
                    text: 'Submit Application',
                    ui: 'soft-purple', 
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'productregistrationstr',
                    table_name: 'tra_product_applications',
                    winWidth: '50%'
                }]
            }]
        
});