/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpScreeningPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpscreeningpnl',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [{
            xtype:'tabpanel',
            layout: 'fit',region: 'center',
            items:[{
                xtype: 'mansiteappmoredetailswizard',
                title: 'GMP Application Details '
             },{
                title: 'Screening Checklists',
                layout: 'fit',
                items: [
                    {
                        xtype: 'productscreeninggrid'
                    }
                ]
            }]

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
                    text: 'Preview & Edit Details',
                    iconCls: 'fa fa-bars',
                    name: 'more_app_details',
                    hidden: true,
                    isReadOnly: 0,
                    is_temporal: 0
                },{
                        text: 'Application Documents',
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
                
                '->',
                {
                    text: 'Documents Submission Recommendation',
                    ui: 'soft-purple',
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
                    table_name: 'tra_gmp_applications',
                    winWidth: '50%'
                }
            ]
        }
    ]
});