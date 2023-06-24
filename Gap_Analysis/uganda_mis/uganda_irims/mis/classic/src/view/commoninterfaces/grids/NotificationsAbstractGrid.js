/**
 * Created by Softclans on 5/22/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.NotificationsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'notificationsabstractgrid',
    controller: 'commoninterfacesVctr',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'notificationsabstractstr',
                proxy: {
                    url: 'api/getSystemNotifications'
                }
            },
            isLoad: true
        }
    },
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'from_module',
                text: 'From Module',
                flex: 1,
                tdCls: 'wrap'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'to_module',
                text: 'To Module',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'notification_type',
                text: 'Notification Type',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'memo',
                text: 'memo',
                flex: 1,
                tdCls: 'wrap'
            },{
                xtype: 'gridcolumn',
                dataIndex: 'note',
                text: 'Note',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'notification_date',
                text: 'Notification Date',
                flex: 1,
                tdCls: 'wrap'
            },{
                xtype: 'gridcolumn',
                dataIndex: 'time_span',
                text: 'Time Span(days)',
                flex: 1
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
