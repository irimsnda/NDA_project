Ext.define('Admin.view.parameters.views.grids.PaymentIntervalsGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersGrid',
    alias: 'widget.paymentintervalsgrid',
    title: 'Fee Types',
    itemId: 'paymentintervalsgrid',
    store: 'paymentintervalsstr',
    tbar: [{
        xtype: "button",
        text: "Add Fee Type",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'paymentintervalfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm'
    }, {
        xtype: "button",
        text: "Merge Fee Types",
        itemId: "mergeBtn",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        action: 'merge',
        mergeGrid: 'paymentintervalsmergegrid',
        form: 'paymentintervalsmergefrm',
        ui: 'soft-green',
        disabled: true,
        handler: 'showMergeParameterWin',
    }, {
        xtype: 'exportbtn',
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'paymentintervalsstr',
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
            dataIndex: 'duration',
            text: 'Duraion',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'unit',
            text: 'Unit',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'fixed',
            text: 'Fixed',
            flex: 1,
            renderer: function (value) {
                if(value) {
                    return "True";
                }
                return "False";
            }
        },{
            xtype: 'gridcolumn',
            dataIndex: 'fixed_entry_point',
            text: 'Fixed Entry Point',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'notificaion_time_interval',
            text: 'Notification Time Interval',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'notification_time_interval_unit',
            text: 'Notification Time Interval Unit',
            flex: 1
        }, {
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
                form: 'paymentintervalfrm',
                action: 'edit',
                action_url: 'parameters/paymentinterval',
                entity: 'paymentintervals',
                store: 'paymentintervalsstr',
                handler: 'showEditParameterFrm'
            },{
                text: 'Enable',
                iconCls: 'fa fa-undo',
                tooltip: 'Enable Record',
                action: 'enable',
                action_url: 'parameters/paymentinterval',
                action_type: 'enable',
                entity: 'paymentintervals',
                store: 'paymentintervalsstr',
                handler: 'doDeleteParameter'
            },{
                text: 'Delete (soft)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                action: 'delete',
                action_url: 'parameters/paymentinterval',
                action_type: 'soft',
                store: 'paymentintervalsstr',
                entity: 'regions',
                handler: 'doDeleteParameter'
            }, {
                text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                form: 'paymentintervalfrm',
                action: 'delete',
                action_url: 'parameters/paymentinterval',
                action_type: 'actual',
                store: 'paymentintervalsstr',
                entity: 'paymentintervals',
                handler: 'doDeleteParameter'
            }]
        }

    },
});