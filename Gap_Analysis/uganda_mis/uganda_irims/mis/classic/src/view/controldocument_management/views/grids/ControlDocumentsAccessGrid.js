
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.controldocument_management.views.grids.ControlDocumentsAccessGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'controldocumentmanagementvctr',
    xtype: 'controldocumentsaccessgrid',
    itemId: 'controldocumentsaccessgrid',
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
    store: 'controllleddocumentsaccessstr',
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }, {
        xtype: 'tbspacer',
        width: 10
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        },{
            ptype: 'filterfield'
        }
    ],
    export_title: 'Control Document applications',

    listeners: {
      //  itemdblclick: 'onViewControlDocumentApplication',
        afterrender:function(grid){
            grid.store.load();
        }
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],bbar: [{
        xtype: 'pagingtoolbar',
        width: '85%',
        displayInfo: true,
        store: 'controllleddocumentsaccessstr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

            this.up('controllleddocumentsaccessgrid').fireEvent('refresh', this);

        }
    },{
        xtype: 'checkbox',
        name:'enable_grouping',
        boxLabel:'Enable Grouping',
        listeners:{
              change:function(chk,value){
                      var grid = chk.up('grid');
                          grouping = grid.getView().findFeature('grouping');
                          if(value == 1){
                              grouping.enable();
                          }
                          else{
                              grouping.disable();
                          }
              }
        }
      },
      {
          xtype: 'exportbtn'
      }],
    columns: [{
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
                    text: 'Preview Control Document',
                    iconCls: 'x-fa fa-file',
                    tooltip: ' Control Document',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Control Document',
                    winWidth: '85%',
                    isReadOnly: 1,
                    document_type_id: '',
                    handler: 'previewUploadedDocument'
                },{
                    text: 'Preview Previous Versions',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Previous Versions',
                    childXtype: 'previouscontrollleddocumentsaccessgrid',
                    winTitle: 'Previous Versions',
                    winTitle: 'Previous Versions',
                    winWidth: '60%',
                    handler: 'showPreviousDocumentVersions'
                }
                ]
            }
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Document Ref Number',
        width: 200,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'version_no',
        text: 'Document Version No',
        width: 200
    },{
        xtype: 'gridcolumn',
        dataIndex: 'directorate_name',
        text: 'Directorate Name',
        width: 160,
        filter: {
            xtype: 'combo',
            emptyText: 'Select Directorate',
            name: 'directorate_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_directorates'
                            }
                        }
                    },
                    isLoad: true
                },
                change:'funcChangeDirectoratesOnGrid'
            }
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'directorate_unit',
        text: 'Directorate Unit',
        width: 160,
        filter: {
            xtype: 'combo',
            emptyText: 'Select Directorate Units',
            name: 'directorate_unit_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_directorate_units'
                            }
                        }
                    },
                    isLoad: false
                },
                change: function() {
                   Ext.data.StoreManager.lookup('controllleddocumentsaccessstr').reload();
                }
            }
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'document_type',
        text: 'Document Type',
        width: 200,
        filter: {
            xtype: 'combo',
            emptyText: 'Select Control Document Type',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true, 
            allowBlank: false,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_controldocument_types'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function() {
                   Ext.data.StoreManager.lookup('controllleddocumentsaccessstr').reload();
                }
            }
        }
    },
    {
        xtype: 'gridcolumn',
        text: 'Authorized By',
        dataIndex: 'approved_byname',
        width: 200,
        tdCls: 'wrap',
        filter: {
            xtype:'combo',
            emptyText:'Select Authorized By',  
            allowBlank: false,
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_controldocument_positions'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function() {
                   Ext.data.StoreManager.lookup('controllleddocumentsaccessstr').reload();
                }
            }
        }
    },
    {
        xtype: 'gridcolumn',
        text: 'Prepared By',
        dataIndex: 'requested_byname',
        width: 200,
        tdCls: 'wrap',
        filter: {
            xtype:'combo',
            emptyText:'Select Prepared By',  
            allowBlank: false,
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_controldocument_positions'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function() {
                   Ext.data.StoreManager.lookup('controllleddocumentsaccessstr').reload();
                }
            }
        }
    },
    {
        xtype: 'gridcolumn',
        text: 'Checked By',
        dataIndex: 'checked_byname',
        width: 200,
        tdCls: 'wrap',
        filter: {
            xtype:'combo',
            emptyText:'Select Checked By',  
            allowBlank: false,
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_controldocument_positions'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function() {
                   Ext.data.StoreManager.lookup('controllleddocumentsaccessstr').reload();
                }
            }
        }
    }, {
        xtype: 'gridcolumn',
        text: 'Approved On', renderer:Ext.util.Format.dateRenderer('d/m/Y'),
        dataIndex: 'approval_date',
        width: 200,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Effective From',
        dataIndex: 'effective_date_from',
        width: 200,
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        tdCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        text: 'Next Review Date',
        dataIndex: 'next_review_date',
        width: 200, 
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        text: 'Document Status',
        dataIndex: 'document_status',
        width: 200,
        tdCls: 'wrap',
        hidden: true,
        filter: {
            xtype: 'combo'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_controlled_document',
        text: 'Is Controlled Document',
        width: 200,
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:red';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:green';
            return "False";
        },
        filter: {
            xtype:'combo',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'users'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function() {
                   Ext.data.StoreManager.lookup('controllleddocumentsaccessstr').reload();
                }
            }
        }
    }]
});
