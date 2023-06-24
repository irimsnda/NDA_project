Ext.define('Admin.store.frontOffice.importexport.SpreadSheetIEProductStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetieproductstr',
    storeId: 'spreadsheetieproductstr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getIEproducts',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message',
            totalProperty: 'totalResults'
        }
    }

});

