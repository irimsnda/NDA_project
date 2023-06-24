/**
 * Created by Kip on 7/9/2018.
 */
Ext.define('Admin.store.Misv1TablesListStr', {
    extend: 'Ext.data.Store',
    storeId: 'misv1tablesliststr',
    requires: [
        'Admin.model.administration.AdministrationMdl'
    ],
    model: 'Admin.model.administration.AdministrationMdl',
    autoLoad: false,
    sorters: {
        property: 'flag',
        direction: 'desc'
    },
    proxy: {
        type: 'ajax',
		url: 'migrationscripts/getMisv1Tableslist',
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'msg'
        }
    }
});

//

