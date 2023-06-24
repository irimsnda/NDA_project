Ext.define('Admin.view.reports.appsreport.productreport.form.ProductReportFiltersFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productreportfiltersfrm',
    layout: 'column',
    defaults:{
        bodyPadding: 1,
        margins: '0 0 0 0',
    },
    defaults: {
        columnWidth: 0.25
    },
      items:[{
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 1,
        hidden: true
    },{
            xtype: 'combo',
            emptyText: 'Sub Process(Sub module)',
             margin: 2,
            labelAlign : 'top',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            name: 'sub_module_id',
            queryMode: 'local',
            allowBlank: false,
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
                            url: 'workflow/getSystemSubModules',
                            extraParams: {
                                model_name: 'SubModule',
                                module_id: 1
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
            }
        
        },{
            xtype: 'combo',
            emptyText: 'Select Product Type(Sections)',
             margin: 2,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            labelAlign : 'top',
            displayField: 'name',
            name: 'section_id',
            allowBlank: false,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
                listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_sections'
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
                change: 'loadClassAndCategoryCombo',

            }
        },{
              xtype: 'combo',
              emptyText: 'Select Product Class Category',
               margin: 2,
              forceSelection: true,
              queryMode: 'local',
              valueField: 'id',
              labelAlign: 'top',
              displayField: 'name',
              name: 'prodclass_category',
              allowBlank: false,
              fieldStyle: {
                  'color': 'green',
                  'font-weight': 'bold'
              },
              listeners: {
                  beforerender: {
                      fn: 'setOrgConfigCombosStore',
                      config: {
                          pageSize: 100,
                          proxy: {
                              url: 'configurations/getConfigParamFromTable',
                              extraParams: {
                                  table_name: 'par_prodclass_categories'
                              }
                          }
                      },
                      isLoad: true
                  },
                  beforequery: function() {
                      var store = this.getStore();

                      var all = { name: 'All', id: 0 };
                      store.insert(0, all);
                  },
                  afterrender: function(combo) {
                      combo.select(combo.getStore().getAt(0));
                  },
                  change: 'func_LoadClassificationCombo'
              }
          }, {
            xtype: 'combo',
            emptyText: 'Select Classification',
              margin: 2,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            labelAlign : 'top',
            displayField: 'name',
            name: 'classification_category',
            allowBlank: false,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                 beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_classifications'
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
                        }
            }
        },{
            xtype: 'combo',
            emptyText: 'Product Origin',
              margin: 2,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            labelAlign : 'top',
            displayField: 'name',
            name: 'product_origin_id',
            allowBlank: false,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_product_origins'
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
                        }

            }
        },{
            xtype: 'datefield',
            emptyText: 'Date From',
              margin: 2,
            columnWidth: 0.25,
            labelAlign : 'top',
            format: 'Y-m-d',
            name: 'from_date',
            allowBlank: false,
            minValue: new Date(2020, 6)
        },{
            xtype: 'datefield',
            name: 'to_date',  margin: 2,
            format: 'Y-m-d',
            emptyText: 'Date To',
            labelAlign : 'top',
            allowBlank: false,
            minValue: new Date(2020, 6),
            maxValue: new Date()
        },{ 
            xtype: 'button',
            text: 'Filter Report',  margin: 2,
            name: 'filter_SummaryReport',
            ui: 'soft-green',
            iconCls: 'fa fa-search',
            handler: 'loadProductReportFilters',
            formBind: true,
        }]
});