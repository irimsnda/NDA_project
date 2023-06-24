
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.InspectedPoepermitsDashGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'inspectedpoepermitsdashgrid',
    itemId: 'inspectedpoepermitsdashgrid',
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
                    storeId: 'inspectedpoepermitsdashgridstr',
                    groupField: 'inspection_by',
                    remoteFilter: true,
                    enablePaging: true,
                    proxy: {
                        url: 'importexportpermits/getInspectedPoeinspectionprocessdetails',
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
                    name: 'port_id',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel: 'Port of Entry/Exit',
                    listeners: {
                        beforerender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_ports_information',
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
                                        table_name: 'par_poeinspection_recommendation',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }, {
                    xtype:'combo',
                    name: 'section_id',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel: 'Permit section',
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
                text: 'Filter Permits Inspection',
                iconCls:'x-fa fa-search',
                handler: 'funcFilterInspectedPOEPermits'
            },{
                text: 'Export Inspected Permits',
                iconCls:'x-fa fa-print',
                handler: 'funcExportInspectedpermits'
            },{
                text: 'Clear Filter',
                iconCls:'x-fa fa-cancel',
                ui: 'soft-red',
                handler: 'funcClearFilterInspectedPOEPermits'
            }]
        }
    ],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'POE Import/Export Inspections',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        inspection_status_id: 1,
        beforeLoad: function () {
            this.up('inspectedpoepermitsdashgrid').fireEvent('refresh', this);//
        }
    }],
    features: [ {
          ftype: 'grouping',
        startCollapsed: false,
          groupHeaderTpl: 'Inspected: {[values.rows[0].data.inspection_by]}, [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    columns: [ {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        width: 130,filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'Permit No',
        width: 130,
        filter: {
            xtype: 'textfield'
        }
    },   {
        xtype: 'gridcolumn',
        text: 'Permit section ',
        dataIndex: 'permit_section',
        width: 130,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        text: 'Inspection By',
        dataIndex: 'inspection_by',
        width: 130,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    },
    {
        xtype: 'gridcolumn',
        text: 'Inspected On',
        dataIndex: 'inspected_on',
        width: 130,
        tdCls: 'wrap',
        filter: {
            xtype: 'datefield',
            format:'Y-m-d'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'port_ofentryexit',
        text: 'Port of Entry/Exit',
        width: 130
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'proforma_invoice_no',
        text: 'Proforma Invoice No',
        width: 130,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tra_reg_number',
        text: 'TRA Reg NUmber',
        width: 130,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_status',
        text: 'Inspection Status',
        width: 130,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    } ,{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_recommendation',
        text: 'Inspection Recommendation',
        width: 130,
        tdCls: 'wrap',
        
    } ,{
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        text: 'Inspection Remarks',
        width: 130,
        tdCls: 'wrap',
        
    } ,{
        text: 'Insepection Details',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'Preview-Inspection Details',
                        handler: 'previewInspectionDetails'
                    }
                ]
            }
        }
    }]
});
