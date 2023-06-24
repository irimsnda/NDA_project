/**
 * Created by Kip on 11/2/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.InspectedApprovedPremisesInspectionDashGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'inspectedapprovedpremisesinspectiondashgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    
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
            items: [
               {
                   xtype:'datefield',
                   name: 'inspected_from',
                   format: 'Y-m-d',
                    fieldLabel: 'Inspected From'
                }, {
                    xtype:'datefield',
                    name: 'inspected_to',
                    format: 'Y-m-d',
                    fieldLabel: 'Inspected To'
                }, {
                    xtype:'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'inspection_type_id',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel: 'Inspection Type',
                    listeners: {
                        beforerender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_inspection_types',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }, {
                    xtype:'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'inspection_recommendation_id',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel: 'Inspection Recommendation',
                    listeners: {
                        beforerender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_premiseinspection_recommendations',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }, {
                    xtype:'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'approval_recommendation_id',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel: 'Approval Recommendation ',
                    listeners: {
                        beforerender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_premiseinspection_recommendations',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }, {
                    xtype:'datefield',
                    name: 'approved_from_date',
                    format: 'Y-m-d',
                     fieldLabel: 'Approved From'
                 }, {
                     xtype:'datefield',
                     name: 'approved_to_date',
                     format: 'Y-m-d',
                     fieldLabel: 'Approved To'
                 }, {
                    xtype:'combo',
                    name: 'section_id',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel: 'Premises section',
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
                        }
                    }
                }
            ],
            buttons:[{
                text: 'Filter Premises Inspection',
                iconCls:'x-fa fa-search',
                handler: 'funcFilterInspectedPPremisesEPermits'
            },{
                text: 'Export Inspected Premises',
                iconCls:'x-fa fa-print',
                handler: 'funcExportInspectedPremises'
            },{
                text: 'Clear Filter',
                iconCls:'x-fa fa-cancel',
                ui: 'soft-red',
                handler: 'funcClearFilterInspectedPremisesPermits'
            }]
        }
    ],
    bbar:[{
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        table_name: 'tra_premises_applications',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
   
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            
            config: {
                pageSize: 10000,
                storeId: 'premisesinspectionreviewrecomstr',
                groupField: 'business_type_id',
                remoteFilter: true,
                proxy: {
                    url: 'premiseregistration/getPremisesApprovedinspectiondetails'
                }
            },
            isLoad: true
        }
    }, plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Inspection Ref Number',
        flex: 1,filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Premise Name',
        flex: 1,filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region Name',
        flex: 1,filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'district_name',
        text: 'District Name',
        flex: 1,filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1,filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_recommendation',
        text: 'inspection_recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_type',
        text: 'Inspection Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'actual_start_date',
        text: 'Inspection Start Date',
        format: 'Y-m-d',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'actual_end_date',
        text: 'Inspection End Date',
        format: 'Y-m-d',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approval_status',
        text: 'Approval Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'approval_remarks',
        text: 'Approval Remarks',
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
                items: [
                    {
                        text: 'Preview Inspection Report',
                        iconCls: 'x-fa fa-chevron-circle-up',
                        handler: 'previewInspectionDetails',
                        stores: '["approvaldecisionsstr"]',
                        table_name: 'tra_premises_applications'
                    }
                ]
            }
        }
    }]
});
