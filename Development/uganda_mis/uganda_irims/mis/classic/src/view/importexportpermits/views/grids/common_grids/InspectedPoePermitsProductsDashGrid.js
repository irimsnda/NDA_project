
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.InspectedPoePermitsProductsDashGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'inspectedpoepermitsproductsdashgrid',
    itemId: 'inspectedpoepermitsproductsdashgrid',
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
                    storeId: 'inspectedpoepermitsproductsdashgridstr',
                    groupField: 'permit_no',
                    remoteFilter: true,
                    enablePaging: true,
                    proxy: {
                        url: 'importexportpermits/getInspectedPoeinspectionProductsdetails',
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
                handler: 'funcExportInspectedPermitsProducts'
            },{
                text: 'Clear Filter',
                iconCls:'x-fa fa-cancel',
                ui: 'soft-red',
                handler: 'funcClearFilterInspectedPOEPermits'
            }]
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
            this.up('inspectedpoepermitsproductsdashgrid').fireEvent('refresh', this);//
        }
    }],
    features: [ {
          ftype: 'grouping',
        startCollapsed: false,
          groupHeaderTpl: 'Permit No: {[values.rows[0].data.permit_no]}, [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    columns: [{
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
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        width: 150,filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'Permit No',
        width: 150,
        filter: {
            xtype: 'textfield'
        }
    },   {
        xtype: 'gridcolumn',
        text: 'Permit section ',
        dataIndex: 'permit_section',
        width: 150,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        text: 'Inspection By',
        dataIndex: 'inspection_by',
        width: 150,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    },
    {
        xtype: 'gridcolumn',
        text: 'Inspected On',
        dataIndex: 'inspected_on',
        width: 150,
        tdCls: 'wrap',
        filter: {
            xtype: 'datefield',
            format:'Y-m-d'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'port_ofentryexit',
        text: 'Port of Entry/Exit',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'proforma_invoice_no',
        text: 'Proforma Invoice No',
        width: 150,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tra_reg_number',
        text: 'TRA Reg NUmber',
        width: 150,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_status',
        text: 'Inspection Status',
        width: 150,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    } ,{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_recommendation',
        text: 'Inspection Recommendation',
        width: 150,
        tdCls: 'wrap',
        
    } ,{
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        text: 'Inspection Remarks',
        width: 150,
        tdCls: 'wrap',
        
    } ,{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        width: 150,tdCls:'wrap-text',
        text: 'Brand Name/Device Name',
        filter: {
            xtype: 'textfield'
        }
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        width: 150,tdCls:'wrap-text',
        text: 'Common Name(Generic Names)',
        filter: {
            xtype: 'textfield'
        }
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'prodcertificate_no',
        width: 150,tdCls:'wrap-text',
        text: 'Product Certificate Number',
        filter: {
            xtype: 'textfield'
        }
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'unit_price',
        text: 'Unit Value',
        width: 150,tdCls:'wrap-text',
        flex: 0.5,
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'total_value',
        text: 'Total Value',
        width: 150,tdCls:'wrap-text',
        summaryType: 'sum',
        renderer: function (val, meta, record) {
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'permit_quantity',
        text: 'Permit Quantity',
        width: 150,tdCls:'wrap-text',
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'poe_prod_quantity',
        text: 'Inspected Quantity',
        width: 150,tdCls:'wrap-text',
        

    },{
        xtype: 'gridcolumn',
        dataIndex: 'batch_numbers',
        text: 'Batch Number(Comma Seperator)',
        width: 150,tdCls:'wrap-text',
        tdCls:'wrap-text',
        filter: {
            xtype: 'textfield'
        }
		
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        text: 'Remarks',
        width: 150,tdCls:'wrap-text'
    }]
});
