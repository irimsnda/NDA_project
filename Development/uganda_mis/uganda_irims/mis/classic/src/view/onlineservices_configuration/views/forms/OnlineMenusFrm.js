/**
 * Created by Kip on 7/5/2018.
 */
Ext.define('Admin.view.administration.views.forms.OnlineMenusFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlinemenusfrm',
    autoScroll: true,
    requires:[
        'Ext.layout.container.Table'
    ],
    controller: 'onlineservicesconfVctr',
    bodyPadding: 3,
    layout:{
        type: 'column'
    },
    defaults: {
        //layout: '',
        labelAlign: 'top',
        allowBlank: false,
        columnWidth:0.5,
        margin: 8
    },
    items: [{
        xtype: 'hiddenfield',
        columnWidth: 0.25,
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'wb_navigation_items',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        columnWidth: 0.25,
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        columnWidth: 0.25,
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'Navigation Type',
       
        displayField: 'name',
        valueField: 'id',
        allowBlank: true,
        forceSelection: true,
        name: 'navigation_type_id',
        queryMode: 'local',
        listeners: {
					afterrender: {
							fn: 'setConfigCombosStore',
							config: {
								pageSize: 10000,storeId: 'onlineappStatusesStr',
								proxy: {
									extraParams: {
										model_name: 'OnlineNavigationType'
									}
								}
							},
							isLoad: true
						},
						change: 'onChangeNavigationType'
		}
    }, {
        xtype: 'textfield',
        fieldLabel: 'Name/Text',
        name: 'name'
    }, {
        xtype: 'textfield',
        name: 'router_link',
        fieldLabel: 'Router Link',
        allowBlank: true
        //margin: '0 0 0 20'
    }, {
        xtype: 'textfield',
        fieldLabel: 'IconCls',
        name: 'iconCls',
        allowBlank: true
    }, {
        xtype: 'combo',
        fieldLabel: 'Level',
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
		
        allowBlank: false,
        forceSelection: true,
        name: 'level',
        listeners: {
            change: 'showHideParent'
        },
		listeners: {
					afterrender: {
							fn: 'setConfigCombosStore',
							config: {
								pageSize: 10000,
								storeId: 'OnlineNavigationLevelStr',
								proxy: {
									extraParams: {
										model_name: 'OnlineNavigationLevels'
									}
								}
							},
							isLoad: true
						},
						change: 'showHideParent'
		}
    }, {
        xtype: 'combo',
        fieldLabel: 'Parent',
        hidden: true,
        displayField: 'name',
        valueField: 'id',
        allowBlank: true,
        forceSelection: true,
        name: 'parent_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setAdminCombosStore',
                config: {
                    pageSize: 100,
                    storeId: 'onlineparentmenus',
                    proxy: {
                        url: 'onlineservices/getOnlineMenuLevel0'
                    }
                },
                isLoad:true
            }
        }
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Order No.',
        name: 'order_no'
    }, {
        xtype: 'combo',
        fieldLabel: 'Is Online?',
        displayField: 'name',
        valueField: 'flag',
        store: 'confirmationstr',
        queryMode: 'local',
        forceSelection: true,
        name: 'is_online'
    }],
	dockedItems:[{
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'wb_navigation_items',
                    storeID: 'onlinemenusstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'onlineservices/saveOnlinePortalData',
                    handler: 'funcSaveformData',
					
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