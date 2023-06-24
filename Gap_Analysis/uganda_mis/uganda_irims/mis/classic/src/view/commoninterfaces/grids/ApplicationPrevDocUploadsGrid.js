Ext.define('Admin.view.commoninterfaces.grids.ApplicationPrevDocUploadsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    
    xtype: 'applicationprevdocuploadsgrid',
    cls: 'dashboard-todo-list',
    viewModel: 'commoninterfacesVm',
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
        xtype: 'hiddenfield',
        name: 'process_id'
    }, {
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    },{
        xtype: 'hiddenfield',
        name: 'prodclass_category_id'
    },{
        xtype: 'hiddenfield',
        name: 'importexport_permittype_id'
    },{
        xtype: 'hiddenfield',
        name: 'query_ref_id'
    }, {
        xtype: 'hiddenfield',
        name: 'variation_id'
    }, {
        xtype: 'hiddenfield',
        name: 'isOnline'
    },{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 20
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
            afterrender: function (cmbo) {
                var grid = cmbo.up('grid'),
                    store = cmbo.getStore();
                    
                store.removeAll();
                store.load();
               
            },
            change: function () {
                var grid = this.up('grid'),
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
                    hidden: true,
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
                storeId: 'applicationprevdocuploadsgridstr',
                proxy: {
                    url: 'documentmanagement/onLoadApplicationPrevDocumentsUploads',
                },grouper: {
			        groupFn: function (item) {
			            return item.get('document_type') +item.get('document_requirement');
			        }
			    },
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
            var store = this.getStore(),
                grid = this.up('grid'),
                store = grid.getStore(),
                table_name = grid.table_name,
                portal_uploads = grid.portal_uploads,

                process_id = grid.down('hiddenfield[name=process_id]').getValue(),
                section_id = grid.down('hiddenfield[name=section_id]').getValue(),
                module_id = grid.down('hiddenfield[name=module_id]').getValue(),
                sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
                workflow_stage = grid.down('hiddenfield[name=workflow_stage_id]').getValue(),
                query_ref_id = grid.down('hiddenfield[name=query_ref_id]').getValue(),
                prodclass_category_id = grid.down('hiddenfield[name=prodclass_category_id]').getValue(),
                importexport_permittype_id = grid.down('hiddenfield[name=importexport_permittype_id]').getValue(),
                application_code = grid.down('hiddenfield[name=application_code]').getValue(),
                document_type_id = grid.down('combo[name=applicable_documents]').getValue();
				
				variation_id = grid.down('hiddenfield[name=variation_id]').getValue();
				isOnline = grid.down('hiddenfield[name=isOnline]').getValue();
                
                store.getProxy().extraParams = {
                    table_name: table_name,
                    section_id: section_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    process_id: process_id,
                    workflow_stage: workflow_stage,
                    application_code: application_code,
                    document_type_id: document_type_id,
                    query_ref_id: query_ref_id,
                    prodclass_category_id: prodclass_category_id,
                    importexport_permittype_id:importexport_permittype_id,
                    portal_uploads: portal_uploads
                }
        }
    }],
    selModel:{
        selType: 'checkboxmodel',
        //mode: 'SINGLE'
    },
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
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'document_requirement',
        text: 'Required Document(s)',
        tdCls: 'wrap',
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
                    handler: 'previewMultiUploadedDocument',
                    download: 0
                }, {
                    text: 'Preview Previous Version',
                    iconCls: 'x-fa fa-eye',
                    storeId: 'previousDocumentsUploads',
                    childXtype: 'previousDocumentVersionsGrid',
                    winTitle: 'Document Previous Versions',
                    winWidth: '70%',
                    handler: 'previewPreviousUploadedDocument'
                }]
            }
        }
    }]
});
