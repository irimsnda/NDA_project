/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ClinicalTrialScreeningPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialscreeningpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [
        {
            title: 'Application Screening ',
            region: 'center',
            xtype: 'tabpanel',
            items: [{
                    title: 'Screening Checklists & Requests for Additional Information ',
                    xtype: 'productscreeninggrid',
                    listeners:{
                        beforerender:function(grid){
                            btn = grid.down('button[name=raise_checklist_query]');
                            btn.setVisible(false);
                        }
                    }
                },{
                    xtype: 'clinicaltrialappmoredetailswizard',
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
                
                '->',{
                    xtype: 'button',
                    text: "Raise/View Query & Responses",
                    tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                    ui: 'soft-red',
                    handler: 'showAddApplicationUnstrcuturedQueries',
                },
                {
                    text: 'Dossier Documents Submission Recommendation',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
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
                    table_name: 'tra_clinical_trial_applications',
                    winWidth: '50%'
                }
            ]
        }
    ]
});