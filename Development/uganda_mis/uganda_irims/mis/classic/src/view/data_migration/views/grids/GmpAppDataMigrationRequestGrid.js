
Ext.define('Admin.view.applicationsammendment.views.grids.GmpAppDataMigrationRequestGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'applicationdatmigrationvctr',
    xtype: 'gmpappdatamigrationrequestgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    plugins: [{
            ptype: 'gridexporter'
        },{
            ptype: 'filterfield'
        }
    ],
     features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                storeId: 'gmpappdatamigrationrequestgridstr',
                pageSize: 200, 
                remoteFilter: false,
                totalProperty:'totals',
                proxy: {
                    url: 'migrationscripts/getAppdataMigrationRequests',
                    reader: {
                        type: 'json',
                        totalProperty: 'totals'
                    },
                }
            },
            isLoad: true
        }, afterrender: function(grid){

            var store = grid.getStore();
                store.removeAll();
                store.load();
       },
    }, 
    viewConfig:{
        emptyText:'No Record Found'
    },
       tbar:[{
        xtype: 'button',
        text: 'New Migration Request',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        winTitle: 'New Migration Request',
        winWidth: '35%',
        form: 'appdatamigrationrequestfrm',
        handler: 'showappdatamigrationrequestsfrm',
        stores: '[]'
    },,{
        xtype: 'combo',
        emptyText: 'SECTION',
        labelWidth: 80,
        width: 260,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'section_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        extraParams: {
                            model_name: 'Section'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    },'->', {
        xtype: 'combo',
        emptyText: 'SECTION',
        labelWidth: 80,
        width: 260,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'section_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        extraParams: {
                            model_name: 'Section'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }, {
        xtype: 'combo',
        emptyText: 'SUB MODULE',
        labelWidth: 80,
        width: 260,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule'
                        }
                    }
                },
                isLoad: false
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
                grid.getStore().load();
            },
            afterrender:function(cbo){
                var grid = cbo.up('grid'),
                    module_id = grid.module_id,
                    sub_module_str = cbo.getStore();
                    sub_module_str.removeAll();
                    sub_module_str.load({params: {module_id: module_id}});
                    grid.getStore().load();

            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    } ],
    columns: [{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Edit Migration Request',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Workflow',
                    action: 'edit',
                    form: 'appdatamigrationrequestfrm',
                    winTitle: 'WorkFlow',
                    winWidth: '35%',
                    handler: 'showappdatamigrationrequestsfrmEdit',
                    stores: '[]'
                }, {
                    text: 'Initiate/Get Application Migration',
                    iconCls: 'x-fa fa-bars',
                    table_name: 'tra_gmpapps_datamigration',storeID: 'gmpappdatamigrationrequestgridstr',
                    title: 'GMP Application Migration',
                    tooltip: 'Application Migration Request',
                    handler: 'renderAppDataMigrationsGridColumnsConfig',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'tra_datamigrationrequests',
                    storeID: 'gmpappdatamigrationrequestgridstr',
                    action_url: 'workflow/softDeleteWorkflowRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteWorkflowWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_datamigrationrequests',
                    storeID: 'gmpappdatamigrationrequestgridstr',
                    action_url: 'workflow/deleteWorkflowRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteWorkflowWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'sub_module',
        text: 'Sub Module',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        text: 'Section Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                module_id = grid.module_id,
                section_id = grid.down('combo[name=section_id]').getValue();
                sub_module_id = grid.down('combo[name=section_id]').getValue();

                store.getProxy().extraParams = {
                    module_id: module_id,
                    sub_module_id:sub_module_id,
                    section_id:section_id
                }
        }
    }],
});
