/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.commoninterfaces.grids.PreviousDocumentVersionsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'previousDocumentVersionsGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 400,
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
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'previousDocumentsUploads',
                proxy: {
                    url: 'documentmanagement/getApplicationDocumentPreviousVersions',
                }
            },
            isLoad: true
        }
    },
    export_title: 'Document uploads',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
 
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'document_type',
        text: 'Document Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'document_requirement',
        text: 'Required Document(s)',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'is_mandatory',
        text: 'Is Mandatory',
        flex: 0.7,
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:red';
                return "Is-Mandatory";
            }
            else {
                metaData.tdStyle = 'color:white;background-color:red';
                return "Not-Mandatory";
            }

        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'file_name',
        text: 'File Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'initial_file_name',
        text: 'Initial File Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'uploaded_by',
        text: 'Upload By',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'uploaded_on',
        text: 'Upload Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'file_type',
        text: 'File Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        text: 'Remarks',
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
                    text: 'Preview/',
                    iconCls: 'x-fa fa-eye',
                    handler: 'previewUploadedDocument',
                    download: 0
                }]
            }
        }
    }]
});
