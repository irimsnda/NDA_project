/**
 * Created by Softclans on 11/27/2018.
 */
Ext.define('Admin.view.premiseregistration.views.forms.OnlineQueriesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlinequeriesfrm',
    controller: 'commoninterfacesVctr',
    frame: true,
    layout: {
        type: 'form'
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },{
            xtype: 'hiddenfield',
            name: 'sub_module_id'
        },{
            xtype: 'hiddenfield',
            name: 'module_id'
        }, {
            xtype: 'combo',
            fieldLabel: 'Application Section',
            name: 'application_section_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            allowBlank: true,
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_application_sections'
                            }
                        }
                    },
                    isLoad: false
                },
                afterrender: function () {
                    var form = this.up('form'),
                        store = this.getStore(),
                        module_id = form.down('hiddenfield[name=module_id]').getValue(),
                        sub_module_id = form.down('hiddenfield[name=sub_module_id]').getValue(),
                        filterObj = {module_id: module_id, sub_module_id: sub_module_id},
                        filterStr = JSON.stringify(filterObj);
                    store.removeAll();
                    store.load({params: {filters: filterStr}});
                }
            }
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Query',
            name: 'query_txt',
            labelAlign: 'top'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'button',
                    text: 'Back',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-backward',
                    handler: 'backToOnlineQueries'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Save Query',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-save',
                    formBind: true,
                    reload_base:1,
                    action: 'save_query',
                    action_url: 'premiseregistration/saveOnlineQueries',
                    handler: 'saveOnlineQuery'
                }
            ]
        }
    ]
});