/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.forms.Applicationstatusactionsfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationstatusactionsfrm',
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
        value: 'wb_processstatus_actions',
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
		xtype: 'fieldcontainer',
        layout: 'column',
		items:[{
				xtype: 'combo',
				fieldLabel: 'Application Status',
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
								pageSize: 10000,storeId: 'onlineappStatusesStr',
								proxy: {
									extraParams: {
										model_name: 'OnlineappStatuses'
									}
								}
							},
							isLoad: true
						},
				}
			},{
				xtype: 'button',
				iconCls: 'x-fa fa-plus',
				ui: 'soft-purple',
				columnWidth: 0.082,
                form: 'parametereAddFrm',
				store_name: 'onlineappStatusesStr',
                title: 'Application Statuses',
				table_name: 'wb_statuses', 
                handler: 'showAddFormWin'
			}]
	},{
		xtype: 'fieldcontainer',
        layout: 'column',
		items:[{
				xtype: 'combo',
				fieldLabel: 'Actions',
				margin: '0 20 20 0',
				name: 'action_id',
				valueField: 'id',
				displayField: 'name',
				forceSelection: true,
				allowBlank: false,columnWidth: 0.9,
				queryMode: 'local',
				listeners: {
					afterrender: {
							fn: 'setConfigCombosStore',
							
							config: {
								pageSize: 10000,storeId: 'onlineappActionStr',
								proxy: {
									extraParams: {
										model_name: 'OnlineappActions'
									}
								}
							},
							isLoad: true
						},
				}
			},{
				xtype: 'button',
				iconCls: 'x-fa fa-plus',
				form:'parametereAddFrm',
				table_name: 'wb_statuses_actions', 
				title:'Action details',
				store_name: 'onlineappActionStr',
				ui: 'soft-purple',
				columnWidth: 0.082,
                handler: 'showAddFormWin'
			}]
	},{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    },{
        xtype: 'checkbox',
        fieldLabel: 'Is Default Action',
        labelAlign: 'left',
        margin: '0 0 20 0',
        inputValue: 1,
        uncheckedValue: 0,
        columnWidth: 0.5,
        name: 'is_default_action',
        allowBlank: true
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
                    table_name: 'wb_processstatus_actions',
                    storeID: 'applicationstatusactionsStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'onlineservices/saveApplicationstatusactions',
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