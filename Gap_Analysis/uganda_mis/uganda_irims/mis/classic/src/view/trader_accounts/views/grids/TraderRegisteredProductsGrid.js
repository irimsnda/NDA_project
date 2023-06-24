Ext.define('Admin.view.trader_accounts.views.grid.TraderRegisteredProductsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'traderregisteredproductsgrid',
    autoScroll: true,
    controller: 'traderaccountsvctr',
    width: '100%',
    height: 400,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    scroll: true,
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
           
            config: {
                storeId: 'traderregisteredproductsgridstr',
                proxy: {
                    url: 'tradermanagement/getTraderRegisteredProductsDetails'
                }
            },
            isLoad: true
        }
    },features:[{
        ftype: 'searching',
        minChars: 4,
        mode: 'local'
    }],
    columns: [
    {
        header: 'Sub Module',
        dataIndex: 'sub_module_name',
        flex: 1
    }, {
        header: 'Section',
        dataIndex: 'section_name',
        flex: 1
    },
     {
        header: 'Reference No',
        dataIndex: 'reference_no',
        flex: 1
    }, {
        header: 'Tracking No',
        dataIndex: 'tracking_no',
        flex: 1
    }, {
        header: 'Brand Name',
        dataIndex: 'brand_name',
        flex: 1
    },{
        header: 'Common Name',
        dataIndex: 'common_name',
        flex: 1
    }, {
        header: 'Classification',
        dataIndex: 'classification_name',
        flex: 1
    }, {
        header: 'Date Registered',
        dataIndex: 'registration_date',
        flex: 1
    }, {
        header: 'Certificate No',
        dataIndex: 'certificate_no',
        flex: 1
    }],
    plugins: [{
        ptype: 'gridexporter'
    }],
    export_title: 'Trader Registered Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(btn) {
           var store = this.getStore(),
               grid = this.up('grid'),
               trader_id = grid.down('hiddenfield[name=trader_id]').getValue();
 
           store.getProxy().extraParams = {
                        trader_id:trader_id
                }
        },
    },
    {
        xtype: 'hiddenfield',
        name: 'trader_id',
        hidden: true
    }]
});