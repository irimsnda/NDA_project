Ext.define('Admin.view.registers.views.productregister.form.ProductRegisterFiltersFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productregisterfiltersfrm',
    layout: 'fit',
    
    layout: 'column',
    defaults: {
        columnWidth: 0.2
    },
   items: [ {
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
}, {
        xtype: 'datefield',
        emptyText: 'Approved From',
         margin: 2,
        columnWidth: 0.2,
        labelAlign : 'top',
        format: 'Y-m-d',
        name: 'approved_from',
        allowBlank: false,
        minValue: new Date(2020, 6),
        maxValue: new Date()
    },{
        xtype: 'datefield',
        name: 'approved_to', 
        margin: 2,
        format: 'Y-m-d',
        emptyText: 'Approved To',
        labelAlign : 'top',
        allowBlank: false,
        minValue: new Date(2020, 6),
        maxValue: new Date()
    },{ 
        xtype: 'button',
        text: 'Filter Report',
        margin: 2,
        ui: 'soft-green',
        iconCls: 'fa fa-search',
        handler: 'loadProductRegisterFilters',
        formBind: true,
    }
          ]
   

});