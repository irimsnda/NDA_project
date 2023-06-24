
Ext.define('Admin.view.configurations.views.grids.FormFieldRelationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'formFieldRelationGrid',
    cls: 'dashboard-todo-list',
    viewModel: 'configurationsvm',
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
    tbar: [{
        xtype: 'exportbtn'
    },{
        xtype: 'hiddenfield',
        name: 'form_category_id'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        },
        {
            ptype: 'cellediting',
            clicksToEdit: 1,
            editing: true
        }
    ],
    selType: 'cellmodel',
    export_title: 'FormFieldRelationGrid',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                form_category_id = grid.down('hiddenfield[name=form_category_id]').getValue(),
                store = grid.getStore();

            store.getProxy().extraParams = {
                form_category_id: form_category_id
            };
        }
    },{
        xtype: 'button',bind: {
            disabled: '{isReadOnly}'
        },
        text: 'Sync Relations',
        handler: 'syncFormFieldRelations',
        ui: 'soft-green'
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
                proxy: {
                    url: 'configurations/getFormFieldRelations'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 100,
        hidden: true
    },{
        xtype: 'rownumberer'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'label',
        text: 'Field',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'parent_field_id',
        text: 'Is Child Of',
        flex: 1,
        editor: {
            xtype: 'combo',
            valueField: 'id',
            displayField: 'label',
            forceSelection: true,
            queryMode: 'local',
            name: 'parent_field_combo',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        proxy: {
                            url: 'configurations/getMappedFormFieldCombosTable'
                        }
                       },
                  isLoad: true
                },
                afterrender: function(me){
                    var store = me.getStore();
                        store.getProxy().extraParams = {
                            form_category_id: form_category_id
                        };
                }
               
            }
        },
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            var textVal = 'Select Column';
            if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.label;
            }
            return textVal;
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'bind_column',
        text: 'Bind On',
        flex: 1,
        editor: {
            xtype: 'textarea'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'has_logic',
        text: 'Has Logic',
        flex: 1,
        editor: {
            xtype: 'combo',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_confirmations'
                            }
                        }
                       },
                  isLoad: true
                },
               
            }
        },
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            var textVal = 'Select';
            if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
            }
            return textVal;
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'other_logic',
        text: 'Other Logic',
        flex: 1,
        editor: {
            xtype: 'textarea'
        }
    }]
});
