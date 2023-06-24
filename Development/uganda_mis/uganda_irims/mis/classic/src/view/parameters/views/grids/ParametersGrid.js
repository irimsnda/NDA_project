Ext.define('Admin.view.parameters.views.grids.ParametersGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.parametersgrid',
    header: false,
    collapseMode: 'header',
    title: 'Parameter',
    hideHeaders: false,
    scroll: true,
    autoHeight: true,
    width: '100%',
    controller: 'parametervctr',
    height: Ext.Element.getViewportHeight() - 116,
    viewConfig: {
        deferEmptyText: false,
        emptyText: "No Records found",
        style:{
            'text-align':'center'
        }
    },
    plugins:[
        {
            ptype: 'gridexporter'
        }
    ],
    tbar: [],
    bbar: [],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
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
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'code',
        text: 'Code',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
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

    }
    ]

});
