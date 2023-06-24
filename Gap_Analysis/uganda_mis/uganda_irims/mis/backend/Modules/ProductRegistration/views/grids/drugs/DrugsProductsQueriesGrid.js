Ext.define('Admin.view.commoninterfaces.grids.DrugsProductsQueriesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'drugsproductsqueriesgrid',
    itemId: 'drugsproductsqueriesgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    storeID: 'drugsproductsqueriesgridstr',
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
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    tbar: [{
        xtype: 'hiddenfield',
        name: 'application_code'
    } ,{
        xtype: 'tbspacer',
        width: 20
    },{
        xtype: 'exportbtn'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'drugsproductsqueriesgridstr',
                groupField: 'query_reference_no',
                proxy: {
                    url: 'getApplicationunstructuredqueries'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this;
                    grid.columns[grid.columns.length - 1].widget.menu.items = [
                        {
                            text: 'Previous Responses',
                            iconCls: 'x-fa fa-exchange',
                            handler: 'showQueryPrevResponses',
                            stores: '[]'
                        }, {
                            text: 'Approve/Close Query',
                            iconCls: 'x-fa fa-check',
                            table_name: 'checklistitems_queries',
                            storeID: 'drugsproductsqueriesgridstr',
                            action: 'close_query',
                            bind: {
                                hidden: '{isReadOnly}'
                            },
                            action_url: 'premiseregistration/closeApplicationQuery',
                            handler: 'closeApplicationQuery',
                            hidden: true
                        }, {
                            text: 'Re-Query',
                            iconCls: 'x-fa fa-reply',
                            action: 're_query',
                            bind: {
                                hidden: '{isReadOnly}'
                            },
                            handler: 'showReQueryApplicationQueryForm',
                            stores: '[]',
                            hidden: true
                        }, {
                            text: 'Edit Query',
                            iconCls: 'x-fa fa-edit',
                            tooltip: 'Edit Record',
                            action: 'edit',
                            childXtype: 'applicationunstructuredqueriesfrm',
                            winTitle: 'Application Query',
                            winWidth: '35%',
                            handler: 'showEditApplicationQueryForm',
                            stores: '[]',
                            hidden: true
                        }, {
                            text: 'Delete Query',
                            iconCls: 'x-fa fa-trash',
                            tooltip: 'Delete Record',
                            table_name: 'checklistitems_queries',
                            storeID: 'applicationunstructuredqueriesstr',
                            action_url: 'premiseregistration/deletePremiseRegRecord',
                            action: 'actual_delete',
                            handler: 'doDeleteApplicationRegWidgetParam',
                            disabled: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete'),
                            hidden: true
                        }];
           
            
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('drugsproductsqueriesgrid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: 'Query Reference Details: {[values.rows[0].data.query_reference_no]}',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'query_type',
        text: 'Query Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'queried_item',
        text: 'Queried Checklist',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'queried_by',
        text: 'Queried By',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'queried_on',
        text: 'Queried On',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query',
        text: 'Query(s)',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_details',
        text: 'Reference Details',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_section',
        text: 'Application Section',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'comment',
        text: 'Comment',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'query_status',
        text: 'Status',
        flex: 1,
        renderer: function (value, metaData,record) {
            var status_id = record.get('status_id');
            if(status_id === 1) {
                metaData.tdStyle = 'color:white;background-color:red';
                return value;
            }
            metaData.tdStyle = 'color:white;background-color:green';
            return value;
        }
    
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
                items: []
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var status = rec.get('status'),
                grid = widget.up('grid'),
                isReadOnly = grid.isReadOnly;
            if ((isReadOnly) && isReadOnly > 0) {
                //do nothing
            } else {
                if (status === 1 || status == 1) {//open
                    widget.down('menu menuitem[action=actual_delete]').setVisible(true);
                    widget.down('menu menuitem[action=edit]').setVisible(true);
                    widget.down('menu menuitem[action=re_query]').setVisible(false);
                    widget.down('menu menuitem[action=close_query]').setVisible(false);
                }
                if (status === 2 || status == 2) {//responded
                    widget.down('menu menuitem[action=re_query]').setVisible(true);
                    widget.down('menu menuitem[action=close_query]').setVisible(true);
                    widget.down('menu menuitem[action=actual_delete]').setVisible(false);
                    widget.down('menu menuitem[action=edit]').setVisible(false);
                }
                if (status == 3 || status === 3) {//re queried
                    widget.down('menu menuitem[action=re_query]').setVisible(false);
                }
                if (status == 4 || status === 4) {//closed
                    widget.down('menu menuitem[action=re_query]').setVisible(true);
                    widget.down('menu menuitem[action=close_query]').setVisible(false);
                }
            }
        }
    }]
});
