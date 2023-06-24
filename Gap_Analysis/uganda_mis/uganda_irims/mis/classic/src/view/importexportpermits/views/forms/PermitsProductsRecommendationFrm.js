/**
 * Created by Softclans on 7/11/2019.
 */
Ext.define('Admin.view.importexportpermits.views.forms.PermitsProductsRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'permitsproductsrecommendationfrm',
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
            name: 'permitprod_recommendation_id',
            fieldLabel: 'Recommendation',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            store:'permitprod_recommendationstr'
        },
        {
            xtype: 'textarea',
            name: 'permitprod_recommendation_remarks',
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