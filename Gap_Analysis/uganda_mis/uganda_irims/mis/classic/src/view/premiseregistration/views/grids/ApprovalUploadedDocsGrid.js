/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.ApprovalUploadedDocsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'approvaluploadeddocsgrid',
    tbar: [{
        xtype: 'exportbtn'
    }],
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
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                groupField: 'workflow_stage_id',
                //storeId: 'foodpremdocuploadsstr',
                proxy: {
                    url: 'premiseregistration/getApplicationUploadedDocs'
                }
            },
            isLoad: true
        }
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Stage: {[values.rows[0].data.stage_name]} [{rows.length} {[values.rows.length > 1 ? "Uploads" : "Upload"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
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
        xtype: 'gridcolumn',
        dataIndex: 'stage_name',
        text: 'Stage',
        flex: 1,
        hidden: true
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