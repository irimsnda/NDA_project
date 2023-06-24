Ext.define('Admin.store.frontOffice.gmp.SpreadSheetFacilityLocationStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetfacilitylocationstr',
    storeId: 'spreadsheetfacilitylocationstr',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromTable?table_name=par_gmplocation_details',
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
 
});
