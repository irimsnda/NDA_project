/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ProgressReportAssessmentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'progressreportassessmentpanel',
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
                xtype: 'ctrprogressreportappmoredetailswizard',
                title:'Clinical Trial Progress Report Details'
            },{
                    xtype: 'clinicaltrialdocuploadsgenericgrid',
                    title:'Clinical Trial Progress Report Assessment Report(s) Upload'
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
                        winWidth: '60%',
                        isReadOnly: 1,
                        document_type_id: '',
                        handler: 'showPreviousNonGridPanelUploadedDocs'
                    
                },
                
                {
                    xtype: 'button',
                    text: 'Raise Query',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-gavel',
                    winWidth: '80%',
                    childXtype: 'applicationunstructuredqueriesgrid',
                    winTitle: 'Clinical Trial Application Queries',
                    handler: 'showAddClinicalTrialUnstructuredQueriesWin'
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