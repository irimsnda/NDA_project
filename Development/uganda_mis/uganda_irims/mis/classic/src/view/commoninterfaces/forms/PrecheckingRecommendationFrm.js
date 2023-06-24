/**
 * Created by Softclans on 7/11/2019.
 */
Ext.define('Admin.view.premiseregistration.views.forms.PrecheckingRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'precheckingrecommendationfrm',
    controller: 'commoninterfacesVctr',
    frame: true,
    bodyPadding: 5,
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'record_id'
        },{
            xtype: 'hiddenfield',
            name: '_token',
            value:token
        },{
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        
        {
            xtype: 'combo',
            name: 'recommendation_id',
            fieldLabel: 'Recommendation',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_evaluation_recommendations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textarea',
            name: 'remarks',
            fieldLabel: 'Remarks',
            allowBlank: false
        }
    ],
    buttons: [
        {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            formBind: true,
            ui: 'soft-purple',
            handler: 'doSavePrecheckingecommendationDetails',
            action_url: 'premiseregistration/savePrecheckingecommendationDetails',
            table_name: 'tra_prechecking_recommendations',
        }
    ]
});