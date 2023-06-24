Ext.define('Admin.store.frontOffice.SpreadSheetApplicationTypesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetapplicationtypesstr',
    storeId: 'spreadsheetapplicationtypesstr',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromTable?table_name=par_sections',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    },
   listeners: {
                     load: function (store, operation, eOpts) {
                        var all={name: 'All',id:' '};
                       store.insert(0, all);
                     }
                 }
});
