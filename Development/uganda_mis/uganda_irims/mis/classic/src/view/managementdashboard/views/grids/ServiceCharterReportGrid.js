
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ServiceCharterReportGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'managementdashboardVctr',
    xtype: 'servicecharterreportgrid',
    itemId: 'servicecharterreportgrid',
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

    listeners: {
        afterrender: {
            fn: 'setProductRegGridsStore',
            config: {
                    storeId: 'servicecharterreportgridstr',
                    groupField: 'type_of_service',
                    remoteFilter: true,
                    enablePaging: true,
                    proxy: {
                        url: 'reports/getServiceCharterReportDetails',
                        reader: {
                            type: 'json',
                            rootProperty: 'results',
                            totalProperty: 'totals'
                        }
                    }
            },
            isLoad: true
        }
    },
    dockedItems: [
        {
            xtype: 'form',
            ui: 'footer',
            dock: 'top',
            layout:{
                type:'column',
                columns:5
            },
            defaults:{
                margin:2,
                labelAlign:'top',
                columnWidth: 0.2
            },
            items: [{
                    xtype:'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'module_id',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel: 'Module(s)',
                    listeners: {
                        beforerender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'modules',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        },beforequery: function() {
                        	var store=this.getStore();
                        	
                            var all={name: 'All System Processes',id:0};
                              store.insert(0, all);
                            },
                         afterrender: function(combo) {
        		            		combo.select(combo.getStore().getAt(0));	
        		            	},
                    }
                },{
                    xtype:'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'service_type_id',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel: 'Service Types',
                    listeners: {
                        beforerender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_service_types',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        },beforequery: function() {
                        	var store=this.getStore();
                        	
                            var all={name: 'All Service Types',id:0};
                              store.insert(0, all);
                            },
                         afterrender: function(combo) {
        		            		combo.select(combo.getStore().getAt(0));	
        		            	},
                    }

                },{
                    xtype:'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'section_id',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel: 'Sections',
                    listeners: {
                        beforerender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_sections',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        },beforequery: function() {
                        	var store=this.getStore();
                        	
                            var all={name: 'All Sections',id:0};
                              store.insert(0, all);
                            },
                         afterrender: function(combo) {
        		            		combo.select(combo.getStore().getAt(0));	
        		            	},
                    }

                },{
                    xtype:'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'zone_id',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel: 'Zones',
                    listeners: {
                        beforerender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_zones',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        },beforequery: function() {
                        	var store=this.getStore();
                        	
                            var all={name: 'All Zones',id:0};
                              store.insert(0, all);
                            },
                         afterrender: function(combo) {
        		            		combo.select(combo.getStore().getAt(0));	
        		            	},
                    }

                },
               {
                   xtype:'datefield',
                   name: 'received_from',
                   format: 'Y-m-d',
                    fieldLabel: 'Received(Submission) From'
                }, {
                    xtype:'datefield',
                    name: 'received_to',
                    format: 'Y-m-d',
                    fieldLabel: 'Received(Submission) to'
                }
            ],
            buttons:[{
                text: 'Filter',
                iconCls:'x-fa fa-search',
                handler: 'funcFilterServiceCharterSummaryRpt'
            },{
                text: 'Clear Filter',
                iconCls:'x-fa fa-cancel',
                ui: 'soft-red',
                handler: 'funcClearFilterServiceCharterSummaryRpt'
            },{
                text: 'Print Service Charter Report',
                iconCls:'x-fa fa-print',
                handler: 'funcPrintServiceCharterSummaryRpt'//funcExportInspectedpermits
            },{
                text: 'Print Service Charter Report(Sections)',
                iconCls:'x-fa fa-print',
                handler: 'funcPrintServiceCharterSectionsSummaryRpt'//funcExportInspectedpermits
            },{
                text: 'Export Detailed Service Charter Report',
                iconCls:'x-fa fa-print',
                hidden: true,
                handler: 'funcExportServiceCharterDetailedRpt'//funcExportInspectedpermits
            },]
        }
    ],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Service Charter Report',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        inspection_status_id: 1,
        beforeLoad: function () {
            this.up('servicecharterreportgrid').fireEvent('refresh', this);//
        }
    }],
    features: [ {
          ftype: 'grouping',
        startCollapsed: false,
          groupHeaderTpl: 'Type of Service: {[values.rows[0].data.service_type]}, [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    columns: [ {
        xtype: 'gridcolumn',
        dataIndex: 'servicetype_details',
        text: 'Type of Service',
        flex:1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'standard_servicedelivery',
        text: 'Standard of Service Delivery',
        flex:1
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'received_samples',
        text: 'Received Applications',
        flex:1
        
    },   {
        xtype: 'gridcolumn',
        dataIndex: 'queried_no_response',
        text: 'Queried Applications',
        flex:1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'complied_applications',
        text: 'Complied',
        flex:1
    },{
        xtype: 'gridcolumn',
        text: 'Non Compliance',
        dataIndex: 'non_complience_apps',
        width: 130,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        text: '% of Compliance(Complied/Received *100%)',
        dataIndex: 'rate_of_complaince',
        width: 130,
        tdCls: 'wrap'
    }]
});
