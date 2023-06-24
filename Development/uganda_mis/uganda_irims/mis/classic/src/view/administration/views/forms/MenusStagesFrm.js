/**
 * Created by Kip on 9/17/2018.
 */
Ext.define('Admin.view.administration.views.forms.MenusStagesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'menusstagesfrm',
    autoScroll: true,
    controller: 'administrationvctr',
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'wf_menus_stages',
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
        xtype: 'combo',
        fieldLabel: 'Workflow Name',
        margin: '0 20 20 0',
        name: 'workflow_id',
        allowBlank: false,
        forceSelection: true,
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
            },
            change: 'filterWorkflowStages'
        }
    }, {
        xtype: 'tagfield',
        name: 'workflow_stages',
        fieldLabel: 'Workflow Stage(s)',
        displayField: 'name',
        queryMode: 'local',
        valueField: 'id',
        allowBlank: true,
        filterPickList: true,
        encodeSubmitValue: true,
        growMax: 80,
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getWorkflowStages',
                        extraParams: {
                            model_name: 'WorkflowStage'
                        }
                    }
                },
                isLoad: false
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
                    table_name: 'wf_menus_stages',
                    storeID: 'systemmenusstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'workflow/saveMenuWorkflowLinkage',
                    handler: 'doCreateAdminParamWin'
                }, {
                    text: 'Delete Workflow Details',
                    iconCls: 'x-fa fa-trash',
                    ui: 'soft-red',
                    handler: 'deleteMenuWorkflowLinkage',
                    formBind: true
                }
            ]
        }
    ]
});