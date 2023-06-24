/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.grids.MigrationSetupGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'migrationsetupgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    plugins: [{
        ptype: 'gridexporter'
    }, {
        ptype: 'cellediting',
        clicksToEdit: 1
    },{
        ptype: 'filterfield'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    },{
        text: 'Sync/Save Migration Setup',
       
        ui: 'soft-purple',
        iconCls: 'x-fa fa-save',
        name: 'sync_migrationsetups',
        handler: 'funcSyncMigrationSetup'
    },{
        text: 'Initiate Migration Process',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-save',
        name: 'initiate_migrationsetups',
        handler: 'funcInitiate_migrationsetups'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'migrationsetupgridstr',
                proxy: {
                    url: 'migrationscripts/getMigrationSetupDetails',
                  
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',flex: 0.3
    },{
        xtype: 'gridcolumn',
        dataIndex: 'v2_mistable',
        text: 'MIS V2 Table Name',
        flex: 1,
        tdCls: 'wrap-text',
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'v1_mistable',
        text: 'MIS V1 Table Name',
        flex: 1,
        filter: {
            xtype: 'combo',
            store: 'misv1tablesliststr',
            queryMode: 'local',
            valueField: 'table_name',
            displayField: 'table_name'
        },
        editor: {
            xtype: 'combo',
            store: 'misv1tablesliststr',
            valueField: 'table_name',
            displayField: 'table_name',
            queryMode: 'local'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'column_defination',
        text: 'Migration Column Defination',
        flex: 1,
        tdCls: 'wrap-text',
        editor: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'migration_data_type_id',
        text: 'Migration Data Type',
        flex: 1,
        editor: {
            xtype: 'combo',
            store: 'migrationdatatypestr',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local'
        },
        filter: {
            xtype: 'combo',
            store: 'migrationdatatypestr',
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name'
        },
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            var textVal = '';
            if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
            }
            return textVal;
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1 ,
        editor: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'migration_status',
        text: 'Migration Status',
        flex: 0.5, 
        renderer: function (value, metaData,record) {
            migration_status_id = record.get('migration_status_id');
            if(migration_status_id == 1) {
                metaData.tdStyle = 'color:white;background-color:red';
                return value;
            }
            else if(migration_status_id > 1){
                metaData.tdStyle = 'color:white;background-color:green';
                return value;

            }
            else{
                metaData.tdStyle = 'color:white;background-color:red';
                return 'Migration Not Set';
            }
        }
    },{
        xtype: 'gridcolumn',
        dataIndex:'record_id',
        text: 'Mapping Status(Table Link)',
        flex: 0.5,
        renderer: function (value, metaData) {
            if(value >0) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Mapped";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "Not Mapped";
        }
    },{
        xtype: 'gridcolumn',
        dataIndex:'record_id',
        text: 'Action(s)',
        flex: 0.5
    }]
});
