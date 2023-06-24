Ext.define('Admin.store.audit_trail.AllTransRecordAuditStr', {
    extend: 'Ext.data.Store',
    alias: 'store.alltransRecordAuditStr',
    storeId: 'alltransRecordAuditStr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'audittrail/getAllAuditTrans',
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