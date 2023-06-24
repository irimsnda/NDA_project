/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.GroupSampleAnalysisGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'groupsampleanalysisgrid',
    autoScroll: true,
    autoHeight: true,
    headers: false,
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
        xtype: 'button',
        text: 'Add Sample Batch Application',
        iconCls: 'x-fa fa-plus',
        action: 'addsamplebatchapplication',
        ui: 'soft-green'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Sample Batch Application',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            var store=this.getStore(),
                grid = this.up('grid'),
                homePnl = grid.up('panel'),
                containerPnl=homePnl.up('container'),
                section_id=containerPnl.down('hiddenfield[name=section_id]').getValue();
                store.getProxy().extraParams={
                    section_id: section_id
                }
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Sample Group: {[values.rows[0].data.group_no]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                groupField: 'group_no',
                storeId: 'groupsampleanalysisgridstr',
                proxy: {
                    url: 'surveillance/getGroupSampleAnalysisDetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'group_no',
        text: 'Group No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'laboratory_reference_no',
        text: 'Laboratory Reference No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'surveillance_reference_no',
        text: 'PMS Application Ref No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Sample Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'code_ref_no',
        text: 'Code Ref No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'submission_date',
        text: 'Sample Submission Date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sample_analysis_status',
        text: 'Sample Analysis Status',
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
                    tooltip: 'Edit Record',
                    action: 'edit',
                    handler: 'showEditPmsProgram',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'pms_program_details',
                    storeID: 'pmsprogramstr',
                    action_url: 'surveillance/deleteSurveillanceRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteSurveillanceWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
