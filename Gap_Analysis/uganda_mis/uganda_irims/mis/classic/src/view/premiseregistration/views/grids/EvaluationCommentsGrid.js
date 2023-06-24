/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.EvaluationCommentsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'evaluationcommentsgrid',
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
        name: 'add_btn',
        handler: 'showAddApplicationEvaluationComment'
    }, {
        xtype: 'hiddenfield',
        name: 'static_stage'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Evaluation comments',
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
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'evaluationcommentsstr',
                proxy: {
                    url: 'getApplicationComments'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                static_stage = grid.down('hiddenfield[name=static_stage]').getValue(),
                add_btn = grid.down('button[name=add_btn]');
            if ((static_stage) && static_stage > 0) {
                add_btn.setVisible(false);
                grid.columns[grid.columns.length - 1].setHidden(true);
                grid.columns[grid.columns.length - 1].widget.menu.items = [];
            }else{
                add_btn.setVisible(true);
                grid.columns[grid.columns.length - 1].setHidden(false);
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Edit',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'View Task',
                        action: 'edit',
                        handler: 'showEditApplicationEvaluationComment',
                        stores: '[]'
                    }, {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'evaluation_comments',
                        storeID: 'evaluationcommentsstr',
                        action_url: 'premiseregistration/deletePremiseRegRecord',
                        action: 'actual_delete',
                        handler: 'doDeletePremiseRegWidgetParam',
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }];
            }
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
    }, {
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
                    handler: 'showEditApplicationEvaluationComment',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'evaluation_comments',
                    storeID: 'evaluationcommentsstr',
                    action_url: 'premiseregistration/deletePremiseRegRecord',
                    action: 'actual_delete',
                    handler: 'doDeletePremiseRegWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
