/**
 * Created by Softclans on 4/29/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.OnlineAppsRejectionsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'onlineappsrejectionsgrid',
    frame: true,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 400,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'onlineappsrejectionsstr',
                proxy: {
                    url: 'api/getOnlineApplicationRejections',
                }
            },
            isLoad: true
        }
    },
    export_title: 'Online application rejections',
    tbar: [
        {
            xtype: 'exportbtn'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                application_code = grid.down('hiddenfield[name=application_code]').getValue();
            store.getProxy().extraParams = {
                application_code: application_code
            }
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],

    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'rejection_reason',
        text: 'Reason',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'remark',
        text: 'Remark',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'created_on',
        text: 'Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'user',
        text: 'Rejection By',
        flex: 1
    }]
});
