Ext.define('Admin.view.trader_accounts.views.panels.ProductAuthorisationGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productauthorisationgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    scroll: true,
    autoHeight: true,
    controller: 'traderaccountsvctr',
    width: '100%',
    height: 450,
    requires: [
        'Ext.button.Button',
        'Ext.menu.Menu',
        'Ext.toolbar.Paging',
        'Admin.view.plugins.Searching',
        'Ext.grid.*'
    ],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100, remoteFilter: true,
                storeId: 'productauthorisationgridstr',
                proxy: {
                    url: 'tradermanagement/getTradersProductsDetailsinformation'
                }
            },
            isLoad: true
        },
    },
    tbar:[{
        text: 'Allow Product Authorisation',
        iconCls:'x-fa fa-check',
        margin:5,ui: 'soft-purple',
        handler: 'funcAllowProductAuthorisation'
    },{
        xtype:'hiddenfield',
        name: 'traderidentification_no'
    },{
        xtype:'hiddenfield',
        name: 'authorisedidentification_no'
    }],
    columns: [{
        header: 'Brand Name',
        dataIndex: 'brand_name',
        flex: 1
    }, {
        header: 'Common Name',
        dataIndex: 'common_name',
        flex: 1
    }, {
        header: 'Certificate No',
        dataIndex: 'certificate_no',
        flex: 1
    }, {
        header: 'Registration Status',
        dataIndex: 'registration_status',
        flex: 1
    },{
        header: 'Validity Status',
        dataIndex: 'validity_status',
        flex: 1
    }, {
        header: 'Approval Status',
        dataIndex: 'prodappoval_status',
        flex: 1,
        renderer: function (value, metaData,record) {
            var status_id = record.get('status_id')
            if (status_id ==2) {
                metaData.tdStyle = 'color:white;background-color:green';
                return value;
            }
            metaData.tdStyle = 'color:white;background-color:red';
            return value;
        }
    },{
        xtype:'actioncolumn',
        width:50,
        items: [{
            iconCls: 'x-fa fa-times',
            text: 'Unlink/Rejected/Disallow',
            tooltip: 'Unlink/Rejected/Disallow',
            handler: 'funcUnlinkeProductAuthorisation'
        }]
    }],
    features:[{
        ftype: 'searching',
        minChars: 4,
        mode: 'local'
    }],
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        allowDeselect: true
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
            this.up('grid').fireEvent('refresh', this);
        }
    }]
});