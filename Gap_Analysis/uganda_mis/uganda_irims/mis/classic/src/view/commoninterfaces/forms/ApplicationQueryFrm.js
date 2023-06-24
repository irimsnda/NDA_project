/**
 * Created by Kip on 10/5/2018.
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationQueryFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationqueryfrm',
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
            name: 'module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'sub_module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'item_resp_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'checklistitems_queries'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'unset_data',
            value: 'module_id,sub_module_id,section_id'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Query',
            width:'100%',
            name: 'query'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Comment',
            name: 'comment',
			hidden: true,
            allowBlank: true
        },
        {
            xtype: 'combo',
            fieldLabel: 'Application Section',
            name: 'application_section_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'application_section',
            valueField: 'id',
            allowBlank: true,
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
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
            xtype: 'combo',
            fieldLabel: 'Reference Details(Optional)',
            name: 'reference_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            allowBlank: true,hidden: true,
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_query_guidelines_references'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Reference Section(Optional)',
            name: 'reference_section',hidden: true,
            allowBlank: true
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Manager Query Commentk',
            name: 'manager_query_comment',
            allowBlank: true,
            hidden: true,
            readOnly: true
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Manager Query Response Comment',
            name: 'manager_queryresp_comment',
            allowBlank: true,
            hidden: true,
            readOnly: true
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
                    handler: 'backToApplicationQueriesGrid'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Save Query',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-save',
                    formBind: true,
                    storeID: 'applicationqueriesstr',
                    reload_base:1,
                    action: 'save_query',
                    action_url: 'api/saveCommonData',
                    handler: 'saveApplicationQuery'
                },
                {
                    xtype: 'button',
                    text: 'Submit Query',
                    ui: 'soft-purple',
                    storeID: 'applicationqueriesstr',
                    iconCls: 'x-fa fa-check',
                    action: 'save_requery',
                    formBind: true,
                    reload_base:1,
                    hidden: true,
                    action_url: 'api/saveApplicationReQueryDetails',
                    handler: 'saveApplicationQuery'
                }
            ]
        }
    ]
});