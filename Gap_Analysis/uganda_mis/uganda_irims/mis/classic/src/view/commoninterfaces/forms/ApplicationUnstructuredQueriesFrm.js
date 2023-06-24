/**
 * Created by Softclans on 10/5/2018.
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationUnstructuredQueriesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationunstructuredqueriesfrm',
    controller: 'commoninterfacesVctr',
    frame: true,
    scrollable: true,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 3,
        allowBlank: false,
        columnWidth: 1,
        labelAlign: 'top'
    },
    items: [
        {
            xtype: 'hiddenfield',
            allowBlank: true,
            name: 'id'
        },
        {
            xtype: 'hiddenfield',allowBlank: true,
            name: 'module_id'
        },
        {
            xtype: 'hiddenfield',allowBlank: true,
            name: 'sub_module_id'
        },
        {
            xtype: 'hiddenfield',allowBlank: true,
            name: 'section_id'
        },{
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'checklistitems_queries'
        }, {
            xtype: 'hiddenfield', allowBlank: true,
            name: 'query_id'
        },{
            xtype: 'hiddenfield', allowBlank: true,
            name: 'workflow_stage_id'
        },{
            xtype: 'hiddenfield', allowBlank: true,
            name: 'process_id'
        },{
            xtype: 'hiddenfield', allowBlank: true,
            name: 'is_structured'
        },{ 
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },{
            xtype: 'hiddenfield',
            name: 'unset_data',
            value: 'module_id,sub_module_id,section_id,table_name,item_resp_id'
        }, {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                columnWidth: 1,
                labelAlign: 'top'
            },
            items:[{
                    xtype: 'combo',
                    fieldLabel: 'Query Category Item',
                    name: 'checklist_querycategory_id',
                    forceSelection: true,
                    columnWidth: 0.8,
                    queryMode: 'local',
                    displayField: 'name',
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
                                        table_name: 'par_checklist_querycategories'
                                    }
                                }
                            },
                            isLoad: false
                        },
                        afterrender: function () {
                            var form = this.up('form'),
                                store = this.getStore(),
                                module_id = form.down('hiddenfield[name=module_id]').getValue();

                            store.removeAll();
                            store.load({params: {module_id: module_id}});

                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Query Checklist Item' ,
                    iconCls:'x-fa fa-plus',
                    columnWidth: 0.2,hidden:true,
                    winTitle: 'Add Query Checklist',
                    margin: '30 0 0 0',winWidth: '45%',
                    childXtype:'querychecklistitemsfrm',
                    handler:'funcAddquerychecklistitems',
                }
            ]
        },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Query/Observations/Finding',
            minHeight: 300,
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
            queryMode: 'local',  hidden: true,
            displayField: 'name',
            valueField: 'id',
            allowBlank: true,hidden: true,
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
            fieldLabel: 'Reference Details',
            name: 'reference_id',
            forceSelection: true,  hidden: true,
            queryMode: 'local',
            displayField: 'name',hidden: true,
            allowBlank: true,
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
            fieldLabel: 'Reference Section',  hidden: true,
            name: 'reference_section',hidden: true,
            allowBlank: true
        },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Manager Query Comment',
            name: 'manager_query_comment',
            allowBlank: true,
            hidden: true,
            readOnly: true
        },
        {
            xtype: 'htmleditor',
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
                
                '->',
                {
                    xtype: 'button',
                    text: 'Save Query',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-save',
                    formBind: true,
                    reload_base:1,
                    action: 'save_query',
                    action_url: 'saveUnstructuredApplicationQuery',
                    handler: 'saveUnstructuredApplicationQuery'
                },
                {
                    xtype: 'button',
                    text: 'Submit Query',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-check',
                    action: 'save_requery',
                    //formBind: true,
                    reload_base:1,
                    hidden: true,
                    action_url: 'api/saveApplicationReQueryDetails',
                    handler: 'saveApplicationQuery'
                }
            ]
        }
    ]
});