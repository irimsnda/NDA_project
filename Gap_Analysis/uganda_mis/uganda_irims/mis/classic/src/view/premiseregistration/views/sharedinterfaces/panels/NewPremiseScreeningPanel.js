/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.NewPremiseScreeningPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'newpremiseevaluationpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [{
            title: 'Premises Information & Assessment',
            region: 'center',
            layout: 'fit',
            xtype:'premiseappmoredetailswizard'
        },{
            title: 'Other Details',
            region: 'south',
            width: 200,hidden: true,
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
                        {
                            xtype: 'toolbar',
                            ui: 'footer',
                            hidden: true,
                            columnWidth: 1,
                            items: [
                                {
                                    text: 'More Details',
                                    iconCls: 'fa fa-bars',
                                    name: 'more_app_details',
                                    isReadOnly: 0,
                                    is_temporal: 0
                                }
                            ]
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
            items: [
                {
                    xtype: 'transitionsbtn'
                },
                {
                    text: 'Inspection',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'fa fa-sliders',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: 'Details',
                                iconCls: 'x-fa fa-bars',
                                childXtype: 'inspectiondetailstabpnl',
                                winTitle: 'Inspection Details',
                                winWidth: '60%',
                                name: 'inspection_details',
                                isReadOnly: 1,
                                stores: '[]'
                            },
                            {
                                text: 'Comments',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'applicationprevcommentsgrid',
                                name: 'prev_comments',
                                winTitle: 'Inspection Comments',
                                winWidth: '60%',

                                stores: '[]',
                                comment_type_id: 1,
                                target_stage: 'inspection',
                                isWin: 1
                            },
                            {
                                text: 'Documents',
                                iconCls: 'x-fa fa-upload',
                                childXtype: 'premregappprevdocuploadsgenericgrid',
                                winTitle: 'Inspection uploaded Documents',
                                winWidth: '80%',
                                name: 'prev_uploads',
                                stores: '[]',
                                target_stage: 'inspection'
                            },
                            {
                                text: 'Report',
                                iconCls: 'x-fa fa-clipboard',
                                action: 'inspection_report',
                                handler: 'printManagersReport',
                                report_type: 'Inspection Report'
                            }
                        ]
                    }
                },
                {
                    text: 'Upload Application Documents',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Application Documents',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Application Documents',
                    winWidth: '60%',
                    document_type_id: '',
                    handler: 'showUploadEvaluationDocuments'
            },
                {
                    text: 'Documents/Reports',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-upload',
                    childXtype: 'premregappdocuploadsgenericgrid',
                    winTitle: 'Evaluation Documents',
                    name: 'docs_btn',
                    winWidth: '80%',hidden: true,
                    stores: '[]',
                    isWin: 1
                },
                {
                    text: 'Inspection Template',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-th-large',
                    childXtype: 'evaluationtemplatefrm',
                    winTitle: 'Inspection Template',
                    winWidth: '50%',
                    name: 'show_template',
                    stores: '[]',
                    hidden: true
                },
                {
                    xtype: 'button',
                    text: 'Queries',
                    name: 'manager_query',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-gavel',
                    winWidth: '80%',
                    hidden: true,
                    childXtype: 'allqueriesgrid',
                    winTitle: 'Application Queries'
                },
                {
                    xtype: 'button',
                    text: 'Query Responses',
                    ui: 'soft-purple',
                    name: 'manager_queryresp',
                    iconCls: 'fa fa-gavel',
                    hidden: true,
                    winWidth: '80%',
                    childXtype: 'allqueryresponsesgrid',
                    winTitle: 'Application Queries'
                },
                '->',
                {
                    text: 'Save Evaluation Details',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'fa fa-save',
                    name: 'save_btn'
                },{
                    xtype: 'button',
                    text: "Raise/View Query & Responses",
                    tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                    ui: 'soft-red',
                    handler: 'showAddApplicationUnstrcuturedQueries',
                }, {
                    text: 'Dossier Documents Submission Recommendation',
                    ui: 'soft-blue',
                    iconCls: 'fa fa-check',
                   // name: 'process_submission_btn',
                    table_name: 'tra_product_applications',
                    winWidth: '30%',
                    childXtype:'documentssubmissionrecommendationfrm',
                    winTitle:'Documents Submission Recommendation',
                    winWidth: '30%',
                    handler: 'saveSampleSubmissionRemarks'
                },  
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