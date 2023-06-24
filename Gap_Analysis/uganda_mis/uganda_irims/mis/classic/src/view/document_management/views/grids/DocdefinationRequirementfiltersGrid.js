/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.grids.DocdefinationRequirementfiltersGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'documentsManagementvctr',
    xtype: 'docdefinationrequirementfiltersgrid',
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
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'docdefinationrequirementfiltersfrm',
        winTitle: 'Documents Requirements Defination Filters',
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
    export_title: 'Documents Types Definations',
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
                storeId: 'docdefinationrequirementfilterstr',
                grouper: {
                    groupFn: function (item) {
                        return item.get('module_id') + item.get('sub_module_id');
                    }
                },
                proxy: {
                   url: 'documentmanagement/docdefinationrequirementfilterdetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Document Requirement',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Document Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        text: 'Section Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        text: 'Sub Module Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_mandatory',
        text: 'Is Mandatory',
        flex: 0.2,
		renderer: function (value, metaData) {
                if(value) {
                    metaData.tdStyle = 'color:white;background-color:red';
                    return "True";
                }
                metaData.tdStyle = 'color:white;background-color:green';
                return "False";
            }
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
                    childXtype: 'documenttypesfrm',
                    winTitle: 'Documents Types',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-trash-o',
                    tooltip: 'Delete Record',
                    table_name: 'par_document_types',
                    storeID: 'documenttypesstr',
                    action_url: 'configurations/softDeleteConfigRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteConfigWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_document_types',
                    storeID: 'documenttypesstr',
                    action_url: 'configurations/deleteConfigRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'par_document_types',
                    storeID: 'documenttypesstr',
                    action_url: 'configurations/undoWorkflowSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    handler: 'doDeleteConfigWidgetParam'
                }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var is_enabled = rec.get('is_enabled');
            if (is_enabled === 0 || is_enabled == 0) {
                widget.down('menu menuitem[action=enable]').setDisabled(false);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(true);
            } else {
                widget.down('menu menuitem[action=enable]').setDisabled(true);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(false);
            }
        }
    }]
});
