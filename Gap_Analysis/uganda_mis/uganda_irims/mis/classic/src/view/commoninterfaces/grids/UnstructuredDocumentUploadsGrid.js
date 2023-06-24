Ext.define('Admin.view.commoninterfaces.grids.UnstructuredDocumentUploadsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'unstructureddocumentuploadsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 450,
    storeID: 'unstructuredocumentsUploadsStr',
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
     selModel:{
        selType: 'checkboxmodel',
        //mode: 'SINGLE'
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'document_type_id'
    },{
        xtype: 'hiddenfield',
        name: 'reference_record_id'
    },{
        xtype: 'hiddenfield',
        name: 'table_name'
    }, {
        xtype: 'hiddenfield',
        name: 'reference_table_name'
    }, {
        xtype: 'button',
        text: 'Upload',
        name: 'add_upload',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        winTitle: 'Document Upload',
        childXtype: 'unstructureddocumentuploadsfrm',
        winWidth: '35%',
        stores: '[]',
         bind: {
            hidden: '{isReadOnly}'  // negated
        }
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 20
    },{
        xtype: 'splitbutton',
        name: 'downloadAll',
        text: 'Download All',
        iconCls: 'fa fa-download',
        ui: 'soft-green',
         menu: {
                xtype: 'menu',
                items: [{
                    text: 'Download Files',
                    iconCls: 'x-fa fa-file',
                    handler: 'downloadAllSelectedDocuments',
                    type: 'file'
                }, {
                    text: 'Download as Zip',
                    iconCls: 'x-fa fa-archive',
                    handler: 'downloadAllSelectedDocuments',
                    type: 'zip'

                }]
            }
    }],
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
                storeId: 'unstructuredocumentsUploadsStr',
                groupField: 'document_type_id',
                proxy: {
                    url: 'documentmanagement/onLoadUnstructureApplicationDocumentsUploads',
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
        beforeLoad: function () {

            this.up('unstructureddocumentuploadsgrid').fireEvent('refresh', this);

        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '=> {[values.rows[0].data.document_type]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'document_type',
        text: 'Document Type',
        flex: 1,
        hidden: true
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'is_mandatory',
        text: 'Is Mandatory',
        flex: 0.7,
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:red';
                return "Is-Mandatory";
            } else {
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
                    text: 'Preview',
                    iconCls: 'x-fa fa-eye',
                    handler: 'previewUploadedDocument',
                    download: 0
                }, {
                    text: 'Update Document',
                    iconCls: 'x-fa fa-upload',
                    winTitle: 'Update Document',
                    childXtype: 'unstructureddocumentuploadsfrm',
                    winWidth: '35%',
                    handler: 'updateApplicationDocUploadWin',
                    stores: '[]',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    }

                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_application_uploadeddocuments',
                    storeID: 'unstructuredocumentsUploadsStr',
                    action_url: 'productregistration/deleteProductiseRegRecord',
                    action: 'actual_delete',
                    handler: 'onDeleteNonStructureApplicationDocument',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete'),
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    }
                }]
            }
        }
    }]
});
