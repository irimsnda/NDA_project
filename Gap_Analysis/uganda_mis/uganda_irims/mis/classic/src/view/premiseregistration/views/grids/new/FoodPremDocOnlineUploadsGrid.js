/**
 * Created by Kip on 10/19/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.new.FoodPremDocOnlineUploadsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'foodpremdoconlineuploadsgrid',
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
        hidden: true,
        stores: '[]'
    }, {
        xtype: 'exportbtn'
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
        store: 'foodpremdoconlineuploadsstr',
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
    store: 'foodpremdoconlineuploadsstr',
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
                }
                ]
            }
        }
    }]
});
