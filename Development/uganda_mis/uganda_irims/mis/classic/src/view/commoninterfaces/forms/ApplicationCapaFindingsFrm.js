/**
 * Created by Softclans on 10/5/2018.
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationCapaFindingsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationcapafindingsfrm',
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
        },{
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_inspectioncapa_deficiencies'//checklistitems_queries
        }, {
            xtype: 'hiddenfield',
            name: 'inspection_capa_id'
        },{
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },{
            xtype: 'hiddenfield',
            name: 'process_id'
        },{
            xtype: 'hiddenfield',
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
            xtype: 'combo',
            fieldLabel: 'Deficiencies Category',
            name: 'deficiencies_category_id',
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
                                table_name: 'par_deficiencies_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Deficiencies/Finding',
            height: 250,
            name: 'deficiencies'
        },{
            xtype: 'textfield',
            fieldLabel: 'References',
           
            name: 'deficiency_references'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Comment',
            name: 'comment',
			hidden: true,
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
                    reload_base:1,
                    action: 'save_query',
                    action_url: 'saveApplicationCapaDeficiencies',
                    handler: 'saveApplicationCapaDeficiencies'
                },
                {
                    xtype: 'button',
                    text: 'Submit Query',
                    ui: 'soft-purple',
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