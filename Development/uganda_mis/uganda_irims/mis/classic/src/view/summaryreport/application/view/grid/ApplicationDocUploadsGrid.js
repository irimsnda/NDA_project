Ext.define('Admin.view.summaryreport.application.grid.ApplicationDocUploadsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'applicationDocUploadsGrid',
   // store: 'uploadedDocStr', set by controller
   controller: 'commoninterfacesVctr',

    tbar: [{
        xtype: 'hiddenfield',
        name: 'module_id'
    },{
        xtype: 'hiddenfield',
        name: 'application_code'
    },{
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
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_document_types',
                            filters: JSON.stringify({is_system_generatedrpt:2})
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
    },'->',{
        xtype: 'textfield',
        fieldLabel: 'Reference/Tracking No',
        labelWidth: 150,
        name: 'Reference',
        listeners: {
          change: function(me,value,old,opt) {
            var grid=me.up('grid');
             if(value!=''){
              var button=grid.down('button[name=search]').enable();
              }else{
                var button=grid.down('button[name=search]').disable();
              }
          }
      },
    },{
        xtype: 'button',
        iconCls: 'fa fa-search',
        text: 'Search',
        ui: 'soft-green',
        name: 'search',
        disabled: true,
        handler: function(){
          var grid = this.up('grid'),
                    store = grid.getStore();
                store.reload();  
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        //store: 'uploadedDocStr', set by controller
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
             var filters=this.up('grid'),
            type=filters.down('combo[name=applicable_documents]').getValue(),
            Reference=filters.down('textfield[name=Reference]').getValue(),
            Store=this.getStore();
            module_id=filters.down('hiddenfield[name=module_id]').getValue();

            Store.getProxy().extraParams = {
                        doc_type:type,
                        module_id:module_id,
                        Reference:Reference
                }
            }
    }],
    features: [{ftype:'grouping',startCollapsed: true}],
    selModel:{
        selType: 'checkboxmodel',
    },
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
    listeners: {
        // afterRender: function (me) {
        //     var form=me.up('tabpanel'),
        //    module_id=form.down('textfield[name=module_id]').getValue();
        //    me.down('hiddenfield[name=module_id]').setValue(module_id);
        // },
        beforerender: 'func_setDocumentGridStore'

    }
});