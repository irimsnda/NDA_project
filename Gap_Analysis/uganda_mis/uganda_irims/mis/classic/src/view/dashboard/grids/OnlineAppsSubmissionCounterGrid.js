/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.dashboard.grids.OnlineAppsSubmissionCounterGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'onlineappssubmissioncountergrid',
    controller: 'dashboardvctr',
    viewConfig: {
        deferEmptyText: false,
        preserveScrollOnReload: true,
        enableTextSelection: true,
        emptyText: 'No Details Available'
    },
    margin: 3,
    tbar: [{
        xtype: 'tbspacer',
        width: 5
    }, {
        xtype: 'combo',
        emptyText: 'SECTION',
        labelWidth: 80,
        width: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'section_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'darkblue',
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
        emptyText: 'MODULE',
        labelWidth: 80,
        width: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'darkblue',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'Module'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid'),
                    sub_module = grid.down('combo[name=sub_module_id]'),
                    sub_module_str = sub_module.getStore();
                sub_module_str.removeAll();
                sub_module_str.load({params: {module_id: newVal}});
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
        width: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'darkblue',
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
    },{
        xtype: 'combo',
        emptyText: 'ZONE',
        labelWidth: 80,
        width: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'zone_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'darkblue',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_zones'
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
    }],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            store: 'onlineappssubmissioncounterstr',
            width: '60%',
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    section_id = grid.down('combo[name=section_id]').getValue(),
                    module_id = grid.down('combo[name=module_id]').getValue(),
                    zone_id = grid.down('combo[name=zone_id]').getValue(),
                    sub_module_id = grid.down('combo[name=sub_module_id]').getValue();
                    store.getProxy().extraParams = {
                        section_id: section_id,
                        module_id: module_id,
                        zone_id:zone_id,
                        sub_module_id: sub_module_id
                    };
            }
        },
        '->',,'->',
        {
            xtype: 'exportbtn'
        }
    ],
    listeners: {
        beforerender: function () {
            var store = this.getStore();
            store.removeAll();
            store.load();
            
        }
    },
  
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    export_title: 'Intray',
    store: 'onlineappssubmissioncounterstr',
    columns: [{
            xtype: 'gridcolumn',
            text: 'Process Name',
            dataIndex: 'process_name',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Module',
            dataIndex: 'module_name',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Sub Module',
            dataIndex: 'sub_module_name',
            flex: 1,
            tdCls: 'wrap-text'
        },
        {
            xtype: 'gridcolumn',
            text: 'Section Name',
            dataIndex: 'section_name',
            flex: 1,
            tdCls: 'wrap-text'
        },{
            xtype: 'gridcolumn',
            text: 'Zone',
            dataIndex: 'zone_name',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Application Status',
            dataIndex: 'application_status',
            flex: 1,
            tdCls: 'wrap',
            
        },
        {
            xtype: 'gridcolumn',
            text: 'Application Counter',
            dataIndex: 'application_counter',
            flex: 1,
            tdCls: 'wrap'
            
        }
    ]
});