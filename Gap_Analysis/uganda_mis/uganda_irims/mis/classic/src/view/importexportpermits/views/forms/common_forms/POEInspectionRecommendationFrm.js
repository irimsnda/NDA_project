/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.POEInspectionRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'poeinspectionrecommendationfrm',
    layout: 'form',
    frame: true,
    controller: 'importexportpermitsvctr',
    defaults: {
        allowBlank: false,
        labelStyle: 'font-weight:bold'
    },
    fieldDefaults: {
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    },
    items: [{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Recommendation',
            name: 'inspection_recommendation_id',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getNonrefParameter',
                            extraParams: {
                                table_name: 'par_poeinspection_recommendation',
                                has_filter: 0
                            }
                        }
                    },
                    isLoad: true
                }
            }
           
        }, 
        {
            xtype: 'textarea',
            fieldLabel: 'Remarks',
            name: 'remarks',
            allowBlank: true
        },{
            xtype:'hiddenfield',
            name:'poe_application_id'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Inspection Recommendation',
            ui: 'soft-purple',
            storeId: 'poeinspectionprocessdashgridstr',
            iconCls: 'x-fa fa-save',
            formBind: true,
            name:'save_recommendation'
        }
    
    ]
});