/**
 * Created by Softclans on 2/12/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.ApplicationPrevCommentsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'applicationprevcommentsgrid',
    autoScroll: true,
    autoHeight: true,
    height: 400,
    width: '100%',
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
    tbar: [
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'comment_type_id'
        }
    ],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Application comments',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                application_id = grid.down('hiddenfield[name=application_id]').getValue(),
                application_code = grid.down('hiddenfield[name=application_code]').getValue(),
                comment_type_id = grid.down('hiddenfield[name=comment_type_id]').getValue();
            store.getProxy().extraParams = {
                application_id: application_id,
                application_code: application_code,
                comment_type_id: comment_type_id
            }
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'applicationprevcommentsstr',
                proxy: {
                    url: 'getApplicationComments'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'recommendation',
        text: 'Recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'comment',
        text: 'Comment',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'created_on',
        text: 'Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'author',
        text: 'Author',
        flex: 1
    }]
});
