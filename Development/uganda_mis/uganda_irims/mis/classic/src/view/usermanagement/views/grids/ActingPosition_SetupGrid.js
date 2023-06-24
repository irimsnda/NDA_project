/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.usermanagement.views.grids.ActingPosition_SetupGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'usermanagementvctr',
    xtype: 'actingposition_setupgrid',
    cls: 'dashboard-todo-list',
    header: false,
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
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add User Acting Position',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        winWidth:'40%',
        winTitle:' User Acting Position',
        childXtype: 'actingposition_setupfrm',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    },'->',{
        xtype: 'datefield',
        emptyText: 'Date From',
        name: 'date_from'

    },{
        xtype: 'datefield',
        emptyText: 'Date To',
        name: 'date_to'

    },{
        text: 'Filter Records',
        iconCls:'fa fa-search',
        name: 'search_records',
        handler: 'funcSearchPositionSetupdetails'
    },{
        text: 'Clear FIlter',
        iconCls: '',
        handler: 'funcClearPositionSetupdetails'
    }],
    plugins:[
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'User Acting Position',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
            var store = this.getStore(),
                grid = this.up('grid'),
               date_from = grid.down('datefield[name=date_from]').getValue(),
                date_to = grid.down('datefield[name=date_to]').getValue();
                store.getProxy().extraParams = {
                    date_from: date_from,
                    date_to: date_to
                };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setUserGridsStore',
            config: {
                pageSize: 10000,
                groupField:'group_name',
                remoteFilter: true,
                storeId: 'actingposition_setupgridstr',
                proxy: {
                    url:'usermanagement/getActingUsersPositionDetails'
                }
            },
            isLoad: true
        }
    },
    features: [
        {
            ftype: 'grouping',
            startCollapsed: true,
            groupHeaderTpl: 'Group Name: {[values.rows[0].data.group_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'full_names',
        text: 'Full Names',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        text: 'Email Address',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'group_name',
        text: 'Acting for Group',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'acting_reason',
        text: 'Acting Reason',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'acting_fromuser',
        text: 'Acting for User',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'acting_date_from',
        text: 'Acting Date From',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'acting_date_to',
        text: 'Acting Date To',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'requested_by',
        text: 'Requested By',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'effected_by',
        text: 'Effected By',
        flex: 1
    }]
});
