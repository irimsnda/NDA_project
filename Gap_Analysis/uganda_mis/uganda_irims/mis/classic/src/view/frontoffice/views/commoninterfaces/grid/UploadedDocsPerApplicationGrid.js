Ext.define('Admin.view.openOffice.commoninterfaces.grid.UploadedDocsPerApplicationGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'uploadeddocsperapplicationGrid',
   // store: 'uploadedDocStr', set by controller
   controller: 'commoninterfacesVctr',
   width: '100%',
   height: 300,
   listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'uploadedDocumentbyApplicationStr',
                groupField: 'document_type',
                proxy: {
                    url: 'openoffice/getUploadedDocumentPerApplication',
                    extraParams: {
                            appType: 'gmp'
                     }
                }
            },
            isLoad: true
        }
    },
    tbar: [ {
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
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                         extraParams: {
                            table_name: 'par_document_types'
                        }
                       }
                    },
                    isLoad: true
                },
            
            change: function (combo, newValue,old,eopts) {
             
                var grid = this.up('grid'),
                    store = grid.getStore();
                store.reload();
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
        xtype: 'hiddenfield',
        name: 'application_code'
    },{
        xtype:'hiddenfield',
        name:'appType'
    },{
        xtype:'hiddenfield',
        name:'reference_no'
    },{
        xtype:'hiddenfield',
        name:'section_id'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
             var filters=this.up('grid'),
            doc_type=filters.down('combo[name=applicable_documents]').getValue(),
            application_code=filters.down('hiddenfield[name=application_code]').getValue(),
            appType=filters.down('hiddenfield[name=appType]').getValue(),
            Store=this.getStore();

            Store.getProxy().extraParams = {
                        doc_type:doc_type,
                        application_code:application_code,
                        appType:appType
                }
            }
    }],
    columns: [
   {
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
    }],
    features: [{ftype:'grouping',startCollapsed: true}],
});