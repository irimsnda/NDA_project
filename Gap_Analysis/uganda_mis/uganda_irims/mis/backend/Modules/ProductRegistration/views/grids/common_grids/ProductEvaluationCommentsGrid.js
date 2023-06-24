/**
 * Created by Softclans
 * User Robinson odhiambo
 * on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductEvaluationCommentsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'productevaluationcommentsgrid',
    cls: 'dashboard-todo-list',
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
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'button',
        text: 'Add Comment',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        bind:{
            disabled: '{isReadOnly}'
        },
        name: 'add_btn',
        handler: 'showAddApplicationEvaluationComment'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: '1st Assessment comments',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'evaluationcommentsstr',
                proxy: {
                    url: 'productregistration/getEValuationComments'
                }
            },
            isLoad: true
        }
    },
    columns: [{
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
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'View Task',
                    action: 'edit',
                    bind:{
                        disabled: '{isReadOnly}'
                    },
                    handler: 'showEditApplicationEvaluationComment',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_evaluations_overralcomments',
                    storeID: 'evaluationcommentsstr',
                    bind:{
                        hidden: '{isReadOnly}'
                    },
                    action_url: 'productregistration/deleteProductRegRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteProductRegWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
