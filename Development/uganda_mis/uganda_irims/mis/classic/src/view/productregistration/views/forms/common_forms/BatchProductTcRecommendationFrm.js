
/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.BatchProductTcRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'batchproductTcRecommendationFrm',
    controller: 'productregistrationvctr',
    frame: true,
    bodyPadding: 5,
    layout: 'form',
    items: [{
            xtype: 'hiddenfield',
            name: 'selected_appcodes'
        },
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
            handler: 'doCreateProductRegParamWin',
            action_url: 'saveAppTcRecommendationDetails',
            table_name: 'tc_recommendations',
            storeID: 'productApprovalTCMeetingStr'
        }
    ]
});