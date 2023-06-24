/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.PmsProgramGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'pmsprogramgrid',
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
        text: 'Add Program',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'PMS Programs',
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
    }/*, {
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Section: {[values.rows[0].data.section_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }*/],
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                //groupField: 'section_id',
                storeId: 'pmsprogramstr',
                proxy: {
                    url: 'surveillance/getPmsPrograms'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name/Identity',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'start_date',
        text: 'Start Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'end_date',
        text: 'End Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
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
