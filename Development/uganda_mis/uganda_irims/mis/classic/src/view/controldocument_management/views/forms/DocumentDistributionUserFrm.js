Ext.define('Admin.view.controldocument_management.views.forms.DocumentDistributionUserFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'documentdistributionuserFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
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
        value: 'tra_documentdistribution_users',
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
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'application_id',
        margin: '0 20 20 0',
        name: 'application_id',
        allowBlank: false
    },{
        xtype: 'tagfield',
        name: 'user_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        filterPickList: true,
        encodeSubmitValue: true,
        growMax: 80,
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    proxy: {
                        url: 'usermanagement/getUserList'
                    }
                   },
                isLoad: true
            },
        }
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_documentdistribution_users',
                    storeID: 'documentdistributionusersStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'controldocumentsmng/saveDocumentDistributionUserList',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});