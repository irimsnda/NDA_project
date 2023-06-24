Ext.define('Admin.store.frontOffice.product.SpreadSheetProductNutrientsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetproductnutrientsstr',
    storeId: 'spreadsheetproductnutrientsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
     
    proxy: {
        type: 'ajax',
        url: 'openoffice/getProductNutrients',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    }
});
