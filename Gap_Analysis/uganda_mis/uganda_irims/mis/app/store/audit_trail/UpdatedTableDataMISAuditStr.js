Ext.define('Admin.store.audit_trail.UpdatedTableDataMISAuditStr', {
    extend: 'Ext.data.Store',
    alias: 'store.updatedTableDataMISAuditStr',
    storeId: 'updatedTableDataMISAuditStr',
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