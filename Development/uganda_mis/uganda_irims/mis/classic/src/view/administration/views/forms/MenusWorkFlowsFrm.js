/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.administration.views.forms.MenusWorkFlowsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'menusworkflowsfrm',
    autoScroll: true,
    controller: 'administrationvctr',
    layout: 'column',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false,
        columnWidth: 1,
        margin: 5
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'wf_menu_workflows',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'menu_id'
    }, {
        xtype: 'tagfield',
        fieldLabel: 'Associated WorkFlows',
        margin: '0 20 20 0',
        name: 'workflow_ids',
        allowBlank: false,
        forceSelection: true,
        filterPickList: true,
        encodeSubmitValue: true,
        emptyText: 'Select WorkFlow(s)',
        growMax: 100,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'Workflow'
                        }
                    }
                },
                isLoad: true
            }
        }
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'wf_menu_workflows',
                    storeID: 'systemmenusstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'workflow/saveMenuWorkFlowsLinkage',
                    handler: 'doCreateAdminParamWin'
                }, {
                    text: 'Delete Workflow Details',
                    iconCls: 'x-fa fa-trash',
                    ui: 'soft-red',
                    handler: 'deleteMenuWorkFlowsLinkage',
                    formBind: true
                }
            ]
        }
    ]
});