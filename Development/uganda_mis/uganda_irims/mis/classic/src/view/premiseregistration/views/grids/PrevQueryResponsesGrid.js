/**
 * Created by Kip on 10/8/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PrevQueryResponsesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'prevqueryresponsesgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 500,
    frame: true,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No Previous Responses',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'exportbtn',
        hidden: true
    }, {
        xtype: 'hiddenfield',
        name: 'query_id'
    }, {
        xtype: 'tbspacer',
        width: 20
    }, {
        xtype: 'displayfield',
        name: 'query_desc',
        fieldLabel: 'Query',
        labelWidth: 50,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        labelStyle: 'font-weight:bold'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Queries',
    bbar: [{
        xtype: 'button',
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        ui: 'soft-purple',
        handler: function () {
            this.up('window').close();
        }
    }, {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.store,
                grid = this.up('grid'),
                query_id = grid.down('hiddenfield[name=query_id]').getValue();
            store.getProxy().extraParams = {
                query_id: query_id
            };
        }
    }],
    /*  features: [{
          ftype: 'searching',
          minChars: 2,
          mode: 'local'
      }],*/
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'prevqueryresponsesstr',
                proxy: {
                    url: 'premiseregistration/getQueryPrevResponses'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'query_comment',
        text: 'Query Comment',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'response',
        text: 'Response',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'comment',
        text: 'Response Comment',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'created_on',
        text: 'Response Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    }]
});
