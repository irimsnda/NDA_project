/**
 * Created by Kip on 10/4/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.new.FoodPremDocUploadsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'foodpremdocuploadsgrid',
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
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Upload',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        winTitle: 'Document Upload',
        childXtype: 'appdocuploadsfrm',
        winWidth: '35%',
        isWin: 2,
        name: 'add_upload',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'static_stage'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Document uploads',
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
                pageSize: 1000,
                groupField: 'workflow_stage_id',
                storeId: 'foodpremdocuploadsstr',
                proxy: {
                    url: 'premiseregistration/getApplicationUploadedDocs'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                static_stage = grid.down('hiddenfield[name=static_stage]').getValue(),
                add_btn = grid.down('button[name=add_upload]');
            if ((static_stage) && static_stage > 0) {
                add_btn.setVisible(false);
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Preview',
                        iconCls: 'x-fa fa-eye',
                        handler: 'previewUploadedDocument',
                        download: 0
                    }, {
                        text: 'Download',
                        iconCls: 'x-fa fa-download',
                        handler: 'previewUploadedDocument',
                        download: 1
                    }];
            } else {
                add_btn.setVisible(true);
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Preview',
                        iconCls: 'x-fa fa-eye',
                        handler: 'previewUploadedDocument',
                        download: 0
                    }, {
                        text: 'Download',
                        iconCls: 'x-fa fa-download',
                        handler: 'previewUploadedDocument',
                        download: 1
                    }, {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'tra_premiseapplications_uploads',
                        storeID: 'foodpremdocuploadsstr',
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
        dataIndex: 'initial_filename',
        text: 'File Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'created_on',
        text: 'Upload Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'filetype',
        text: 'File Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'filesize',
        text: 'File Size',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
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
                    text: 'Preview',
                    iconCls: 'x-fa fa-eye',
                    handler: 'previewUploadedDocument',
                    download: 0
                }, {
                    text: 'Download',
                    iconCls: 'x-fa fa-download',
                    handler: 'previewUploadedDocument',
                    download: 1
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_premiseapplications_uploads',
                    storeID: 'foodpremdocuploadsstr',
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
