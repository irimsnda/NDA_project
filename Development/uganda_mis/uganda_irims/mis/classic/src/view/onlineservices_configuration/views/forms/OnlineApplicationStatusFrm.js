/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.forms.OnlineApplicationStatusFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlineapplicationstatusfrm',
    controller: 'onlineservicesconfVctr',
    autoScroll: true,
    
    frame: true,
    bodyPadding: 8,
    
	layout: {
        type: 'column'
    },
    defaults: {
        labelAlign: 'top',
        labelStyle: {
            'font-weight': 'bold'
        },
        labelCls: '',
        allowBlank: false,
        columnWidth: 1,
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'wb_statuses',
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
        xtype: 'combo',
        fieldLabel: ' Status Type',
        margin: '0 20 20 0',
        name: 'status_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        columnWidth: 0.9,
        listeners: {
            afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'onlineappStatusesStr',
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'wb_statuses_types'
                            }
                        }
                    },
                    isLoad: true
                },
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'Name',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'name'
    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    }, {
        xtype: 'checkbox',
        fieldLabel: 'Is Enabled?',
        inputValue: 1,
        uncheckedValue: 0,
        name: 'is_enabled'
    }, {
        xtype: 'checkbox',
        fieldLabel: 'Visible On Receiving?',
        inputValue: 0,
        uncheckedValue: 0,
        name: 'has_receiving'
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
                    table_name: 'wb_statuses',
                    storeID: 'onlineapplicationstatusstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'onlineservices/saveOnlinePortalData',
                    handler: 'funcSaveformData'
                },{
                    text: 'Reset',
                    iconCls: 'x-fa fa-close',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        btn.up('form').getForm().reset();
                    }
                }
            ]
        }
    ]
});