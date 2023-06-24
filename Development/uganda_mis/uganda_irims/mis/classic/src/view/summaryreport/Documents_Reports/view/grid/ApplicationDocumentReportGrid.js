Ext.define('Admin.view.summaryreport.Documents_Reports.view.grid.ApplicationDocumentReportGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'applicationDocumentReportGrid',
   // store: 'uploadedDocStr', set by controller
   controller: 'commoninterfacesVctr',
   listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'applicationDocumentReportStr',
                groupField: 'module_name',
                proxy: {
                    url: 'summaryreport/getAllUploadedDocumentDetails'
                }
            },
            isLoad: true
        }
           
    },
    tbar: [{
        xtype: 'combo',
        fieldLabel: 'Module',
        labelWidth: 70,
        labelAlign : 'top',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'module_id',
        queryMode: 'local',
        width: 200,
        labelStyle: "font-weight:bold",
        listeners: {
            beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'modules'
                        }
                       }
                    },
                    isLoad: true
                },
            
            change: function (combo, newValue,old,eopts) {
             
                var grid = this.up('grid'),
                    subStr = grid.down('combo[name=sub_module_id]').getStore()
                    store = grid.getStore();
                subStr.removeAll();
                filters = JSON.stringify({'module_id':newValue})
                subStr.load({params:{filters:filters}});
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
    }, {
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        labelWidth: 70,
        labelAlign : 'top',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        queryMode: 'local',
        //flex: 1,
        width: 200,
        labelStyle: "font-weight:bold",
        listeners: {
            beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'sub_modules'
                        }
                       }
                    },
                    isLoad: false
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
    }, {
        xtype: 'combo',
        fieldLabel: 'Applicable Documents',
        labelWidth: 150,
        labelAlign : 'top',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'applicable_documents',
        queryMode: 'local',
        width: 200,
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
    },'->',{
        xtype: 'textfield',
        fieldLabel: 'Reference/Tracking No',
        labelAlign : 'top',
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
            module_id=filters.down('combo[name=module_id]').getValue();
            sub_module_id=filters.down('combo[name=sub_module_id]').getValue();

            Store.getProxy().extraParams = {
                        doc_type:type,
                        module_id:module_id,
                        sub_module_id:sub_module_id,
                        Reference:Reference
                }
            }
    }],
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        text: 'Sub Module',
        flex: 1
    },
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