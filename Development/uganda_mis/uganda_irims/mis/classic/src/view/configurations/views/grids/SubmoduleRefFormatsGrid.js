/**
 * Created by Kip on 5/9/2019.
 */
Ext.define('Admin.view.configurations.views.grids.SubmoduleRefFormatsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'submodulerefformatsgrid',
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
        xtype: 'button',
        text: 'Add Format',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'submodulerefformatsfrm',
        winTitle: 'Sub Module Reference Format',
        winWidth: '40%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Reference numbers formats',
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
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'submodulerefformatsstr',
                proxy: {
                    url: 'configurations/getSubmoduleRefFormats'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'module',
        text: 'Module',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module',
        text: 'Sub Module',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        text: 'Section Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_type',
        text: 'Reference Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ref_format',
        text: 'Reference Format',
        flex: 1,
        tdCls: 'wrap'
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
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'submodulerefformatsfrm',
                    winTitle: 'Sub Module Reference Format',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_submodule_referenceformats',
                    storeID: 'submodulerefformatsstr',
                    action_url: 'configurations/deleteWorkflowRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
