Ext.define('Admin.store.audit_trail.UpdatedTableDataPortalAuditStr', {
    extend: 'Ext.data.Store',
    alias: 'store.updatedTableDataPortalAuditStr',
    storeId: 'updatedTableDataPortalAuditStr',
    autoLoad: false,
    defaultRootId: 'root',
    
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'audittrail/getPortalAuditTableData',
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