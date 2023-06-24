Ext.define('Admin.store.frontOffice.enquiries.EnquiriesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.enquiriesStr',
    storeId: 'enquiriesStr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getEnquiries',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message',
            totalProperty: 'totalResults'
        }
    }

});

