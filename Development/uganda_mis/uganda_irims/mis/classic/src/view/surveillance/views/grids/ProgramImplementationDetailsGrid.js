/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.ProgramImplementationDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'programimplementationdetailsgrid',
   
    width: '100%',
    autoScroll: true,
    autoHeight: true,
    headers: false,
    height: Ext.Element.getViewportHeight() - 225,
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
    tbar:[{
        xtype: 'combo',
        fieldLabel: 'PROGRAM',
        labelWidth: 80,
        emptyText: 'PMS PROGRAM',
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'pms_program_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'surveillance/getPmsPrograms'
                    }
                },
                isLoad: false
            },
            
            change: function (cmbo, newVal) {
                
                var store = this.getStore(),
                    grid = this.up('grid'),
                    gridStr = grid.getStore(),
                    program_implementationStr = grid.down('combo[name=program_implementation_id]').getStore();
                    

                    program_implementationStr.removeAll();
                    program_implementationStr.load({params:{program_id:newVal}});

                    gridStr.removeAll();
                    gridStr.load();
                  
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
        xtype: 'combo',
        fieldLabel: 'PROGRAM',
        labelWidth: 80,
        emptyText: 'PMS IMPLEMENTATION PLAN',
        width: 320,
        valueField: 'program_implementation_id',
        displayField: 'program_implementation',
        forceSelection: true,
        name: 'program_implementation_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'surveillance/getPmsProgramsImplementation'
                    }
                },
                isLoad: false
            },
            
            change: function (cmbo, newVal) {
                
                var store = this.getStore(),
                    record = store.getById(newVal),
                    grid = this.up('grid'),
                    start_date_fld = grid.down('datefield[name=start_date]'),
                    end_date_fld = grid.down('datefield[name=end_date]');
                    start_date_fld.reset();
                    end_date_fld.reset();
                    if (record) {
                        start_date_fld.setValue(record.get('implementationstart_date'));
                        end_date_fld.setValue(record.get('implementationend_date'));
                    }
                    grid.getStore().load();
                    
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Zone',
        labelWidth: 80,
        emptyText: 'Zone',
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'zone_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_zones'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function (cmbo, newVal) {
                
                    var store = this.getStore(),
                        grid = this.up('grid');
                        grid.getStore().load();
                        
                }
            },
       
    }, {
        xtype: 'datefield',
        emptyText: 'Implementation START DATE',
        width: 250,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'start_date',
        queryMode: 'local',
        readOnly: true,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    }, {
        xtype: 'datefield',
        emptyText: 'Implementation END DATE',
        width: 250,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'end_date',
        queryMode: 'local',
        readOnly: true,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'PMS Implementation Programs',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '90%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store=this.getStore(),
                grid=this.up('grid'),
                program_implementation_id = grid.down('combo[name=program_implementation_id]').getValue();
                program_id=grid.down('combo[name=pms_program_id]').getValue();
                zone_id=grid.down('combo[name=zone_id]').getValue();

                
                store.getProxy().extraParams={
                    program_id:program_id,
                    program_implementation_id:program_implementation_id,
                    zone_id:zone_id
                }
                
        }
    }, {
        xtype: 'exportbtn'
    }],
    features: [ {
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Program & Implementation: {[values.rows[0].data.program_name]} {[values.rows[0].data.program_implementation]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                groupField: 'program_implementation',
                storeId: 'pmsprogramsimplementationtr',
                proxy: {
                    url: 'surveillance/getPmsProgramsImplementationDetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'program_name',
        tdCls:'wrap-text',
        text: 'Program Name/Identity',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'program_implementation',
        text: 'Program Implementation', tdCls:'wrap-text',
        flex: 1
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'year_of_implementation',
        text: 'Year of Implementation',
        flex: 1
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'implementationstart_date',
        text: 'Implementation Start Date',
        flex: 1
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'implementationstart_date',
        text: 'Implementation Start Date',
        flex: 1
    },{
        
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region Name',
        flex: 1
    },{
        
        xtype: 'gridcolumn',
        dataIndex: 'district_name',
        text: 'Districts Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'site_level',
        tdCls:'wrap-text',
        text: 'Site Level',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sampling_site',
        tdCls:'wrap-text',
        text: 'Sampling Site',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'category_name',
        text: 'Product Category',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product',
        tdCls:'wrap-text',
        text: 'Product',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        text: 'Dosage Form',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_form',
        hidden: true,
        text: 'Product Form',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'device_type',
        hidden: true,
        text: 'Device Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        hidden: true,
        text: 'Common Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'strength_txt',
        text: 'Strength',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'number_of_brand',
        text: 'Number of Brands to be Collected',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'number_of_batch',
        text: 'Number of batch per brand to be Collected',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'pack',
        text: 'Unit Pack',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'number_of_unitpack',
        text: 'Number of unit pack per batch to be Collected',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'total_samples',
        text: 'Total number of samples to be Collected',
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
                    text: 'View Program Implementation Plan',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'View Program Implementation Plan',
                    action: 'edit',
					
                    childObject : 'pmsprogramplansgrid',
					childObjectTitle:'PMS Program Implementation Plan',
                    handler: 'showProgramImplementationPlans',
                    stores: '[]'
                }
                ]
            }
        }
    }]
});
