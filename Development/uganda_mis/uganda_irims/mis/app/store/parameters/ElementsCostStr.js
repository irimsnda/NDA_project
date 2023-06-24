Ext.define('Admin.store.parameters.ElementsCostStr', {
    extend: 'Ext.data.Store',
    alias: 'store.elementscoststr',
    storeId: 'elementscoststr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
            type: 'ajax',
            method: 'GET',
            url: 'commonparam/getelementcost?table_name=cost_elements',
            
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