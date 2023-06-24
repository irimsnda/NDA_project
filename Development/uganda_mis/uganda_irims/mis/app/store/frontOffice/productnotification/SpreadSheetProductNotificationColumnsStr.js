Ext.define('Admin.store.frontOffice.productnotification.SpreadSheetProductNoteColumnsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetproductnotecolumnsstr',
    storeId: 'spreadsheetproductnotecolumnsstr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
     remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getDeviceNotificationSpreadsheet',
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
