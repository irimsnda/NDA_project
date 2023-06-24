Ext.define('Admin.view.commoninterfaces.grids.AppResumableDocUploadsGrid', {
    extend: 'Ext.tree.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'appresumabledocuploadsgrid',
    useArrows: true,
    rootVisible: false,
    multiSelect: false,
    singleExpand: true,
    margin: '0 5 0 0',
    selType: 'cellmodel',
    requires: [
        'Ext.grid.*',
        'Ext.tree.*'
    ],
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var file_type = record.get('file_type');
            console.log(file_type);
            if (file_type) {
                console.log(file_type);
                return 'valid-row';
            }else{
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'process_id'
    },{
        xtype: 'hiddenfield',
        name: 'module_id'
    },{
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    }, {
        xtype: 'button',
        text: 'Upload',
        name: 'add_upload',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-blue',
        winTitle: 'Document Upload',
        childXtype: 'appresumabledocuploadsfrm',
        newTab: 'appresumabledocuploadsfrm',
        winWidth: '35%',
        show_assessor: true,
        stores: '["applicationDocumentsUploadsStr"]',
        storeID: 'applicationDocumentsUploadsStr',
        bind: {
            hidden: '{isReadOnly}'
        }
    }, {
        xtype: 'exportbtn',
        hidden: true
    }, {
        xtype: 'tbspacer',
        width: 20
    },{
        xtype: 'hiddenfield',
        name: 'prodclass_category_id'
    },{
        xtype: 'hiddenfield',
        name: 'importexport_permittype_id'
    },{
        xtype: 'hiddenfield',
        name: 'query_ref_id'
    },{
        xtype: 'hiddenfield',
        name: 'isvalidate_uploaded_by'
    }, {
        xtype: 'combo',
        fieldLabel: 'Applicable Documents',
        labelWidth: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'applicable_documents',
        queryMode: 'local',
        width: 500,
        labelStyle: "font-weight:bold",
        bind: {
            hidden: '{isReadOnly}'  // negated
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'documentmanagement/getProcessApplicableDocTypes'
                    }
                },
                isLoad: false
            },
            change: function () {
                var grid = this.up('treepanel'),
                    store = grid.getStore();
                store.load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }
    ],
    autoScroll: true,
    listeners: {
        beforerender: {
            fn: 'setDynamicTreeGridStore',
            config: {
                storeId: 'applicationDocumentsUploadsStr',
                proxy: {
                    api: {
                         read: 'documentmanagement/onLoadApplicationDocumentsUploads'
                    },
                }
            },
            isLoad: true
        },
        itemdblclick: 'onMenuItemTreeItemDblClick'
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            //this.up('applicationdocuploadsgrid').fireEvent('refresh', this);
            this.up('appresumabledocuploadsgrid').fireEvent('refresh', this);
        }
    }],
    autoScroll: true,
    selModel:{
        selType: 'checkboxmodel',
        //mode: 'SINGLE'
    },

    columns: [{
        xtype: 'treecolumn',
        dataIndex: 'file_name',
        text: 'File Name',
        sortable: true,
        tdCls: 'wrap',
        width: 200
    },{
        xtype: 'gridcolumn',
        dataIndex: 'document_type',
        text: 'Document Type',
        tdCls: 'wrap',
        width: 200
    },{
        xtype: 'gridcolumn',
        dataIndex: 'document_requirement',
        text: 'Required Document(s)',
        tdCls: 'wrap',
        width: 200
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
                    action: 'preview',
                    download: 0
                },{
                    text: 'ZIP and Download',
                    iconCls: 'x-fa fa-download',
                    handler: 'downloadDirectoryasZip',
                    tooltip: 'download as zip',
                    action: 'download',
                    download: 0
                }, {
                    text: 'Update Document',
                    iconCls: 'x-fa fa-upload',
                    winTitle: 'Update Document',
                    childXtype: 'appresumabledocuploadsfrm',
                    winWidth: '35%',
                    handler: 'updateApplicationDocUploadWin',
                    stores: '[]',
                    action: 'update',
                    bind: {
                        hidden: '{isReadOnly}'  // false
                    }

                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_application_uploadeddocuments',
                    storeID: 'applicationDocumentsUploads',
                    action_url: 'productregistration/deleteProductiseRegRecord',
                    action: 'actual_delete',
                    handler: 'onDeleteApplicationDocument',
                    
                    bind: {
                        hidden: '{isReadOnly}'  // false
                    }
                }, {
                    text: 'Preview Previous Version',
                    iconCls: 'x-fa fa-eye',
                    storeId: 'previousDocumentsUploads',
                    childXtype: 'previousDocumentVersionsGrid',
                    winTitle: 'Document Previous Versions',
                    winWidth: '70%',
                    action: 'prev_versions',
                    handler: 'previewPreviousUploadedDocument',
                    bind: {
                        hidden: '{isReadOnly}'  // false
                    }
                }]
            }
        },
        onWidgetAttach: function (col, widget, rec) {
            var leaf = rec.get('leaf'),
                is_directory = rec.get('is_directory');
            if(is_directory == 1){
                widget.down('menu menuitem[action=update]').setVisible(false);
                widget.down('menu menuitem[action=update]').setDisabled(true);
                widget.down('menu menuitem[action=prev_versions]').setDisabled(true);
                widget.down('menu menuitem[action=prev_versions]').setVisible(false);

                widget.down('menu menuitem[action=preview]').setVisible(false);
                widget.down('menu menuitem[action=download]').setVisible(true);
            }else{
                widget.down('menu menuitem[action=update]').setVisible(true);
                widget.down('menu menuitem[action=prev_versions]').setVisible(true);
                widget.down('menu menuitem[action=preview]').setVisible(true);
                widget.down('menu menuitem[action=download]').setVisible(false);
            }
        }
    }]
});
