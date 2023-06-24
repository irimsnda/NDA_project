Ext.define('Admin.view.administration.views.grids.AddGroupUsersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'addgroupusersgrid',
    cls: 'dashboard-todo-list',
    header: false,
    controller: 'administrationvctr',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'group_id'
    },{
        xtype: 'combo',
        fieldLabel: 'Directorate',
        margin: '0 20 20 0',
        name: 'directorate_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setAdminCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_directorates'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid'),
                    depStore = grid.down('combo[name=department_id]').getStore(),
                    filters = JSON.stringify({'directorate_id':newVal});
                depStore.removeAll();
                depStore.load({params: {filters: filters}});

            var store = this.up('grid').getStore();
                store.reload();
            },
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Departments',
        margin: '0 20 20 0',
        name: 'department_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setAdminCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_departments'
                        }
                    }
                },
                isLoad: false
            },
            change: function() {
                var store = this.up('grid').getStore();
                store.reload();
            },
           
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid = this.up('grid'),
                store= grid.getStore(),
                directorate_id = grid.down('combo[name=directorate_id]').getValue(),
                department_id = grid.down('combo[name=department_id]').getValue();

                store.removeAll();
                store.getProxy().extraParams = {
                    directorate_id: directorate_id,
                    department_id: department_id
                };
            }
    },'->',{
        xtype: 'button',
        text: 'Sync',
        action: 'sync',
        disabled: true,
        ui: 'soft-purple',
        handler: 'sysncUserGroup'
    }
    ],

    selModel:{
        selType: 'checkboxmodel'
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setAdminGridsStore',
            config: {
                pageSize: 100,
                storeId: 'addgroupuserstr',
                proxy: {
                    url: 'usermanagement/getActiveSystemUsers',
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[action=sync]').setDisabled(false);
            }
        },
        afterrender: function () {
            var grid = this,
                group_id = grid.down('hiddenfield[name=group_id]').getValue(),
                sm = grid.getSelectionModel();
                    console.log(group_id);
                
            grid.store.on('load', function (store, records, options) {
                Ext.each(records, function (record) {
                    console.log(record.data.group_id);
                    var rowIndex = store.indexOf(record);
                    if (record.data.group_id == group_id) {
                        sm.select(rowIndex, true);
                    }
                });
            })
        },
        deselect: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[action=sync]').setDisabled(true);
            }
        }
    },
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'id',
        hidden: true,
        text: 'user_ID',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'fullnames',
        text: 'Full Names',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'username',
        text: 'Username',
        flex: 1,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email',
        text: 'Email Address',
        flex: 1,
        renderer: function (value) {
            return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
        }
    }]
});
