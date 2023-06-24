Ext.define('Admin.view.parameters.views.grids.ProductTypesGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersGrid',
    alias: 'widget.producttypesgrid',
    title: 'Product Types',
    itemId: 'producttypesgrid',
    store: 'producttypesstr',
    tbar: [{
        xtype: "button",
        text: "Add Product Type",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'producttypefrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm'
    }, {
        xtype: "button",
        text: "Merge Product Types",
        itemId: "mergeBtn",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        action: 'merge',
        mergeGrid: 'producttypesmergegrid',
        form: 'producttypesmergefrm',
        ui: 'soft-green',
        disabled: true,
        handler: 'showMergeParameterWin',
    }, {
        xtype: 'exportbtn',
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'producttypesstr',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    columns: [
        {
            xtype: 'rownumberer'
        }, {
            xtype: 'checkcolumn',
            text: 'select',
            dataIndex: 'selected',
            listeners: {
                checkChange: function (cell, rowIdx, checked, record) {
                    var items = record.store.getData().items;
                    var disable = true;
                    for(var i = 0; i < items.length; i++){
                        if(items[i].data.selected) {
                            disable = false;
                            break;
                        }
                    }

                    var button = Ext.ComponentQuery.query('button[itemId=mergeBtn]')[0];
                    if(!disable) {
                        button.enable();
                    } else {
                        button.disable();
                    }
                }
            }
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'name',
            text: 'Name',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'gl_code',
            text: 'GL code',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'cost_subcategory_name',
            text: 'Cost SubCategory',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'description',
            text: 'Description',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'is_enabled',
            text: 'Enabled',
            flex: 1,
            renderer: function (value, metaData) {
                if(value) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return "True";
                }

                metaData.tdStyle = 'color:white;background-color:red';
                return "False";
            }
        }, {
            text: 'Options',
            xtype: 'widgetcolumn',
            width: 90,
            widget: {
                width: 75,
                ui: 'gray',
                iconCls: 'x-fa fa-th-list',
                textAlign: 'left',
                xtype: 'splitbutton',
                menu: {
                    xtype: 'menu',
                    items: []
                }
            }

        }],
    listeners:{
        beforerender:function(me){
            me.store.removeAll();
            me.store.clearFilter();
            me.store.proxy.extraParams = {all: 1};
            me.store.load();
            me.columns[me.columns.length - 1].widget.menu.items = [{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Record',
                form: 'producttypefrm',
                action: 'edit',
                action_url: 'parameters/producttype',
                table_name: 'par_product_types',
                store: 'producttypesstr',
                handler: 'showEditParameterFrm'
            },{
                text: 'Enable',
                iconCls: 'fa fa-undo',
                tooltip: 'Enable Record',
                action: 'enable',
                action_type: 'enable',
                table_name: 'par_product_types',
                store: 'producttypesstr',
                handler: 'doDeleteRecord'
            },{
                text: 'Delete (soft)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                action: 'delete',
                action_type: 'soft',
                store: 'producttypesstr',
                table_name: 'par_product_types',
                handler: 'doDeleteRecord'
            }, {
                text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                action: 'delete',
                action_type: 'actual',
                store: 'producttypesstr',
                table_name: 'par_product_types',
                handler: 'doDeleteRecord'
            }];
        }
    }
});