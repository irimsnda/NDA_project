Ext.define('Admin.store.audit_trail.CurrentTableDataAuditStr', {
    extend: 'Ext.data.Store',
    alias: 'store.currentTableDataAuditStr',
    storeId: 'currentTableDataAuditStr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromTable',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message',
        }
    }

});
