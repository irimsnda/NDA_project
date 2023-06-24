/**
 * Created by Softclans
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremiseAnnualReturnsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'premiseannualreturnsGrid',
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
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
        xtype: 'hiddenfield',
        name: 'application_code'
    },{
        xtype: 'hiddenfield',
        name: 'application_id'
    },  {
        xtype: 'button',
        text: 'Declare Returns',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_returns',
        childXtype: 'applicationAnnualreturnsFrm',
        winTitle: 'Declare Returns',
        winWidth: '50%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'premiseannualreturnsStr',
                proxy: {
                    url: 'premiseregistration/getPremiseApplicationAnnualReturns'
                }
            },
            isLoad: true
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                isOnline = 1,//grid.getIsOnline(),
                win = grid.up('#contentPanel'),
                application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
                application_code = win.down('hiddenfield[name=active_application_code]').getValue();
            store.getProxy().extraParams = {
                application_id: application_id,
                application_code: application_code,
                isOnline: isOnline//1
            }
        }
    }],
    columns: [{
                xtype: 'gridcolumn',
                dataIndex: 'returns_category',
                text: 'Retuns Category',
                width: 50,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'returns',
                text: 'Declared Returns',
                flex: 1,
                tdCls: 'wrap'
            },{
                xtype: 'gridcolumn',
                dataIndex: 'returns_description',
                text: 'Returns Description',
                width: 200,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'status',
                text: 'Status',
                flex: 1,hidden: true,
                tdCls: 'wrap'
            }]
});
