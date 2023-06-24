/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.PreClinicalTrialAssessmentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'preclinicaltrialassessmentpanel',   controller: 'clinicaltrialvctr',
    viewModel: 'clinicaltrialvm',
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
                xtype: 'tbseparator'
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
            }
            ]
        }
    ],
    items: [
        {
            title: 'Application Assessment Uploads',
            region: 'center',
            xtype: 'tabpanel',
            items: [{
                    xtype: 'clinicaltrialdocuploadsgenericgrid',
                    title:'Clinical Trial Assessment Report(s) Upload'
                },{
                    xtype: 'preclinicaltrialappmoredetailswizard',
                    title:'Preview Clinical Trial Details'
                }
            ]
        },
        {
            title: 'Other Details',
            region: 'south',
            width: 200,
            collapsed: true,
            collapsible: true,
            titleCollapse: true,
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 5,
                    layout: 'column',
                    defaults: {
                        margin: 2,
                        labelAlign: 'top',
                        columnWidth: 0.5
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
                            name: 'product_details',
                            hidden: true
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Premise Details',
                            name: 'premise_details',
                            hidden: true
                        },
                        
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
            items: [
                {
                    xtype: 'transitionsbtn'
                },{
                    
                        text: 'Clinical Details Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Clinical Details Application Documents',
                        winWidth: '70%',
                        isReadOnly: 1,
                        document_type_id: '',
                        handler: 'showPreviousNonGridPanelUploadedDocs'
                    
                },
               {
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
                                winWidth: '90%',
                                name: 'btnsample_analysis',
                                handler: 'showSampleAnalysisrequestswin',
                                stores: '[]'
                            }
                        ]
                    }
                },
                {
                    xtype: 'button',
                    text: "Raise/View Query(Request for Information)",
                    tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                    ui: 'soft-green',
                    name: 'raise_checklist_query',
                    listeners: {
                            click: function (btn) {
                                var grid = btn.up('grid');
                                grid.fireEvent('showAppQueries', grid);
                            }
                        }
                }, {
                    text: 'Add Overrall Comments',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-weixin',
                    childXtype: 'applicationcommentspnl',
                    winTitle: 'Assessment Comments',
                    winWidth: '60%',
                    comment_type_id: 4,
                    name: 'comments_btn',
                    stores: '[]'
                }, 
                '->',
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_premises_applications',
                    winWidth: '50%'
                }
            ]
        }
    ]
});