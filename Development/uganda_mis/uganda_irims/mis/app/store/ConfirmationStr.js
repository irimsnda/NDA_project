/**
 * Created by Kip on 7/9/2018.
 */
Ext.define('Admin.store.ConfirmationStr', {
    extend: 'Ext.data.Store',
    storeId: 'confirmationstr',
    requires: [
        'Admin.model.administration.AdministrationMdl'
    ],
    model: 'Admin.model.administration.AdministrationMdl',
    autoLoad: true,
    sorters: {
        property: 'flag',
        direction: 'desc'
    },
    proxy: {
        type: 'ajax',
        url: 'getCommonParamFromModel',
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'msg'
        },
        extraParams: {
            model_name: 'Confirmation'
        }
    }
});

