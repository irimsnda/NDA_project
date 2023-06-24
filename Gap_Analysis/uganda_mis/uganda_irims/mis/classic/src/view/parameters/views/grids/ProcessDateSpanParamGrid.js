Ext.define('Admin.view.parameters.views.grids.ProcessDateSpanParamGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersGrid',
    alias: 'widget.processDateSpanParamGrid',
    title: 'Process Dates Defination',
    itemId: 'processDateSpanParamGrid',
    store: 'processDateSpanParamStr',
    tbar: [{
        xtype: "button",
        text: "Add Days Span",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'processDateSpanParamFrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm'
    }, {
        xtype: 'exportbtn',
    }],
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
                form: 'processDateSpanParamFrm',
                action: 'edit',
                action_url: 'parameters/processDateSpan',
                entity: 'processDateSpan',
                store: 'processDateSpanParamStr',
                handler: 'showEditParameterFrm'
            },
           {
               text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                table_name: 'par_processdatespan_defination',
                storeID: 'processDateSpanParamStr',
                action: 'actual_delete',
                action_url: 'configurations/deleteConfigRecord',
                handler: 'doDeleteConfigWidgetParam',
                hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
            }];
        }
    }
});