
Ext.define('Admin.view.controldocument_management.views.grids.ControlDocumentsRegListGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'controldocumentmanagementvctr',
    xtype: 'controldocumentsreglistgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
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
        text:'Double click to select control Document Details'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'controldocumentmasterlist',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: 'Document Type: {[values.rows[0].data.controldocument_type_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'controldocumentmasterlistStr',
                grouper: {
                    groupFn: function (item) {
                        return item.get('controldocument_type_name');
                    }
                },
                proxy: {
                    url: 'controldocumentsmng/getControlDocumentsreglist',
                    extraParams:{
                        table_name: 'par_controldocument_masterlist'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        hidden: true,
        width: 100
    },{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Document Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'controldocument_type_name',
        text: 'Control Document Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Document Reference No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'version_no',
        text: 'Document Version No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approved_byname',
        text: 'Approved By',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approval_date',
        text: 'Approval Date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'effective_date_from',
        text: 'Effective Date from',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'next_review_date',
        text: 'Next Review Date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'doc_serial_number',
        text: 'Doc Serial Number',
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
                    text: 'Preview Control Document',
                    iconCls: 'x-fa fa-file',
                    tooltip: ' Control Document',
                    action: 'edit',
                    childXtype: '',
                    winTitle: ' Control Document',
                    winWidth: '60%',
                    isReadOnly: 1,
                    
                    document_type_id: '',
                    handler: 'showPreviousUploadedDocs'
                }
                ]
            }
        }
    }]
});
