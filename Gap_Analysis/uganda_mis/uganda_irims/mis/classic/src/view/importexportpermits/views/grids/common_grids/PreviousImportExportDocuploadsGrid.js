/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.PreviousImportExportDocuploadsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'previousimportexportdocuploadsgrid',
    table_name: 'tra_importexport_applications',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'importexportpermitreleasegridStr',
                proxy: {
                    url: 'importexportpermits/getPreviousImportExportDocuploads'
                }
            },
            isLoad: true,
            autoLoad: true
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('previousimportexportdocuploadsgrid').fireEvent('refresh', this);//
        }
    }],
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Download Report',
            iconCls: 'x-fa fa-download',
            name: 'certificate',
            handler: 'downloadPreviousDocupload'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'initial_filename',
        text: 'File Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'upload_date',
        text: 'Upload Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'filetype',
        text: 'File Type',
        flex: 1
    }]
});
