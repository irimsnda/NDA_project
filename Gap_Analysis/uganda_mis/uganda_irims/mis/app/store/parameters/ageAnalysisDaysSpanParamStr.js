Ext.define('Admin.store.parameters.AgeAnalysisDaysSpanParamStr', {
    extend: 'Ext.data.Store',
    alias: 'store.ageAnalysisDaysSpanParamStr',
    storeId: 'ageAnalysisDaysSpanParamStr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getAgeAnalysisDaysSpanParam',
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
