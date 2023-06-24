/**
 * Created by Softclans on 7/11/2019.
 */
Ext.define('Admin.view.importexportpermits.views.forms.InspectionProductsRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'inspectionproductsrecommendationfrm',
    controller: 'importexportpermitsvctr',
    frame: true,
    bodyPadding: 5,
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
            xtype: 'combo',
            name: 'prodinspection_recommendation_id',
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
                                table_name: 'par_prodinspection_recommendations'
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
            name: 'btnsaverecommendation'
        }
    ]
});