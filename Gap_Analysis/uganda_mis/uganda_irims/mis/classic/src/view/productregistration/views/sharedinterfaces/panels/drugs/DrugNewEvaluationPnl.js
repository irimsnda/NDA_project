/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.DrugNewEvaluationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugnewevaluationpnl',
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
            title: 'Product Application & 1st Assessment Uploads',
            region: 'center',
            xtype:'tabpanel', 
            autoScroll: true,
            items: [{
                xtype: 'drugsProductsDetailsPanel',
                autoScroll: true,
                 margin:5,
                itemId:'preview_productdetails',
                title: 'Preview Product Details'
            },{
                title: '1st Assessment Report Uploads',
                itemId:'evaluation_panel',
                xtype: 'tabpanel',
                layout:'fit', margin:5,
                items:[{
                    xtype: 'productEvaluationUploadsGrid',
                    title: '1st Assessment Report Uploads',
                },{
                    xtype: 'productscreeninggrid',
                    title: 'Application Screening & Recommendation',
                    
                    tbar:['->',{
                        xtype: 'button',
                        text: "Screening Query & Responses(Request for Information)",
                        tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                        ui: 'soft-red',
                        handler: 'showAddApplicationUnstrcuturedQueries',
                    }],
                    listeners:{
                        beforerender:function(grid){
                            btn = grid.down('button[name=raise_checklist_query]');
                            btn.setVisible(false);
                            savegrid_screening_btn = grid.down('button[name=savegrid_screening_btn]');
                            savegrid_screening_btn.setVisible(false);
                        }
                    }
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
                    text: 'Product Dossier & Documents',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Application Documents',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Product Application Documents',
                    winWidth: '60%',
                    isReadOnly: 1,
                    document_type_id: '',
                    handler: 'showPreviousNonGridPanelUploadedDocs'
            },
             {
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
            },{
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
                        text: 'Inspection/Quality Audit Status',
                        ui: 'soft-purple',
                        iconCls: 'fa fa-weixin',
                        childXtype: 'productgmpinspectionstatusfrm',
                        winTitle: 'GMP Inspection Status',
                        winWidth: '50%',
                        table_name:'tra_productgmp_inspectionstatuses',
                        handler: 'showAddProductGmpInspectionStatusWin',
                        stores: '[]'
                    }, {
                        text: '1st Assessments Assessments Recommendation & Comments',
                        ui: 'soft-purple', 
                        iconCls: 'fa fa-weixin',
                        hidden:true,
                        childXtype: 'applicationcommentspnl',
                        winTitle: '1st Assessments Process Comments',
                        winWidth: '80%',
                        name:'prev_comments',
                        comment_type_id: 2,
                        stores: '[]'
                    }]
                }
            }, '->',{
                text: 'Submit Application',
                ui: 'soft-purple',
                iconCls: 'fa fa-check',
                name: 'process_submission_btn',
                storeID: 'productregistrationstr',
                table_name: 'tra_product_applications',
                winWidth: '50%'
            }]
        }
    ]
});