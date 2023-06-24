Ext.define('Admin.store.parameters.ProductTypesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.producttypesstr',
    storeId: 'producttypesstr',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getProductTypes',
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
