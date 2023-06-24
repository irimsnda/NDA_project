
Ext.define('Admin.view.configurations.views.grids.EnquiriesSubmissionApplicationsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'enquiriessubmissionapplicationsGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    plugins: [
        {
            ptype: 'gridexporter'
        },
        {
            ptype: 'filterfield'
        },
        {
            ptype: 'bufferedrenderer',
            trailingBufferZone: 20,
            leadingBufferZone: 50
        }
    ],
    export_title: 'SubmissionsApplications',
    
    tbar:[{
            xtype: 'toolbar',
            ui: 'footer',
            defaults: {
                labelAlign: 'top'
            },
            width: '100%',
            layout: 'hbox',
                items:[{
                xtype: 'combo',
                fieldLabel: 'Module',
                margin: '0 20 20 0',
                flex:1,
                name: 'module_id',
                valueField: 'id',
                value: 0,
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'modules',
                                    filters: JSON.stringify({'is_application':1})
                                }
                            }
                           },
                        isLoad: true
                    },
                    change: 'func_loadSubModules'
                }
            }, {
                xtype: 'combo',
                fieldLabel: 'Sub-Modules',
                margin: '0 20 20 0',
                name: 'sub_module_id',
                flex:1,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'sub_modules'
                                }
                            }
                           },
                        isLoad: false
                    },
                    change: 'func_reloadGridStore',
                }
            }, {
                xtype: 'combo',
                fieldLabel: 'Section Name',
                margin: '0 20 20 0',
                name: 'section_id',
                flex:1,
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
                                extraParams: {
                                    model_name: 'Sections'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: 'func_reloadGridStore',
                }
            },{
                xtype: 'combobox',
                queryMode: 'local',
                fieldLabel: 'Application Status',
                displayField: 'name',
                valueField: 'id',
                name: 'status_id',
                listeners:
                 {
                     beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'openoffice/getOnlineSubmissionStatuses',                        
                            }
                        },
                        isLoad: true
                    },
                 change: 'func_reloadGridStore'                }    
        },{
              xtype: 'textfield',
              fieldLabel: 'Reference/Tracking No:',
              flex: 1,
              name: 'reference',
              listeners: {
                  change: 'func_loadByReference'
              }
          }
        ]
        }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(me) {
            var grid = this.up('grid'),
                module_id = grid.down('combo[name=module_id]').getValue(),
                sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
                section_id = grid.down('combo[name=section_id]').getValue(),
                status_id = grid.down('combo[name=status_id]').getValue(),
                reference = grid.down('textfield[name=reference]').getValue(),
                store = grid.getStore();
                store.removeAll();

                store.getProxy().extraParams = {
                    'module_id':module_id,
                    'sub_module_id':sub_module_id,
                    'section_id':section_id,
                    'status_id':status_id,
                    'reference':reference
                }
        },  
    },'->',{
        xtype: 'exportbtn',
        text: 'Export Options'
    }],
    listeners: {
        beforerender: {
            fn: 'setReportGlobalStoreWithTBar',
            config: {
                //pageSize: 1000,
                storeId: 'applicationsubmissionenquiriesapplicationsStr',
                enablePaging: false,
                remoteFilter: false,
                proxy: {
                    url: 'openoffice/getSubmissionEnquiriesApplications',
                }
            },
            isLoad: false
        }
    },
    columns:[],
    // columnsCust: [{
    //     xtype: 'gridcolumn',
    //     dataIndex: 'applicant_name',
    //     text: 'Applicant Name',
    //     width: 150,
    //     tblCls: 'wrap',
    //     filter: {
    //         xtype: 'textfield'
    //     }
    // },{
    //     xtype: 'gridcolumn',
    //     dataIndex: 'contact_person',
    //     text: 'Contact Person',
    // },{
    //     xtype: 'gridcolumn',
    //     dataIndex: 'telephone_no',
    //     text: 'Tell',
    // },{
    //     xtype: 'gridcolumn',
    //     dataIndex: 'email',
    //     text: 'Email',
    //     width: 150,
    //     tblCls: 'wrap',
    // },{
    //     xtype: 'gridcolumn',
    //     dataIndex: 'postal_address',
    //     text: 'Postal Address',
    // },{
    //     xtype: 'gridcolumn',
    //     dataIndex: 'tracking_no',
    //     text: 'Tracking No',
    //     filter: {
    //         xtype: 'textfield'
    //     }
    // },{
    //     xtype: 'gridcolumn',
    //     dataIndex: 'reference_no',
    //     text: 'Reference No',
    //     width: 150,
    //     tblCls: 'wrap',
    //     filter: {
    //         xtype: 'textfield'
    //     }
    // },{
    //     xtype: 'datecolumn',
    //     dataIndex: 'created_on',
    //     format: 'Y-m-d',
    //     text: 'Created On',
    // },{
    //     xtype: 'datecolumn',
    //     dataIndex: 'submission_date',
    //     format: 'Y-m-d',
    //     text: 'Submitted On',
    //     width: 150,
    //     tblCls: 'wrap',
    //     filter: {
    //         xtype: 'datefield',
    //         format: 'Y-m-d'
    //     }
    // },
    // {
    //     xtype: 'gridcolumn',
    //     dataIndex: 'current_status',
    //     text: 'Current Status',
    //     width: 200,
    //     tblCls: 'wrap',
    //     filter: {
    //         xtype: 'combobox',
    //         queryMode: 'local',
    //         displayField: 'name',
    //         valueField: 'id',
    //         name: 'status_id',
    //         listeners:
    //          {
    //              beforerender: {
    //                 fn: 'setConfigCombosStore',
    //                 config: {
    //                     pageSize: 10000,
    //                     proxy: {
    //                         url: 'openoffice/getOnlineSubmissionStatuses',                        
    //                     }
    //                 },
    //                 isLoad: true
    //             },
    //          change: function(combo,newValue,old,eopts) {
    //             var grid = combo.up('grid'),
    //                 store = grid.getStore();
    //                 store.reload();
    //          }
    //         }
                
    //     }
    // }
    //]
});
