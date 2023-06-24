Ext.define('Admin.store.frontOffice.product.SpreadSheetProductIngridientStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetproductingridientsstr',
    storeId: 'spreadsheetproductingridientsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
      pageSize:25,
    proxy: {
        type: 'ajax',
        url: 'openoffice/getProductIngredients',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            totalProperty: 'TotalCount',
            messageProperty: 'message'
        }
    }
});
