/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.scheduledtcmeeting.views.grids.ViewScheduledTcMeetingsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'scheduledtcmeetingsvctr',
    xtype: 'viewscheduledtcmeetingsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    plugins: [{
        ptype: 'gridexporter'
    }],
   tbar:[{
        xtype: 'exportbtn'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                
                storeId: 'viewscheduledtcmeetingsgridstr',
                pageSize: 200, remoteFilter: true,
                totalProperty:'totals',
                groupField:'module_name',
                proxy: {
                    url: 'dashboard/getScheduledTcMeetingDetails',
                    reader: {
                        type: 'json',
                        totalProperty: 'totals'
                    },
                }
            },
            isLoad: true
        }, afterrender: function(grid){
            var store = grid.getStore();
                store.removeAll();
                store.load();
        }
    }, features: [
        {
            ftype: 'grouping',
            startCollapsed: false,
            groupHeaderTpl: 'Module: {[values.rows[0].data.process]}, Sub-Module: {[values.rows[0].data.sub_process]}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        },{
            ftype: 'searching'
        },{
            ftype: 'searching'
        }
    ],
     
        plugins: [
            {
                ptype: 'gridexporter'
            }
        ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'meeting_name',
        text: 'Meeting Name',
        flex: 1,
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'meeting_desc',
        text: 'Meeting Description',
        flex: 1,
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'date_requested',
        text: 'Meeting Date',
        flex: 1,
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'meeting_time',
        text: 'Meeting Time',
        flex: 1,
       
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'meeting_venue',
        text: 'Meeting Venue',
        flex: 1,
       
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'process',
        text: 'Process',
        flex: 1,
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_process',
        text: 'Sub Process',
        flex: 1
        
    },  {
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
                    text: 'View Meeting Details & Applications',
                    iconCls: 'x-fa fa-print',
                    childXtype:'viewscheduledtcMeetingpnl',
                    winTitle: 'Meeting Details',
                    winWidth: '80%',
                    handler: 'funcViewMeetingDetails'
                }]
            }
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
            this.up('grid').fireEvent('refresh', this);
        }
    }]
});
