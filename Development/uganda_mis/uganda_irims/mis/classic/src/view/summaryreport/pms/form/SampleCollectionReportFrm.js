
Ext.define('Admin.view.summaryreport.pms.form.SampleCollectionReportFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'samplecollectionreportFrm',
	layout: 'column',
	defaults:{
		bodyPadding: 1,
        margins: '0 0 0 0',
        columnWidth: 0.25
	},
   items: [
   // {
   //      xtype: 'combo',
   //      fieldLabel: 'Program Name',
   //      ////width: 200,
   //      forceSelection: true,
   //      queryMode: 'local',
   //      valueField: 'id',
   //      labelAlign : 'top',
   //      displayField: 'name',
   //      name: 'program_name',
   //      allowBlank: false,
   //      fieldStyle: {
   //          'color': 'green',
   //          'font-weight': 'bold'
   //      },
   //      listeners: {
   //          beforerender: {
   //              fn: 'setConfigCombosStore',
   //              config: {
   //                  pageSize: 100,
   //                  proxy: {
   //                  url: 'configurations/getConfigParamFromTable',
   //                  extraParams: {
   //                      table_name: 'pms_program_details'
   //                  }
   //                 }
   //              },
   //              isLoad: true
   //          },
   //          beforequery: function() {
   //              var store=this.getStore();
                
   //              var all={name: 'All',id:0};
   //                store.insert(0, all);
   //              },
             
   //      }
   //  },
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
        fieldLabel: 'Region',
        emptyText: 'All',
        //width: 200,
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'region_id',
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
                        table_name: 'par_regions'
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
        fieldLabel: 'Distribution Levels',
        //width: 200,
        forceSelection: true,
        emptyText: 'All',
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'site_level_id',
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
                        table_name: 'par_site_levels'
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
        fieldLabel: 'Sampling Site',
        //width: 200,
        emptyText: 'All',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'site_id',
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
                        table_name: 'par_business_types'
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
    // ,{
    //     xtype: 'combo',
    //     fieldLabel: 'Classification',
    //     //width: 200,
    //     forceSelection: true,
    //     queryMode: 'local',
    //     valueField: 'id',
    //     labelAlign : 'top',
    //     displayField: 'name',
    //     name: 'classification_id',
    //     allowBlank: false,
    //     fieldStyle: {
    //         'color': 'green',
    //         'font-weight': 'bold'
    //     },
    //     listeners: {
    //         beforerender: {
    //             fn: 'setConfigCombosStore',
    //             config: {
    //                 pageSize: 100,
    //                 proxy: {
    //                 url: 'configurations/getConfigParamFromTable',
    //                 extraParams: {
    //                     table_name: 'par_classifications'
    //                 }
    //                }
    //             },
    //             isLoad: true
    //         },
    //         beforequery: function() {
    //             var store=this.getStore();
                
    //             var all={name: 'All',id:0};
    //               store.insert(0, all);
    //             },
    //         afterrender: function(combo) {
    //                     combo.select(combo.getStore().getAt(0));    
    //                 },

    //     }
    // }
   ,{
        xtype: 'combo',
        fieldLabel: 'Product',
        //width: 200,
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        emptyText: 'All',
        labelAlign : 'top',
        displayField: 'name',
        name: 'product_id',
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
                        table_name: 'par_common_names'
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
        fieldLabel: 'Dosage Form',
        //width: 200,
        forceSelection: true,
        queryMode: 'local',
        emptyText: 'All',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'dosage_form_id',
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
                        table_name: 'par_dosage_forms'
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