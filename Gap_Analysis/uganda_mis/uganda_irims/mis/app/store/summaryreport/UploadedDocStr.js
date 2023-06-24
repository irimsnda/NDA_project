Ext.define('Admin.store.summaryreport.UploadedDocStr',{
    extend: 'Ext.data.Store',
    alias: 'store.uploadedDocStr',
    storeId: 'uploadedDocStr',
    enablePaging: true,
    groupField: 'document_type',
    proxy: {
        type: 'ajax',
        url: 'summaryreport/getUploadedDocs',
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
    },
    autoLoad: false,
  
});