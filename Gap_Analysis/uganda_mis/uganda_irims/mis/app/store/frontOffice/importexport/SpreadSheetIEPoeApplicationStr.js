Ext.define('Admin.store.frontOffice.importexport.SpreadSheetIEPoeApplicationStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetiepoeapplicationstr',
    storeId: 'spreadsheetiepoeapplicationstr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
    
    proxy: {
        type: 'ajax',
       url: 'openoffice/getPoeApplicationDetails',
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

