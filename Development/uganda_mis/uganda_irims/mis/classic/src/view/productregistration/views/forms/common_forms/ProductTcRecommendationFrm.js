
/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.productregistration.views.forms.ProductTcRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productTcRecommendationFrm',
    controller: 'productregistrationvctr',
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
            store: 'tcrecommendationdecisionsstr',
            allowBlank: false
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Summary of the Final Recommendation',
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
            is_winclosaable: true,
            ui: 'soft-purple',
            name: 'save_tcrecommendation',
            handler: 'doCreateProductRegParamWin',
            action_url: 'clinicaltrial/saveClinicalTrialCommonData',
            table_name: 'tc_recommendations',
            storeID: 'productReviewTCMeetingStr'
        }
    ]
});