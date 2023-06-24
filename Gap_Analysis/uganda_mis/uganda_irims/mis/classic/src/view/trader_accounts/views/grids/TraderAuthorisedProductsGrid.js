Ext.define('Admin.view.trader_accounts.views.grid.TraderAuthorisedProductsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'traderauthorisedproductsgrid',
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
                storeId: 'traderauthorisedproductsgridstr',
                proxy: {
                    url: 'tradermanagement/getTraderAuthorisedProducts'
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
    },{
        header: 'Registrant',
        dataIndex: 'registrant',
        flex: 1
    },{
        header: 'Local Agent',
        dataIndex: 'local_agent',
        flex: 1
    },
     {
        header: 'Reference No',
        dataIndex: 'reference_no',
        flex: 1
    }, {
        header: 'Certificate No',
        dataIndex: 'certificate_no',
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
    },{
        header: 'Expiry Date',
        dataIndex: 'expiry_date',
        flex: 1
    }, {
        header: 'Registration Status',
        dataIndex: 'registration_status',
        flex: 1
    }, {
        header: 'Validity Status',
        dataIndex: 'validity_status',
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