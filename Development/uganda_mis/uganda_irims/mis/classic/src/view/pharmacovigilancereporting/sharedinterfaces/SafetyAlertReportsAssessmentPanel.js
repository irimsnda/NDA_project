/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.pharmacovigilancereporting.views.sharedinterfaces.panels.SafetyAlertReportsAssessmentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'safetyalertreportsassessmentpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [
        {
            title: 'Application Assessment Uploads',
            region: 'center',
            xtype: 'tabpanel',
            items: [{
                      xtype: 'safetyalertreportsassessmentappmoredetailswizard',
                     title: 'Preview Safety Alerts Details'
                 },{
                    xtype: 'safetyalertreportsobservationsgrid',
                   title: 'Preview Safety Alerts Observations Details'
               },{
                    xtype: 'clinicaltrialdocuploadsgenericgrid',
                    title:'Assessment Report(s) Upload'
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
                    
                        text: ' Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
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
                    storeID: '',
                    table_name: 'tra_pharmacovigilance_reporting',
                    winWidth: '50%'
                }
            ]
        }
    ]
});