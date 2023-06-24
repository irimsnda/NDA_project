Ext.define('Admin.store.parameters.glAccountsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.glaccountsstr',
    storeId: 'glaccountsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getglaccounts',
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
