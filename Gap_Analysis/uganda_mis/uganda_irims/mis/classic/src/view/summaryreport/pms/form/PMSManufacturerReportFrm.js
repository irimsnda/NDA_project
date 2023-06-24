
Ext.define('Admin.view.summaryreport.pms.form.PMSManufacturerReportFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'pmsmanufacturerreportFrm',
	layout: 'column',
	defaults:{
		bodyPadding: 1,
        margins: '0 0 0 0',
        columnWidth: 0.25
	},
   items: [
    {
        xtype: 'combo',
        fieldLabel: 'Annual Implementation',
        emptyText: 'All',
        ////width: 200,
        labelAlign : 'top',
        valueField: 'id',
        displayField: 'program_implementation',
        forceSelection: true,
        name: 'implementation_id',
        queryMode: 'local',
        allowBlank: true,
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
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'pms_program_implementationplan',
                        }
                    }
                },
                isLoad: true
            },
             beforequery: function() {
                var store=this.getStore();
                
                var all={program_implementation: 'All',id:0};
                  store.insert(0, all);
                },
           
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
        fieldLabel: 'Product Category',
        //width: 200,
        emptyText: 'All',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'product_category_id',
        allowBlank: false,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'par_product_categories'
                    }
                   }
                },
                isLoad: true
            },
            beforequery: function() {
                var store=this.getStore();
                
                var all={name: 'All',id:0};
                  store.insert(0, all);
                },
            afterrender: function(combo) {
                        combo.select(combo.getStore().getAt(0));    
                    },

        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }
   
   ,{
        xtype: 'combo',
        fieldLabel: 'Manufacturer',
        //width: 200,
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        emptyText: 'All',
        labelAlign : 'top',
        displayField: 'name',
        name: 'manufacturer_id',
        allowBlank: false,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'tra_manufacturers_information'
                    }
                   }
                },
                isLoad: true
            },
            beforequery: function() {
                var store=this.getStore();
                
                var all={name: 'All',id:0};
                  store.insert(0, all);
                },
            afterrender: function(combo) {
                        combo.select(combo.getStore().getAt(0));    
                    },

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
        fieldLabel: 'Country of Origin',
        //width: 200,
        forceSelection: true,
        queryMode: 'local',
        emptyText: 'All',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'country_id',
        allowBlank: false,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'par_countries'
                    }
                   }
                },
                isLoad: true
            },
            beforequery: function() {
                var store=this.getStore();
                
                var all={name: 'All',id:0};
                  store.insert(0, all);
                },
            afterrender: function(combo) {
                        combo.select(combo.getStore().getAt(0));    
                    },

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
        xtype: 'datefield',
        fieldLabel: 'Sample Colletion Date From',
        name: 'date_from',
        labelAlign: 'top',
        allowBlank: false,
        format: 'Y-m-d',
    },{
        xtype: 'datefield',
        fieldLabel: 'Sample Colletion Date To',
        name: 'date_to',
        labelAlign: 'top',
        allowBlank: false,
        format: 'Y-m-d',
    },{
        xtype: 'button',
        text: 'Search Filter',
        name: 'filter_Report',
        labelAlign: 'top',
        margin: '30 30 10 5',
        ui: 'soft-green',
        iconCls: 'fa fa-search',
        columnWidth: 0.2,
        handler: 'func_LoadCollectedSamplesFilters',
        formBind: true,
},{
        xtype: 'button',
        text: 'Clear Filter',
        name: 'filter_Report',
        labelAlign: 'top',
        margin: '30 0 0 0',
        ui: 'soft-green',
        columnWidth: 0.15,
        iconCls: 'fa fa-eraser',
        handler: 'func_clear',
}]
});