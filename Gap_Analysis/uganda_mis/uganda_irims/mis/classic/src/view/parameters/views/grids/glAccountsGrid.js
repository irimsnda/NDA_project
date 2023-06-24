Ext.define('Admin.view.parameters.views.grids.glAccountsGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersGrid',
    alias: 'widget.glaccountsgrid',
    title: 'Fee Types',
    itemId: 'glaccountsgrid',
    store: 'glaccountsstr',
    tbar: [{
        xtype: "button",
        text: "Add GL Account",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'glaccountsfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm'
    }, {
        xtype: 'exportbtn',
    }],
  /*  bbar: [{
        xtype: 'pagingtoolbar',
        store: 'glaccountsstr',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],*/
    columns: [
        {
            xtype: 'rownumberer'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'name',
            text: 'Name',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'tfda_code',
            text: 'TFDA code',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'code',
            text: 'GL code',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'description',
            text: 'Description',
            flex: 1
        },
        {
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
    },
         {
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
                form: 'glaccountsfrm',
                action: 'edit',
                action_url: 'parameters/glaccounts',
                entity: 'glaccounts',
                store: 'glaccountsstr',
                handler: 'showEditParameterFrm'
            },
           {
               text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                table_name: 'par_gl_accounts',
                storeID: 'glaccountsstr',
                action: 'actual_delete',
                action_url: 'configurations/deleteConfigRecord',
                handler: 'doDeleteConfigWidgetParam',
                hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
            }];
        }
    }
});