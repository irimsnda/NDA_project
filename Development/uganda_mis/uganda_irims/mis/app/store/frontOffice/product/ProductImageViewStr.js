Ext.define('Admin.store.frontOffice.product.ProductImageViewStr', {
    extend: 'Ext.data.Store',
    alias: 'store.productimageviewstr',
    storeId: 'productimageviewstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
     
    proxy: {
        type: 'ajax',
        url: 'openoffice/getproductimage',
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
