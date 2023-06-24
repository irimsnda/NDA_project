/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.DrugsManagerQueryProcessPnlArchive', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugsmanagerqueryprocesspnlarchive',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    }, dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 40,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:11px",
                
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
            },{
                    xtype: 'tbseparator',
                    width: 20
            }, {
                    xtype: 'displayfield',
                    name: 'workflow_stage',
                    fieldLabel: 'Workflow Stage',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',
                        
                'margin-top': '-2px'
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
                        'font-size': '12px',
                        
                'margin-top': '-2px'
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
                        'font-size': '12px',
                        
                'margin-top': '-2px'
                    }
                },  {
                    xtype: 'displayfield',
                    name: 'reference_no',
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
            title: 'Application Query Details',
            region: 'center',
            layout: 'fit',
            items: [
                {
                    xtype: 'drugsmanagerproductsqueriesgrid',
                    querystatus_id:'1,3',
                    isReadOnly:0
                }
            ]
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
            height: 55,
            split: false,
            items: [{
                xtype: 'toolbar',
                ui: 'footer',
                region: 'south',
                height: 55,
                split: false,
                defaults: {
                    margin: 5
                },
                items: [{
                    xtype: 'transitionsbtn'
                },
                {
                    text: 'Preview Products Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-edit',
                    isReadOnly: 1,
                    winTitle: 'Preview Products Details',
                    winWidth: '60%',
                    name: 'more_app_details',
                    stores: '[]'
                },{
                    text: 'Previous Queries & Responses',
                    iconCls: 'fa fa-weixin',
                    childXtype: 'drugsproductsqueriesgrid',
                    winTitle: 'Previous Queries & Responses',
                    winWidth: '60%',  isReadOnly: 1,
                    handler: 'showPreviousQueriesResponses',
                    stores: '[]'

                } ,{
                    text: '1st Assessment Reports',
                    ui: 'soft-purple', 
                    iconCls: 'fa fa-upload',
                    menu: {
                        xtype: 'menu',
                        items: [ {
                                text: '1st Assessment  Comments',
                                iconCls: 'fa fa-weixin',
                                childXtype: 'evaluationcommentspnl',
                                winTitle: '1st Assessment  Comments',
                                winWidth: '60%',  isReadOnly: 1,
                                handler: 'showAddProductRegParamWinFrm',
                                stores: '[]'
                            },
                            {
                                text: 'Documents/Reports',
                                iconCls: 'fa fa-upload',
                                childXtype: 'productDocUploadsGrid',
                                winTitle: '1st Assessment  uploaded Documents',
                                winWidth: '60%',  isReadOnly: 1,
                                handler: 'showApplicationEvaluationUploads',
                                stores: '[]',
                                isWin: 1
                            }
                        ]
                    }
                },{
                    text: '2nd Assessment  Reports',
                    ui: 'soft-purple', 
                    iconCls: 'fa fa-upload',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: '2nd Assessment  Comments',
                                iconCls: 'fa fa-weixin',
                                childXtype: 'evaluationcommentspnl',
                                winTitle: '2nd Assessment Comments',
                                winWidth: '60%',  isReadOnly: 1,
                                handler: 'showAddProductRegParamWinFrm',
                                stores: '[]'
                            },
                            {
                                text: 'Documents/Reports',
                                iconCls: 'fa fa-upload',
                                childXtype: 'productDocUploadsGrid',
                                winTitle: '2nd Assessment uploaded Documents',
                                winWidth: '60%',  isReadOnly: 1,
                                handler: 'showApplicationEvaluationUploads',
                                stores: '[]',
                                isWin: 1
                            }
                        ]
                    }
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
                                childXtype: 'sampleanalysistestrequestspnl',
                                winTitle: 'Sample Analysis Request',
                                winWidth: '90%',  isReadOnly: 1,
                                name: 'btnsample_analysis',
                                handler: 'showSampleAnalysisrequestswin',
                                stores: '[]'
                            }
                        ]
                    }
                },{xtype:'tbfill'},{
                    text: 'Submit Application',
                    ui: 'soft-purple', 
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'productregistrationstr',
                    table_name: 'tra_product_applications',
                    winWidth: '50%'
                }]
            }]
        }]
});