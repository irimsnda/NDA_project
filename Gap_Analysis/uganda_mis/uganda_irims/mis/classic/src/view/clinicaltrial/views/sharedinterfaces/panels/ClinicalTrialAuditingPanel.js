/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ClinicalTrialAuditingPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialauditingpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [
        {
            title: 'Application Auditing Uploads',
            region: 'center',
            xtype: 'tabpanel',
            items: [
                {
                    xtype: 'clinicaltrialdocuploadsgenericgrid',
                    title:'Clinical Trial Auditing Reports Upload'
                },{
                    xtype: 'clinicaltrialappmoredetailswizard',
                    title:'Clinical Trial Details'
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
                        {
                            xtype: 'toolbar',
                            ui: 'footer',
                            columnWidth: 1,
                            items:[
                                {
                                    text: 'More Details',
                                    iconCls: 'fa fa-bars',
                                    name: 'more_app_details',
                                    isReadOnly: 0
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
                },{
                    
                        text: 'Clinical Details Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Clinical Details Application Documents',
                        winWidth: '60%',
                        isReadOnly: 1,
                        document_type_id: '',
                        handler: 'showPreviousNonGridPanelUploadedDocs'
                    
                },
                {
                    text: 'Assessment',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-sliders',
                    menu:{
                        xtype: 'menu',
                        items:[
                            {
                                text: 'Comments',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'applicationprevcommentsgrid',
                                winTitle: 'Assessment Comments',
                                winWidth: '60%',
                                name: 'prev_comments',
                                comment_type_id: 4,
                                stores: '[]',
                                target_stage: 'assessment',
                                isWin: 1
                            },
                            {
                                text: 'Documents',
                                iconCls: 'x-fa fa-upload',
                                childXtype: 'clinicaltrialprevdocuploadsgenericgrid',
                                winTitle: 'Assessment uploaded Documents',
                                winWidth: '80%',
                                name: 'prev_uploads',
                                stores: '[]',
                                target_stage: 'assessment',
                                isWin: 1
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
                    text: 'Comments',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-weixin',
                    childXtype: 'applicationcommentspnl',
                    winTitle: 'Auditing Comments',
                    winWidth: '60%',
                    comment_type_id: 3,
                    name: 'comments_btn',
                    stores: '[]'
                },
                {
                    xtype: 'button',
                    text: "Raise/View Query(Request for Information)",
                    tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                    ui: 'soft-red',
                    name: 'raise_checklist_query',
                    handler:'showGeneralAppAppQueries'
                    
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