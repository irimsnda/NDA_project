
/**
 * Created by Softclans
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremiseTcRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premiseTcRecommendationFrm',
    controller: 'premiseregistrationvctr',
    frame: true,
    bodyPadding: 5,
    layout: 'form',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tc_recommendations'
        },
        {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Recommendation',
            name: 'decision_id',
            allowBlank: false,
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_tcinspectionmeeting_decisions'
                            }
                        }
                    },
                    isLoad: true
                },
                
            }
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Comments',
            name: 'comments',
            allowBlank: true
        }
    ],
    buttons: [
        {
            xtype: 'button',
            formBind: true,
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            name: 'tc_recom_button',
            handler: 'doCreatePremiseRegParamWin',
            action_url: 'clinicaltrial/saveClinicalTrialCommonData',
            table_name: 'tc_recommendations',
            storeID: 'premiseReviewTCMeetingStr'
        }
    ]
});