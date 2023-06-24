Ext.define('Admin.view.importexportpermits.views.commoninterfaces.PoeInspectionPreviewPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'poeinspectionpreviewpnl',
    layout: {//
        type: 'fit'
    },
    height: Ext.Element.getViewportHeight() - 118,
    controller: 'importexportpermitsvctr',
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [
    {
        xtype: 'form',
        autoScroll: true,
        collapsible: true,
        layout: 'form',
        title: 'Import/Export Inspection Details',
        items: [{
            xtype: 'hiddenfield',
            name: 'poe_application_id',
            allowBlank: true
        }, {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype:'datefield',
            fieldLabel:'Date of Inspection',
            format: 'Y-m-d',
            maxValue: new Date(), altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
       
            name: 'inspected_on'
        } 
        ,{
            xtype:'textfield',
            fieldLabel:'TRA Registration Number',
            name: 'tra_reg_number'
        } 
        , {
            xtype: 'combo',
            fieldLabel: 'Clearing Agent',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            labelAlign:'top',
            name: 'clearing_agent_id',
            queryMode: 'local',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'configurations/getNonrefParameter',
                           
                            extraParams: {
                                table_name: 'par_clearing_agents',
                                has_filter: 0
                            }
                        }
                    },
                    isLoad: true
                }
            }
            
        }
        ,{
            xtype:'datefield',
            maxValue: new Date(),
            fieldLabel:'TRA Registration Date',format: 'Y-m-d', altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
       
            name: 'tra_reg_date'
        }
        , {
            xtype: 'combo',
            fieldLabel: 'Port Of Entry/Exit',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            name: 'poeport_id',
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
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
        } 
        ]
    },
     {
        xtype: 'grid',
        title: 'Import/Export Permit & Inspected Products Details',
        plugins: [{
                ptype: 'gridexporter'
        }],
        export_title: 'Import/Export Permits Products',
        bbar: [{
            xtype: 'pagingtoolbar',
            width: '70%',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
                var grid = this.up('grid'),
                    panel = grid.up('panel'),
                    form = panel.down('form'),
                    application_code = form.down('hiddenfield[name=application_code]').getValue(),
                    poe_application_id = form.down('hiddenfield[name=poe_application_id]').getValue(),
                    store = this.getStore();
                store.getProxy().extraParams = {
                    application_code: application_code,
                    poe_application_id: poe_application_id
                };
            }
        }],
        features: [{
            ftype: 'searching',
            minChars: 2,
            position:'bottom',
            mode: 'local'
        },{
            ftype: 'summary',
            dock: 'bottom'
        }],
        listeners: {
            afterrender: {
                fn: 'setProductRegGridsStore',
                config: {
                    pageSize: 100000,
                    remoteFilter: true,
                    storeId: 'poeinspectionpermitsproductspreviewstr',
                        proxy: {
                            url: 'importexportpermits/getPoeInspectionPermitsProducts',
                            
                        }
                },
                isLoad: true
            }
        },
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'brand_name',
            text: 'Brand Name/Device Name',
            flex: 2,
            
        },{
            xtype: 'gridcolumn',
            dataIndex: 'common_name',
            hidden: true,
            text: 'Common/Generic Name',
            flex: 1,
           
        },{
            xtype: 'gridcolumn',
            dataIndex: 'unit_price',
            text: 'Unit Value',
            flex: 0.5,
           
        },{
            xtype: 'gridcolumn',
            dataIndex: 'total_value',
            text: 'Total Value',
            flex: 1,
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
            flex: 0.5,
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'poe_prod_quantity',
            text: 'Quantity at the Port',
            flex: 1
        },  {
            xtype: 'gridcolumn',
            dataIndex: 'balance',
            text: 'Balance',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'batch_numbers',
            text: 'Batch Number(Comma Seperator)',
            flex: 1,
            
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'remarks',
            text: 'Remarks',
            flex: 1,
            editor: {
                xtype: 'textarea'
            }
        }]
    }, 
     {
        xtype: 'grid',
        autoScroll:true,
        title: 'Previous Inspections',
        bbar: [{
            xtype: 'pagingtoolbar',
            width: '100%',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function() {
                var grid = this.up('grid'),
                    panel = grid.up('panel'),
                    form = panel.down('form'),
                    application_code = form.down('hiddenfield[name=application_code]').getValue(),
                    poe_application_id = form.down('hiddenfield[name=poe_application_id]').getValue(),
                    store = this.getStore();
                store.getProxy().extraParams = {
                    application_code: application_code,
                    poe_application_id: poe_application_id
                };
            }
        }],
        listeners: {
            afterrender: {
                fn: 'setProductRegGridsStore',
                config: {
                    pageSize: 100000,
                    storeId: 'previousinspectionsdetailspreviewstr',
                    groupField:'sub_module',
                        proxy: {
                            url: 'importexportpermits/getInspectedPermitsProducts',
                            
                        }
                },
                isLoad: true
            }
        },
        plugins: [
            {
                ptype: 'gridexporter'
            }
        ],
        export_title: 'POE Import/Export Inspections applications',

        columns: [ {
            xtype: 'gridcolumn',
            dataIndex: 'permit_no',
            text: 'Permit No',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            text: 'Inspection By',
            dataIndex: 'inspection_by',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Inspected On',
            dataIndex: 'inspected_on',
            flex: 1,
            tdCls: 'wrap'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'port_ofentryexit',
            text: 'Port of Entry/Exit',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'proforma_invoice_no',
            text: 'Proforma Invoice No',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'tra_reg_number',
            text: 'TRA Reg NUmber',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'inspection_status',
            text: 'Inspection Status',
            flex: 1,
            tdCls: 'wrap'
        }, {
            xtype: 'gridcolumn',
            text: 'Date Added',
            dataIndex: 'date_added',
            flex: 1,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
        }]
        
    }
    ]
});


