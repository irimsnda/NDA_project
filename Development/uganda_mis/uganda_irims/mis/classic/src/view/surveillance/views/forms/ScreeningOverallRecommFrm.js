/**
 * Created by Kip on 3/27/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.ScreeningOverallRecommFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'screeningoverallrecommfrm',
    controller: 'surveillancevctr',
    frame: true,
    layout: 'form',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'analysis_type_id'
        },
        {
            xtype: 'hiddenfield',
            disabled: true,
            name: 'decision_table'
        },
        {
            xtype: 'hiddenfield',
            name: 'sample_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_pmslabresult_recommendations'
        },
        {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
           // readOnly: true,
            fieldLabel: 'Recommendation',
            name: 'decision_id',
            allowBlank: false,
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable'
                        }
                    },
                    isLoad: false
                },
                afterrender: function () {
                    var form = this.up('form'),
                        store = this.getStore(),
                        decision_table = form.down('hiddenfield[name=decision_table]').getValue();
                    store.removeAll();
                    store.load({params: {table_name: decision_table}})
                }
            }
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Comments',
            name: 'comments',
           // readOnly: true,
            allowBlank: true
        }
    ],
    buttons: [
        {
            xtype: 'button',
            formBind: true,
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            name: 'save_btn',
            ui: 'soft-purple',
           // hidden:true,
            handler: 'doCreateSurveillanceParamWin',
            action_url: 'surveillance/saveSurveillanceCommonData',
            table_name: 'tra_pmslabresult_recommendations',
            storeID: ''
        }
    ]
});