Ext.define('Admin.view.parameters.views.grids.locations.Confirmations_grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.confirmations_grid',
    cls: 'dashboard-todo-list',
    header: false,
    collapseMode: 'header',
    title: 'Confirmation Grid Panel',
    hideHeaders: false,
    scroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 116,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No Confirmation Options Available'
    },
    listeners:{
		beforerender:function(me){
			var store = me.store;
				store.removeAll();
				store.load();
		}
	},
    tbar: [{
        xtype: 'button',
        text: 'Add Option',
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'confirmationsfrm',
        ui: 'soft-green',
        win: 'confirmation_win',
        winTitle: 'Add Confirmation Options',
        handler: 'showParamWin',
        stores: '[]'
    },{
        xtype: 'exportbtn',
       
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'confirmStr',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    store: 'confirmStr',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    columns: [{
        xtype: 'rownumberer'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'flag',
        text: 'Flag',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
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
            //text: 'Action',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    win: 'confirmation_win',
                    winTitle: 'Edit Confirmation Option',
                    form: 'confirmationsfrm',
                    handler: 'showConfigEditWin',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'confirmations',
                    store: 'confirmStr',
                    action_url: 'parameters/deleteRecord',
                    action: 'delete',
                    handler: 'doDeleteParam'
                }
                ]
            }
        }

    }]

});
