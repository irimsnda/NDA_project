/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.configurations.views.grids.ChecklistTypesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'checklisttypesgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    title: 'Checklist Types',
    width: '85%',
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
    tbar: [{
        xtype: 'button',
        text: 'Add Type',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'checklisttypesfrm',
        winTitle: 'Checklist Type',
        winWidth: '40%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    },{
        xtype: 'combo',
        fieldLabel: 'Module',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'module_id',
        allowBlank: true,
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
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'modules'
                    }
                   }
                },
                isLoad: true
            },
            change: function(combo, newVal, oldVal, eopts) {
                var grid=this.up('grid'),
                    sub_moduleStore = grid.down('combo[name=sub_module_id]').getStore(),
                    filters = JSON.stringify({'module_id':newVal});
                sub_moduleStore.removeAll();
                sub_moduleStore.load({params:{filters:filters}});
                grid.getStore().removeAll();
                grid.getStore().load();
                },

        }
     },{
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'sub_module_id',
        allowBlank: true,
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
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'sub_modules'
                    }
                   }
                },
                isLoad: false
            },
            change: function() {
                var grid = this.up('grid');
            
                grid.getStore().removeAll();
                grid.getStore().load();
            },

        }
     },{
        xtype: 'combo',
        fieldLabel: 'Sections',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'section_id',
        allowBlank: true,
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
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'par_sections'
                    }
                   }
                },
                isLoad: true
            },
            change: function() {
                var grid = this.up('grid');
            
                grid.getStore().removeAll();
                grid.getStore().load();
            },

        }
     },{
        xtype: 'combo',
        fieldLabel: 'Checklist Category',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'checklist_category_id',
        allowBlank: false,
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
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'par_checklist_categories'
                    }
                   }
                },
                isLoad: true
            },
            change: function() {
                var grid = this.up('grid');
            
                grid.getStore().removeAll();
                grid.getStore().load();
            },

        }
     },],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'TFDA Processes',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
                var grid=this.up('grid'),
                       sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
                       module_id = grid.down('combo[name=module_id]').getValue(),
                       section_id = grid.down('combo[name=section_id]').getValue(),
                       checklist_category = grid.down('combo[name=checklist_category_id]').getValue();
                       

                 var store=this.getStore();
                 store.getProxy().extraParams = {
                        sub_module_id:sub_module_id,
                        section_id: section_id,
                        module_id:module_id,
                        checklist_category: checklist_category
                }
            }
    }],
    selModel:{
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Category: {[values.rows[0].data.category_name]}, Section: {[values.rows[0].data.section]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                //groupField: 'checklist_category_id',
                grouper: {
                    groupFn: function (item) {
                        return item.get('checklist_category_id') + item.get('section_id');
                    }
                },
                storeId: 'checklisttypesstr',
                proxy: {
                    url: 'configurations/getChecklistTypes',
                    extraParams:{
                        model_name: 'ChecklistType'
                    }
                }
            },
            isLoad: true
        },
        itemdblclick: function (view, record) {
            var dash = this.up('checklists'),
                items_grid = dash.down('checklistitemsgrid'),
                items_store = items_grid.getStore();
            items_store.load({params: {checklist_type: record.get('id')}});
        },
        select: function(sel, record, index, eOpts) {
            var grid = this,
                container = grid.up('container'),
                itemsGrid = container.down('checklistitemsgrid'),
                type_id = record.get('id'),
                checklist_category_id = record.get('checklist_category_id'),
                store = itemsGrid.getStore();

                itemsGrid.down('hiddenfield[name=checklist_type_id]').setValue(type_id);
                itemsGrid.down('hiddenfield[name=checklist_category_id]').setValue(checklist_category_id);

            store.removeAll();
            store.load();
    
         }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'module',
        text: 'Module',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module',
        text: 'Sub Module',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'order_no',
        text: 'Order No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'device_type_name',
        text: 'Device Type',
        flex: 1,
    },{
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'checklisttypesfrm',
                    winTitle: 'Checklist Type',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'par_checklist_types',
                    storeID: 'checklisttypesstr',
                    action_url: 'workflow/softDeleteWorkflowRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteConfigWidgetParam'
                }, 
                // {
                //     text: 'Unlink',
                //     iconCls: 'fa fa-unlink',
                //     tooltip: 'Unlink Record',
                //     table_name: 'par_checklist_types',
                //     storeID: 'checklisttypesstr',
                //     action_url: 'workflow/unlinkWorkflowRecord',
                //     action: 'Unlink',
                //     column_array: 'checklist_category_id,section_id,sub_module_id',
                //     handler: 'doUnlinkConfigWidgetParam',
                //     hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                // },
                {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'par_checklist_types',
                    storeID: 'checklisttypesstr',
                    action_url: 'workflow/undoWorkflowSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    handler: 'doDeleteConfigWidgetParam'
                }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var is_enabled = rec.get('is_enabled');
            if (is_enabled === 0 || is_enabled == 0) {
                widget.down('menu menuitem[action=enable]').setDisabled(false);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(true);
            } else {
                widget.down('menu menuitem[action=enable]').setDisabled(true);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(false);
            }
        }
    }]
});
