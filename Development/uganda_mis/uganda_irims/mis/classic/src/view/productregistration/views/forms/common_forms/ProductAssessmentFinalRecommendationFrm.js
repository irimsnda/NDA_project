
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.common_forms.ProductAssessmentFinalRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productassessmentfinalrecommendationfrm',
    itemId: 'productassessmentfinalrecommendationfrm',
    layout: {
        type: 'vbox'
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        allowBlank: false,
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },
     {
        xtype: 'hiddenfield',
        name: 'application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_productassessment_finalrecommendation'
    },   {
        xtype: 'combo',
        name: 'assessment_recommendation_id',
        allowBlank: false,
        fieldLabel: 'Assessment Recommendation',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_evaluation_recommendations'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textfield',
        name: 'proof_ofefficacy_basis', 
        fieldLabel: 'Basis for Proof Efficacy:'
    },{
        xtype: 'textarea',
        name: 'outstanding_issues', 
        fieldLabel: 'Outstanding Issues',
        
    },{
        xtype: 'textarea',
        name: 'sectretariats_remarks', 
        fieldLabel: 'Sectretariats Remarks/Comments'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Assessments Summary Information',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_productassessment_finalrecommendation',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveGmpproductStatusesdetails'
            }
        ]
    }
    ]
});             
