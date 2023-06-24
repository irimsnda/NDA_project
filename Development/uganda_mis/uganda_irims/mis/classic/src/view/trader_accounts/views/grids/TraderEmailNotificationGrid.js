Ext.define('Admin.view.frontoffice.enquiries.grid.TraderEmailNotificationGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'traderemailnotificationgrid',
    layout: 'fit',
    controller: 'traderaccountsvctr',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'traderemailnotificationStr',
                proxy: {
                    url: 'tradermanagement/GetTraderEmailNotifications'
                }
            },
            isLoad: true
        }
    },
    tbar:[{
          xtype: 'toolbar',
          layout: 'hbox',
          items: [
                {
                xtype: 'button',
                text: 'Send New Notification',
                iconCls: 'x-fa fa-send',
                action: 'add',
                ui: 'soft-green',
                childXtype: 'traderemailnotificationfrm',
                winTitle: 'New Mail',
                winWidth: '60%',
                handler: 'funcShowCommonWindow',
                stores: '[]'
               }
             ,'->',
                {
                    xtype: 'combo',
                    fieldLabel: 'Select Trader Email',
                    forceSelection: true,
                    emptyText: 'Write to filter',
                    queryMode: 'local',
                    width: 450,
                    valueField: 'email',
                    labelAlign : 'left',
                    displayField: 'email',
                    name: 'user_email',
                    allowBlank: true,
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    listeners: {
                        beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                    table_name: 'wb_trader_account'
                                }
                               }
                            },
                            isLoad: true
                        },
                        change: function(combo,newValue,old,eopt) {
                            var grid = combo.up('grid'),
                                store = grid.getStore();
                                store.removeAll();
                                store.load();
                        },
                        beforequery: function() {
                            var store=this.getStore();
                            
                            var all={name: 'All',id:0};
                              store.insert(0, all);
                            },

                    }
                }],
    }],
    features: [{
            ftype: 'searching',
            minChars: 2,
            mode: 'local'
        }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        name: 'id',
        text: 'id',
        hidden: true,
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Trader Name',
        name: 'name',
        text: 'name',
        flex: 1,
        hidden: true,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'email',
        name: 'email',
        text: 'Email Address',
        hidden: true,
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'subject',
        name: 'subject',
        text: 'Subject',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'message',
        name: 'message',
        text: 'Email Message',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'email_cc',
        name: 'email_cc',
        text: 'Email CCs',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'created_on',
        name: 'created_on',
        text: 'Mailing Date',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'widgetcolumn',
        text: 'Action',
        width: 150,
        widget: {
            width: 150,
            ui: 'soft-green',
            iconCls: 'fa fa-export',
            textAlign: 'left',
            xtype: 'button',
            text: 'Delete',
            handler: 'func_deleteMail'
            }
    }],

    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function() {
           var  grid = this.up('grid'),
                store = grid.getStore(),
                email = grid.down('combo[name=user_email]').getValue();
                store.getProxy().extraParams = {
                    email:email,
                }
        },
    }]

    });
