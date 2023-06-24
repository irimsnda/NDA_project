Ext.define('Admin.view.commoninterfaces.grids.TestParameterssGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'testparameterssgrid',
    itemId: 'testparameterssgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 550,
    storeID: 'sampleanalysistestrequestsstr',
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
    bbar: [{
        xtype: 'button',
        text: 'Test Parameter',
        name: 'sample_test_requests',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        winWidth: '35%',
        stores: '[]',
        handler: 'funcAddTestAnalysisParameter',
        bind: {
            hidden: '{isReadOnly}'  // negated
        }
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 20
    }],
    tbar:[{
        xtype: 'combo',
        fieldLabel: 'Sections',
        emptyText: 'Sections',
        name: 'section_id',
        forceSelection: true,
        queryMode: 'local',
        anyMatch: true,
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_sections',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            },
            change:function(cbo,value){
                var grid = cbo.up('grid'),
                CostCategoryStr = grid.down('combo[name=cost_category_id]').getStore();
                CostCategoryStr.removeAll();
                CostCategoryStr.load({params: {section_id: value}});

                grid.store.removeAll();
                grid.store.load({params:{section_id:value}});
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Category',
        emptyText: ' Category',
        name: 'cost_category_id',
        forceSelection: true,
        queryMode: 'local',
        anyMatch: true,
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_cost_categories',
                            has_filter: 1,
                            no_section: 1
                        }
                    }
                },
                isLoad: false
            },
            change:function(cbo,value){
                var grid = cbo.up('grid'),
                     CostSubCategoryStr = grid.down('combo[name=sub_cat_id]').getStore();
                     CostSubCategoryStr.removeAll();
                     CostSubCategoryStr.load({params: {cost_category_id: value}});

                     
                     grid.store.removeAll();
                     grid.store.load({params:{cost_category_id:value}});
                     
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Sub-Category',
        emptyText: ' Sub-Category',
        name: 'sub_cat_id',
        forceSelection: true,
        queryMode: 'local',
        anyMatch: true,
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_cost_sub_categories',
                            has_filter: 1
                        }
                    }
                },
                isLoad: false
            },change:function(cbo,value){
                var grid = cbo.up('grid'),
                     store = grid.store;

                     store.removeAll();
                     store.load({params:{sub_cat_id:value}});

            }
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    selModel: {
        selType: 'checkboxmodel'
    },
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'testparameterssstr',
                proxy: {
                    url: 'sampleanalysis/getTestParametersDetails',
                }
            },
            isLoad: false
        }
    },
    export_title: ' Analysis Requests Parameters',
    bbar: [{
            text:'Add Test Parameters',
            iconCls:'fa fa-plus', 
            margin: 5,
            ui: 'soft-green',
            storeId: 'sampleanalysistestrequestsstr',
            action:'addsampletestparameters'
        
    },{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('testparameterssgrid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'cost_sub_category',
        text: 'Cost Sub Category',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'technique_name',
        text: 'Analysis Technique',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'test_parameter',
        text: 'Test parameter',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'cost',
        text: 'Costs(Usd)',
        flex: 1
    }]
});
