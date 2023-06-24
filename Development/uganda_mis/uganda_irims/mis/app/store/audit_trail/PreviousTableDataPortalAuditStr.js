Ext.define('Admin.store.audit_trail.PreviousTableDataPortalAuditStr', {
    extend: 'Ext.data.Store',
    alias: 'store.previousTableDataPortalAuditStr',
    storeId: 'previousTableDataPortalAuditStr',
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