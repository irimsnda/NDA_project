Ext.define('Admin.store.audit_trail.PreviousTableDataMISAuditStr', {
    extend: 'Ext.data.Store',
    alias: 'store.previousTableDataMISAuditStr',
    storeId: 'previousTableDataMISAuditStr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'audittrail/getMISAuditTableData',
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