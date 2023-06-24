Ext.define('Admin.store.summaryreport.AgeAnalysisDateSpanStr', {
    extend: 'Ext.data.Store',
    alias: 'store.ageAnalysisDateSpanStr',
    storeId: 'ageAnalysisDateSpanStr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
            type: 'ajax',
            method: 'GET',
            url: 'commonparam/getCommonParamFromTable',
            
            headers: {
                'Authorization':'Bearer '+access_token
            },
            reader: {
                type: 'json',
                idProperty: 'id',
                rootProperty: 'results',
                messageProperty: 'message'
            }
        }
});