/**
 * Created by Kip on 3/15/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.LabResultsAbstractFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'labresultsabstractfrm',
    controller: 'surveillancevctr',
    layout: 'form',
    defaults:{
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'sample_id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Sample Test Parameter',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            name: 'test_parameter_id',
            forceSelection: true,
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'cost_elements'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Specifications',
            name: 'specifications'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Results',
            name: 'results'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Recommendation',
            name: 'recommendation'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Remarks',
            name: 'analyst_remarks',
            allowBlank: true
        }
    ]
});