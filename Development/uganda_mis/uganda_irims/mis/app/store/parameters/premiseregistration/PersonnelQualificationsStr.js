Ext.define('Admin.store.parameters.premiseregistration.PersonnelQualificationsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.personnelqualificationsstr',
    storeId: 'personnelqualificationsstr',
    requires: [
        'Admin.model.parameters.PersonnelQualificationMdl'
    ],
    model: 'Admin.model.parameters.PersonnelQualificationMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromModel',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        },
        extraParams: {
            model_name: 'Qualification'
        }
    }
});
