/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.PreviousImportExportScreeningGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'previousimportexportscreeninggrid',
    table_name: 'tra_importexport_applications',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'importexportpermitreleasegridStr',
                proxy: {
                    url: 'importexportpermits/getPreviousPreviousScreeningData'
                }
            },
            isLoad: true,
            autoLoad: true
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('previousimportexportscreeninggrid').fireEvent('refresh', this);//
        }
    }],
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'detail',tdCls:'wrap-text',
        text: 'Details',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'comments',
        text: 'Comments',
        tdCls:'wrap-text',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query',
        text: 'Query',tdCls:'wrap-text',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query_response',tdCls:'wrap-text',
        text: 'Query Response',
        flex: 1
    }]
});
