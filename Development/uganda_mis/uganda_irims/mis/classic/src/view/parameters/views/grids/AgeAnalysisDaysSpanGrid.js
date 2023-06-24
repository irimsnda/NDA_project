Ext.define('Admin.view.parameters.views.grids.AgeAnalysisDaysSpanParamGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersGrid',
    alias: 'widget.ageAnalysisDaysSpanParamGrid',
    title: 'Age Analysis Days Span',
    itemId: 'ageAnalysisDaysSpanParamGrid',
    store: 'ageAnalysisDaysSpanParamStr',
    tbar: [{
        xtype: "button",
        text: "Add Days Span",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'ageAnalysisDaysSpanParamFrm',
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
            dataIndex: 'module',
            text: 'Module',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'min_days',
            text: 'Min Days',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'max_days',
            text: 'Max Days',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'order_no',
            text: 'Order No',
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
                form: 'ageAnalysisDaysSpanParamFrm',
                action: 'edit',
                action_url: 'parameters/ageAnalysisDaysSpan',
                entity: 'ageAnalysisDaysSpan',
                store: 'ageAnalysisDaysSpanParamStr',
                handler: 'showEditParameterFrm'
            },
           {
               text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                table_name: 'par_ageanalysisdays_span',
                storeID: 'ageAnalysisDaysSpanParamStr',
                action: 'actual_delete',
                action_url: 'configurations/deleteConfigRecord',
                handler: 'doDeleteConfigWidgetParam',
                hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
            }];
        }
    }
});