/**
 * Created by Kip on 7/9/2018.
 */
Ext.define('Admin.store.MigrationDataTypeStr', {
    extend: 'Ext.data.Store',
    storeId: 'migrationdatatypestr',
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
		url: 'configurations/getNonrefParameter',
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'msg'
        },
		 extraParams:{
                        table_name: 'par_migration_data_types'
                    }
    }
});

